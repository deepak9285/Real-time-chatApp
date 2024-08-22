const express=require("express");
const router=express.Router();
const { acessChat, fetchChats } = require("../controllers/chat");
router.post("/",acessChat);
router.get("/",fetchChats);
module.exports=router;