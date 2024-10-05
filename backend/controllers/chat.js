const asyncHandler=require("express-async-handler");
const chat=require('../models/ChatModel');
const User=require('../models/UserModel');
const Chat = require("../models/ChatModel");
const accessChat=asyncHandler(async(req,res)=>{
    const {userId}=req.body;
    if(!userId){
        console.log("UserId param not sent with request");
        return res.status(400);
    }
    var isChat=await Chat.find({
        $and:[
            {User:{$eleMatch:{$eq:req.user._id}}},
            {users:{$eleMatch:{$eq:userId}}},
        ]
    }).populate("users","-password")
    .populate("latestMessage");
    isChat=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name email",
    });
    if(isChat.length>0){
        res.send(isChat[0]);
    }else{
        var chatData={
            chatName:"sender",
            users:[req.user._id,userId],
        };
        try{
            const createChat=await chat.create(chatData);
            const FullChat=await fetchChats.findOne({_id:createChat._id}).populate(
                "users","-password"
            );
            res.status(200).json(FullChat);

        }
        catch(error){
            res.status(400);
            throw new Error(error.message);
        }

    }
});
const fetchChats=asyncHandler(async(req,res)=>{
    try{
        console.log("Fetch chats API:",req);
        Chat.find({users:{$eleMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results=await User.populate(results,{
                path:"latestMessage.sender",
                select:"name email",
            });
            res.status(200).send(results);
        });
        
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports={accessChat,fetchChats}