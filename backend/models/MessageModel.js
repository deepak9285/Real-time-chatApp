const mongoose = require("mongoose");
const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    content:{
      type:String,
      trim:true,
    }
  },
  {
    timeStamp: true,
  }
);

const Message = mongoose.model("Messages", MessageSchema);
module.exports = Message;
