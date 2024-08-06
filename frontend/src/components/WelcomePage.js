import React from 'react';

function WelcomePage() {
  return (
    <div className="w-[70vw] flex flex-col items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md  text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Real-time-chatApp</h1>
        <p className="text-gray-700 mb-6">Connect with your friends and the world around you on ChatApp.</p>
       
      </div>
    </div>
  );
}

export default WelcomePage;
