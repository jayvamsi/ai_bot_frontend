import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import { FaPaperPlane } from 'react-icons/fa';
import './ChatBox.css';

function ChatBox({ userId, onSwitchUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hasDocs, setHasDocs] = useState(true);
  const chatEndRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    axios.get(`https://ai-bot-backend-q85g.onrender.com/api/chat/history/${userId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error('Failed to load history:', err));

    axios.get(`https://ai-bot-backend-q85g.onrender.com/api/upload/user/${userId}`)
      .then(res => setHasDocs(res.data.hasDocs))
      .catch(err => {
        console.error('Doc check failed:', err);
        setHasDocs(false);
      });
  }, [userId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('https://ai-bot-backend-q85g.onrender.com/api/chat/send', {
        userId,
        message: input,
      });

      const botReply = { sender: 'bot', content: res.data.reply };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      await axios.post('https://ai-bot-backend-q85g.onrender.com/api/upload', formData);
      alert('✅ File uploaded successfully!');
      setHasDocs(true);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('❌ Failed to upload file');
    }
  };

  return (
    <div className="chatbox">
     <div className="chat-header">
        <div className="user-info">
            👤 <strong>{userId}</strong>
            <button onClick={onSwitchUser} className="switch-user-btn">🔄 Switch</button>
        </div>
  <button onClick={() => setShowSidebar(!showSidebar)} className="sidebar-toggle">
    ☰
  </button>
</div>


      {showSidebar && (
        <div className="chat-sidebar">
          <p>📁 Sidebar content here</p>
          <p>📝 Chat settings or shortcuts</p>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <Message key={idx} sender={msg.sender} content={msg.content} />
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {!hasDocs && (
        <>
          <div className="no-doc-warning">
            ⚠️ You have not uploaded any company documents yet.
          </div>
          <div className="file-upload-section">
            <label className="upload-button">
              📤 Upload File
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                hidden
              />
            </label>
          </div>
        </>
      )}

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        {hasDocs && (
          <label className="attach-icon">
            📎
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              hidden
            />
          </label>
        )}

        <button onClick={sendMessage}><FaPaperPlane /></button>
      </div>
    </div>
  );
}

export default ChatBox;
