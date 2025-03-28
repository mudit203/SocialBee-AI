import mongoose from "mongoose";

const connectdb=async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected successfully");
        
    }
    catch(error){
        console.log(error);
    }
}
export default connectdb;