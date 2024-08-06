import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import MessageByMe from "./MessageByMe";
import MessageByOther from "./MessageByOther";

function Chatarea() {
  return (
    <div className="border bg-white w-[70vw] rounded-2xl h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <h1 className="text-xl font-semibold">Chat Area</h1>
        <FaRegTrashAlt />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 border bg-slate-400  overflow-y-auto">
        {/* Example messages */}
        <MessageByMe/>
        <MessageByOther/>
        <MessageByMe/>
        <MessageByOther/>
        <MessageByMe/>
        <MessageByOther/>
        <MessageByMe/>
        <MessageByOther/>
        <MessageByMe/>
        <MessageByOther/>
        <MessageByMe/>
        <MessageByOther/>
       
      </div>

      {/* Input Area */}
      <div className="bg-gray-100 p-4 rounded-b-2xl flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
        />
        <button className="bg-blue-500 text-white p-2 ml-2 rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatarea;
