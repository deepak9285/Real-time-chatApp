import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { mycontext } from "./MainContainer";

function Sidearea() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Conversation, setConversation] = useState([]);

  const context = useContext(mycontext);
  const { refresh, setRefresh } = context || {};

  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    navigate("/");
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    fetch("https://real-time-chatapp-backend-8cx4.onrender.com/chat/", {
      method: "GET",
      headers: config.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched conversations", data);
        setConversation(data);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
      });
  }, [userData.token]);

  return (
    <div className="w-[30vw] bg-gray-900 rounded-2xl text-white h-screen p-4 flex flex-col">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for conversations"
          className="w-full p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Conversation List */}
      <div className="flex-grow overflow-y-auto space-y-4">
        {Conversation.map((conversation, index) => {
          if (conversation.users.length === 1) {
            return <div key={index}></div>;
          }

          const handleConversationClick = () => {
            console.log("Refresh fired from side bar");
            setRefresh && setRefresh(!refresh);
            navigate(`chat/${conversation._id}?user=${conversation.users[1].name}`);
          };

          return (
            <div
              key={index}
              onClick={handleConversationClick}
              className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer flex items-center space-x-3"
            >
              <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
                {conversation.users[1].name[0]}
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{conversation.users[1].name}</p>
                <p className="text-sm text-gray-400">
                  {conversation.latestMessage
                    ? conversation.latestMessage.content
                    : "No previous message, click here to start a new chat"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat with AI Section */}
      <div
        className="p-4 bg-purple-600 rounded-lg hover:bg-purple-500 cursor-pointer flex items-center space-x-3 mt-4"
        onClick={() => navigate("AiChatPage")}
      >
        <div className="bg-purple-800 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
          AI
        </div>
        <div className="flex-grow">
          <p className="font-semibold">Chat with AI</p>
          <p className="text-sm text-gray-200">
            Start a conversation with our AI assistant.
          </p>
        </div>
      </div>

      {/* Add Friend Button */}
  

      {/* Online Users Button */}
      <button
        className="w-full p-2 bg-green-500 rounded-lg hover:bg-green-600 text-white font-semibold mt-4"
        onClick={() => navigate("groups")}
      >
        Online Users
      </button>

      {/* Profile Section */}
      <div className="bg-gray-800 mt-6 p-4 rounded-lg flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{userData.user.name}</h3>
          <p className="text-sm text-gray-400">{userData.user.email}</p>
        </div>
      </div>

      {/* View Profile Button */}
      <button onClick={()=>navigate('ViewProfile')} className="w-full p-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white font-semibold mt-4">
        View Profile
      </button>

      {/* Logout Button */}
      <button
        className="w-full p-2 bg-red-500 rounded-lg hover:bg-red-600 text-white font-semibold mt-4"
        onClick={() => {
          localStorage.removeItem("userData");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidearea;
