// const catchAsync = require("../utils/catchAsync");
// const AppError = require('../utils/AppError');
const Message=require('../models/MessageModel')
const User=require('../models/UserModel')
const Chat=require('../models/ChatModel');


exports.sendMessage=async(req,res,next)=>{

    const {content,chatId}=req.body;

    if(!content||!chatId)
    {
        return next(new AppError("Invalid data passed into request",400))
    }

    let newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    };

    let message=await Message.create(newMessage);
    message=await message.populate("sender","name pic")
    message=await message.populate("chat")
    message=await User.populate(message,{
        path:'chat.users',
        select:'name pic email'
    })

    await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message})
    res.status(200).json({
        status:'success',
        data:message
    })

}

exports.getAllMessages=async(req,res,next)=>{

    const message=await Message.find({chat:req.params.chatId}).populate('sender',"name pic email");

    if(!message)
    {
        next(new AppError('Something went wrong while fetching messages',400))
    }
    
    res.status(200).json({
        status:'success',
        message:message
    })

}