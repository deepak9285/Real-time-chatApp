import React, { useState, useRef, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import MessageByMe from "./MessageByMe";
import { useParams } from "react-router-dom";
import MessageByOther from "./MessageByOther";

function Chatarea() {
  const [messages, setMessages] = useState("");
  const messageEndRef = useRef(null);
  const { chat_id, chat_user } = useParams();  // Destructure useParams
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleSend = async () => {
    if (!messages) return; // Don't send empty messages
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8080/message/", {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        content: messages,
        chatId: chat_id, // Use destructured chat_id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message sent", data);
        setMessages(""); // Clear the input after sending
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (!chat_id) return; // Don't fetch messages if there's no chat ID

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    fetch(`http://localhost:8080/message/${chat_id}`, { // Fix URL path
      method: "GET",
      headers: config.headers,
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setAllMessages(data);
        setLoaded(true);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [chat_id, userData.token]); // Add userData.token dependency

  if (!chat_id) {
    return <div>Error: No chat ID provided in the URL</div>;
  }

  if (!loaded) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Chat with {chat_user}</h1> {/* Show chat user */}
      <div>
        {allMessages
          .slice(0)
          .reverse()
          .map((message, index) => {
            const sender = message.sender;
            const self_id = userData._id;
            if (sender.id === self_id) {
              return (
                <MessageByMe props={message} content={messages} key={index} />
              );
            } else {
              return (
                <MessageByOther props={sender} content={messages} key={index} />
              );
            }
          })}
      </div>
      <div ref={messageEndRef} />
      <div className="border">
        <input
          placeholder="Type a message"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button className="border" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatarea;
