const express=require("express");
const app=express();
const mongoose=require("mongoose");
const routes=require("./routes/user");
const chatRoutes=require("./routes/chatRoutes");
const messageRoutes=require("./routes/messageRoutes");
const cors=require("cors");
require("dotenv").config();

const{db_connect}=require("./config/db");
db_connect();
app.use(cors());
app.get("/",(req,res)=>{res.send("Api is running")});
app.use(express.json());
app.use("/users",routes);
app.use("/chat",chatRoutes);
app.use("/messages",messageRoutes);
app.listen(process.env.PORT||5000,console.log("server is running"));