import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import MessageByMe from "./MessageByMe";
import MessageByOther from "./MessageByOther";
import "./Chatarea.css"; // Link to the CSS file for professional styling

function Chatarea() {
  const { _id: chat_id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chat_user = queryParams.get("user");
  const [messages, setMessages] = useState("");
  const messageEndRef = useRef(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleSend = async () => {
    if (!messages.trim()) return;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    fetch("https://real-time-chatapp-backend-8cx4.onrender.com/message/", {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        content: messages,
        chatId: chat_id,
      }),
    });

  };

  useEffect(() => {
    if (!chat_id) return;

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    fetch(
      `https://real-time-chatapp-backend-8cx4.onrender.com/message/${chat_id}`,
      {
        method: "GET",
        headers: config.headers,
      }
    )
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        setAllMessages(data || []);
        setLoaded(true);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, [chat_id, userData.token]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  if (!chat_id) {
    return <div>Error: No chat ID provided in the URL</div>;
  }

  if (!loaded) {
    return (
      <div className="loading-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat with {chat_user}</h1>
      </div>
      <div className="messages-container">
        {allMessages.length > 0 ? (
          allMessages
            .slice(0)
            .reverse()
            .map((message, index) => {
              const sender = message.sender;
              const self_id = userData._id;
              return sender._id === self_id ? (
                <MessageByMe key={index} props={message} />
              ) : (
                <MessageByOther key={index} props={message} />
              );
            })
        ) : (
          <p className="no-messages">No messages yet</p>
        )}
        <div ref={messageEndRef} />
      </div>
      <div className="message-input-container">
        <input
          className="message-input"
          placeholder="Type a message"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleSend();
              setMessages("");
            }
          }}
        />
        <button className="send-button" onClick={() => handleSend()}>
          Send
        </button>
      </div>
    </div>
  );
}
export default Chatarea;
