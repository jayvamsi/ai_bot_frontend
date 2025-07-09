import React, { forwardRef } from 'react';
import './Message.css';

const Message = forwardRef(({ sender, content }, ref) => {
  const isUser = sender === 'user';

  return (
    <div ref={ref} className={`message-row ${isUser ? 'user' : 'bot'}`}>
      <div className="message-bubble">
        <p>{content}</p>
      </div>
    </div>
  );
});

export default Message;
