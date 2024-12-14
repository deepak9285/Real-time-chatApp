import React, { useState, useEffect } from 'react';
import Chatpage from './AiChat/ChatPage';
import ChatInput from './AiChat/ChatInput'

const AiChatPage = () => {
  const [chats, setChats] = useState([{ role: "model", content: "How can I help you?" }]);
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      let response = await fetch('https://chat-server-og4g.onrender.com/history/user123');
      let data = await response.json();
      setChats(data.messages);
    } catch (error) {
      console.log('Error fetching chats', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);


  return (
    <div>
      <Chatpage chats={chats} loading={loading}/>
      <ChatInput fetchChats={fetchChats} setLoading={setLoading}/>
    </div>
  );
};

export default AiChatPage;