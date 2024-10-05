import React from "react";

function MessageByOther({ props }) {
  return (
    <div className="message-other">
      <div>
        <p>{props.sender.name[0]}</p>
      </div>
      <div>
        <p>{props.sender.name}</p>
        <p>{props.content}</p>
      </div>
    </div>
  );
}

export default MessageByOther;
