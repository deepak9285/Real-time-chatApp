import React, { useEffect, useRef } from "react";
import "./ChatInput.css";

const Chatpage = ({ chats, loading }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
    return `${formattedTime} ${formattedDate}`;
  };

  return (
    <div className="chat-container m-10 w-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white h-screen flex flex-col">
      {/* Chat Header */}
      <div className="chat-header flex justify-between items-center bg-indigo-700 px-6 py-4 rounded-b-2xl shadow-md">
        <h2 className="text-2xl font-bold">Chat with AI Assistant</h2>
        <span className="text-gray-300 text-sm">{new Date().toLocaleString()}</span>
      </div>

      {/* Chat List */}
      <ul className="chat-list flex-grow overflow-y-auto p-6 space-y-4">
        {chats.map((e, index) => (
          <li
            key={index}
            className={`chat-message flex ${
              e.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-3xl shadow-lg ${
                e.role === "user"
                  ? "bg-blue-600 ml-auto text-white self-end"
                  : "bg-white mr-auto text-gray-900"
              }`}
            >
              <p>{e.content}</p>
              <div
                className={`timestamp text-xs mt-2 ${
                  e.role === "user" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {formatDate(e.timestamp)}
              </div>
            </div>
          </li>
        ))}
        {loading && <h3 className="text-center text-gray-300">Loading...</h3>}
        <div ref={chatEndRef} />
      </ul>


    </div>
  );
};

export default Chatpage;
