import React from "react";

function WelcomePage() {
  return (
    <div className=" w-full flex ml-9 rounded-3xl items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500">
      <div className="bg-white p-10 rounded-3xl shadow-xl transform transition duration-500 hover:scale-105 text-center max-w-md">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Welcome to Real-time ChatApp
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Connect with your friends and the world around you seamlessly.
        </p>
        <button
          onClick={() => console.log("Start Chatting")} // Replace with navigation logic
          className="py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-medium hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
