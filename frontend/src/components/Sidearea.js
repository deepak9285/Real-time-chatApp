import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import ConversationItem from "./ConversationItem";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function Sidearea() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (currentUserEmail) {
      const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
      const loggedInUser = storedUsers.find(user => user.email === currentUserEmail);
      if (loggedInUser) {
        setuser(loggedInUser);
      }
    }
  }, []);

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
  const navigate = useNavigate();
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
      <div>
        <button
          className="w-full p-2 mt-4 mb-4 bg-blue-500 rounded hover:bg-blue-400"
          onClick={() => navigate("groups")}
        >
          Online users
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
            <h3 className="text-lg font-semibold">
              {" "}
              {user ? (
                <p className="text-center text-white">{user.name}</p>
                
              ) : (
                <p className="text-center text-red-500">No user data found.</p>
              )}
            </h3>
            {user ? (
                <p className="text-center text-white">{user.email}</p>
                
              ) : (
                <p className="text-center text-red-500">No user data found.</p>
              )}
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
