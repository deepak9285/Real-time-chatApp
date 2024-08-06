import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import ConversationItem from "./ConversationItem";

function Sidearea() {
  const [conversations, setconversations] = useState([
    {
      name: "text1",
      lastmessage: "lastmessage",
      timeStamp: "today",
    },
    {
      name: "text1",
      lastmessage: "lastmessage",
      timeStamp: "today",
    },
    {
      name: "text1",
      lastmessage: "last message",
      timeStamp: "today",
    },
    {
      name: "text1",
      lastmessage: "last message",
      timeStamp: "today",
    },
  ]);
  return (
    <div className="w-[30vw]  bg-gray-800 rounded-2xl text-white h-screen p-4">
      <div className="flex flex-col">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:bg-gray-600"
          />
        </div>

        {/* Accounts Section */}
        <div>
          {conversations.map((conversation) => {
            return (
              <ConversationItem key={conversation.id} props={conversation} />
            );
          })}
        </div>
        {/* Add Friend Button */}
        <button className="w-full p-2 bg-blue-500 rounded hover:bg-blue-400">
          Add Friend
        </button>
      </div>

      <div className="bg-gray-700 mt-auto p-4 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">Username</h3>
            <p className="text-gray-400">user@example.com</p>
          </div>
        </div>
        <div className="">
          <button className="w-full p-2 bg-blue-500 rounded hover:bg-blue-400">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidearea;
