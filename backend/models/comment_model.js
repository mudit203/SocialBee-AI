import mongoose from "mongoose";
const CommentSchema=mongoose.Schema({
    text:{type:String,required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true}
});

export const Comment=mongoose.model('Comment',CommentSchema);