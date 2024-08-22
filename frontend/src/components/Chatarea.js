import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import MessageByMe from "./MessageByMe";
import MessageByOther from "./MessageByOther";

function Chatarea() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "me" }]);
      setInput(""); // Clear input after sending
      
      // Simulate a response from the other user after a delay
      setTimeout(() => {
        const response = getRandomResponse();
        setMessages((prevMessages) => [...prevMessages, { text: response, sender: "other" }]);
      }, 1000); // Adjust delay as needed
    }
  };

  // Function to generate random responses
  const getRandomResponse = () => {
    const responses = [
      "Hello there!",
      "How's it going?",
      "I'm here to chat.",
      "What can I do for you?",
      "Let's talk about something interesting!",
      "What's up?",
      "How can I help you?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="border bg-white w-[70vw] rounded-2xl h-screen flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <h1 className="text-xl font-semibold">Chat Area</h1>
        <FaRegTrashAlt />
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 border bg-slate-400 overflow-y-auto">
        {messages.map((message, index) =>
          message.sender === "me" ? (
            <MessageByMe key={index} text={message.text} />
          ) : (
            <MessageByOther key={index} text={message.text} />
          )
        )}
      </div>

      {/* Input Area */}
      <div className="bg-gray-100 p-4 rounded-b-2xl flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white p-2 ml-2 rounded-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatarea;
