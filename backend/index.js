const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
app.get("/",(req,res)=>{res.send("Api is running")});

app.listen(process.env.PORT||5000,console.log("server is running"));