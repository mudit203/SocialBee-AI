import sharp from "sharp";
import { Post } from "../models/post_model.js";
import { User } from "../models/user_model.js";
import cloudinary from "../utils/cloudinary.js";
import { Comment } from "../models/comment_model.js";
import { getreceiverid, io } from "../socket/socket.js";



export const AddNewPost=async (req,res)=>{
    try {                              
        const{caption}=req.body;
    const image=req.file;
        const AuthorId=req.id;
        const Author= await User.findById(AuthorId);
        if(!image) return res.status(400).json({message:"image required", success:false});
        const OptimisedImageBuffer= await sharp(image.buffer).resize({width:800,height:800,fit:'inside'}).toFormat('jpeg',{quality:80}).toBuffer();
        const fileUri= `data:image/jpeg;base64,${OptimisedImageBuffer.toString('base64')}`;
        // console.log(fileUri);
        
        const cloudResponse= await cloudinary.uploader.upload(fileUri);
        
        
        const post= await Post.create({
            caption,
            image:cloudResponse.secure_url,
            author:AuthorId
        });

        // await Promise.all([
        //     User.updateOne({ _id: AuthorId }, { $push: { : userToBeFollowed } }),
        //     User.updateOne({ _id: userToBeFollowed }, { $push: { followers: currentuser } })
        // ])
       if(Author){
          Author.posts.push(post._id);
          await Author.save();
       }

       await post.populate({path:'author',select:'-password'});
       
       return res.status(200).json({
        message:"New post added",
        post,
        success:true,

       });

    } catch (error) {
        console.log(error)
   }


};

export const GetAllPosts = async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({ path: 'author', select: 'username profilePicture bio' })
        .populate({
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: 'author',
            select: 'username profilePicture',
          },
        });
       return res.status(200).json({
       
        posts,
        success:true
       })
    } catch (error) {
        console.log(error);
    }
  

};
export const GetUserPosts= async(req,res)=>{

    try {
        const Authorid=req.id;
        const posts = await Post.find({author:Authorid}).sort({createdAt:-1})
        .populate({path:'author',select:'username profilePicture'}).
         populate({
            path:'comments',
            sort:{createdAt:-1},
            populate:{
                path:'author',
                select:'username,profilePicture'
            }
        
        });
        return res.status(200).json({
            posts,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
   

};

export const LikePosts= async(req,res) =>{
      try {
        const currentuserid=req.id;
        const postid=req.params.id;
       
        const post=await Post.findById(postid);
        if(!post){
            return res.status(400).json({
                message:"Post not found",
                success:false
            })
        }
       //post.likes.push(currentuserid);               CANT BE USED AS ONE USER CAN LIKE ONLY ONE TIME
       //post.populate({path:'likes',select:'username, profilePicture'});   

       await post.updateOne({$addToSet:{likes:currentuserid}});
       await post.save();
       
      //IMPLEMENT SOCKET IO
      const user=await User.findById(currentuserid).select('username profilePicture');
     const postownerid=post.author.toString();
     if(postownerid!==currentuserid){
        const notification={
            type:'like',
            userId:currentuserid,
            userdetails:user,
            postid,
            message:"your post was liked",
        }
        const postownersocketid=getreceiverid(postownerid);
        io.to(postownersocketid).emit('notification',notification)
     
     }
      return res.status(200).json({
        message:"post liked",
        success:true
      });

      } catch (error) {
        console.log(error);
        
      }
      
     
}

export const UnLikePosts= async(req,res) =>{
    try {
      const currentuserid=req.id;
      const postid=req.params.id;
     
      const post=await Post.findById(postid);
      if(!post){
          return res.status(400).json({
              message:"Post not found",
              success:false
          })
      }
     //post.likes.push(currentuserid);               CANT BE USED AS ONE USER CAN LIKE ONLY ONE TIME
     //post.populate({path:'likes',select:'username, profilePicture'});   

     await post.updateOne({$pull:{likes:currentuserid}});
     await post.save();
     
    //IMPLEMENT SOCKET IO
   const user=await User.findById(currentuserid).select('username profilePicture');
     const postownerid=post.author.toString();
     if(postownerid!==currentuserid){
        const notification={
            type:'dislike',
            userId:currentuserid,
            userdetails:user,
            postid,
            message:"your post was disliked",
        }
        const postownersocketid=getreceiverid(postownerid);
        io.to(postownersocketid).emit('notification',notification)
     }
    return res.status(200).json({
      message:"post unliked",
      success:true
    });

    } catch (error) {
      console.log(error);
      
    }
    
   
};

export const AddComment= async(req,res)=>{
try {
    const currentuser=req.id;
    const postid=req.params.id;
    const {text}= req.body;
    const post= await Post.findById(postid);
    if(!text){
        return res.status(401).json({
            message:"comment cant be empty",
            success:false
        });
    }
    const comment= await Comment.create({
        text,
        author:currentuser,
        post:postid
    })


    await comment.populate({path:'author',select:'username profilePicture'});

    post.comments.push(comment._id);
    await post.save();

    return res.status(200).json({
        message:"Comment added",
        comment,
        success:true
    });
    
} catch (error) {
    console.log(error)
}

};

export const getallcomments=async(req,res)=>{


//    const postid=req.params.id;
//    const post=await Post.findById(postid).populate({
//     path:'comments',
//     select:'text',
//     populate:{
//         path:'author',
//         select:'username,profilePicture'
//     }
//    });
try {
    const postid=req.params.id;
const comments= await Comment.find({post:postid}).populate({
    path:'author',
    select:'username,profilePicture'
});
 
if(!comments){
    return res.status(404).json({
        message:"comments not found",
        success:false
    })
}
return res.status(200).json({
    success:true,
    comments
});

} catch (error) {
    console.log(error);
}

};

export const deletepost=async(req,res)=>{
   try {
    const postid=req.params.id;
    const post=await Post.findById(postid);
    if(!post){
        return res.status(400).json({
            message:"no post found",
            success:false
        })
    }
        const authorid=req.id;
        if(post.author.toString() !==authorid){
            return res.status(400).json({
                message:"unauthorized",
                success:false
            })
        }
      await Post.findByIdAndDelete(postid);
     
      let user= await User.findById(authorid);
      user.posts=user.posts.filter(id=> id.toString() !== postid);

      await Comment.deleteMany({post:postid});

      return res.status(200).json({
        message:"post deleted",
        success:true
      })
   } catch (error) {
    console.log(error);
   }

};

export const BookmarkPost= async(req,res)=>{
   try {
    const userid=req.id;
    const postid=req.params.id;
    
    const post= await Post.findById(postid);
    if(!post){
        return res.status(200).json({
            message:"Post not found",
            success:false
        })

    }
    
    const user = await User.findById(userid);
    if(user.bookmarks.includes(postid)){
        await user.updateOne({$pull:{bookmarks:postid}});
        await user.save();
        return res.status(200).json({
            message:"Post removed from Bookmarked",
            success:true
        })
    }
    else{
        await user.updateOne({$addToSet:{bookmarks:postid}});
        await user.save();
        return res.status(200).json({
            message:"Post Bookmarked",
            success:true
        });
    }

   } catch (error) {
    console.log(error);
   }



   

}