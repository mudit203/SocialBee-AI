import { Conversation } from "../models/conversation_model.js";
import { Message } from "../models/message_model.js";

export const sendmessage=async (req,res)=>{
try {
    const {message}=req.body;
const senderid=req.id;
const receiverid=req.params.id;

let conversation =await Conversation.findOne({
    participants:{$all:[senderid,receiverid]},
    
});

if(!conversation){
    await Conversation.create({
        participants:[senderid,receiverid],
       
    })
}
const newmessage=await Message.create({
    senderId:senderid,
    receiverId:receiverid,
    message
});
if(newmessage){
    conversation.messages.push(newmessage._id)
}
await Promise.all([newmessage.save(),conversation.save()]);

return res.status(201).json({
    success:true,
    newmessage
});

} catch (error) {
    console.log(error);
}

};

export const getmessage= async(req,res)=>{
    try {
        const senderid=req.id;
        const receiverid=req.params.id;
        const conversation =await Conversation.findOne({
        participants:{$all:[senderid,receiverid]},
        }).populate('messages')
        if(!conversation){
            return res.status(200).json({
                success:true,
                messages:[]
            })
        };
        return res.status(200).json({
            success:true,
            messages:conversation?.messages
        });
    } catch (error) {
        console.log(error);
    }
}