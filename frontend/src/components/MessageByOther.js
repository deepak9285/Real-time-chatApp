import React from 'react';

function MessageByOther() {
  var props1 = { name: "RandomUser", message: "This is a Sample" };
  return (
    <div className="flex items-start justify-start space-x-3 p-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-semibold">
        {props1.name[0]}
      </div>
      <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-800">{props1.name}</p>
        <p className="text-sm text-gray-700 mt-1">{props1.message}</p>
        <p className="text-xs text-gray-500 text-right mt-2">12:00am</p>
      </div>
    </div>
  );
}

export default MessageByOther;
