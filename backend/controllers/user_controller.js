import { User } from "../models/user_model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post_model.js";
import { populate } from "dotenv";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing!!",
                success: false
            })

        }
        const user = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);
         
        if (user) {
            return res.status(401).json({
                message: "please try with a differenct email",
                success: false
            });
        }
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing please try again",
                success: false
            })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "User not registered please signup",
                success: false
            });
        }
        const ispasswordMAtch = await bcrypt.compare(password, user.password);
        if (!ispasswordMAtch) {
            return res.status(401).json({
                message: "incorrect email or password",
                success: false
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
  
        const populatedposts = await Promise.all(
            user.posts.map(async (postId) => {
                const post = await Post.findById(postId).populate('author', 'username profilePicture');
                if (post && post.author && post.author._id.equals(user._id)) {
                    return post;
                }
                return null;
            })
        );

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedposts
        }


    
        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        });

    } catch (error) {
        console.log(error)
    }

};

export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


export const getprofile = async (req, res) => {
    try {
        const userid = req.params.id;
        let user = await User.findById(userid).populate({path:'posts',populate:{
            path:'author',
            select:'username profilePicture'
        },
      options:{sort:{createdAt:-1}}
    
    }).select('-password');
       
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error)
    }
};


export const editprofile = async (req, res) => {
    try {
        const userid = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;
        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
            
        };
        const user = await User.findById(userid).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        };
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: "Profile updated",
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
    }
};

export const getsuggestedUsers = async (req, res) => {
    try {
        const currentuserid = req.id;

        const suggestedusers = await User.find({ _id: { $ne: currentuserid } }).select("-password");
        if (!suggestedusers) {
            return res.status(400).json({

                success: false
            });
        }

        return res.status(200).json({
            success: true,
            users: suggestedusers
        });

    } catch (error) {
        console.log(error);
    }


};

export const followOrUnfollow = async (req, res) => {
    try {
        const currentuser = req.id;
        const userToBeFollowed = req.params.id;
        if (currentuser === userToBeFollowed) {
            return res.status(400).json({
                message: "cannot unfollow same user",
                success: false
            })
        };
        const user = await User.findById(currentuser);
        const targetUser = await User.findById(userToBeFollowed);
        if (!user || !targetUser) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        };
        const isFollowing = user.following.includes(userToBeFollowed)
        if (isFollowing) {
            //user.following.remove(userToBeFollowed)
            await Promise.all([
                User.updateOne({ _id: currentuser }, { $pull: { following: userToBeFollowed } }),
                User.updateOne({ _id: userToBeFollowed }, { $pull: { followers: currentuser } })

            ])
            return res.status(200).json({
                message: "Unfollowed successfullly",
                success: true
            });
        }
        
    else {
    // user.following.push(userToBeFollowed)
    await Promise.all([
        User.updateOne({ _id: currentuser }, { $push: { following: userToBeFollowed } }),
        User.updateOne({ _id: userToBeFollowed }, { $push: { followers: currentuser } })
    ])
    return res.status(200).json({
        message: "followed successfullly",
        succcess: true
    })
}
 } catch (error) {
    console.log(error);
}
};