import React from 'react';

function MessageByMe({props}) {
  return(
    <div className="self-message-container w-4">
      <div className="messageBox">
        console.log(content);
        <p className='text-black'>{props.content}</p>
        {/* <p className="self-timeStamp" style={{ color: "black" }}>
          12:00am
        </p> */}
      </div>
    </div>
  )
}

export default MessageByMe;
