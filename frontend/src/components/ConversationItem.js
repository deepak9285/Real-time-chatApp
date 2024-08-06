import React from "react";

function ConversationItem({ props }) {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
        {props.name[0]}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-white">{props.name}</p>
          <p className="text-sm text-gray-500">
            {props.timeStamp}
          </p>
        </div>
        <p className="text-sm text-gray-600 truncate">{props.lastmessage}</p>
      </div>
    </div>
  );
}

export default ConversationItem;
