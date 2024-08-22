const express=require("express");
const router=express.Router();
const {signup, login}=require("../controllers/auth");
const { acessChat, fetchChats } = require("../controllers/chat");
router.post("/signup",signup);
router.post("/login",login);
router.post("/",acessChat);
router.get("/",fetchChats);
module.exports=router;