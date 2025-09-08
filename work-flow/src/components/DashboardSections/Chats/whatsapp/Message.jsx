import React from 'react';
import { Bot, User } from 'lucide-react';

const Message = ({ message, isAI }) => {
  return (
    <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 max-w-[70%] ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.sender === 'me' 
            ? isAI 
              ? 'text-white'
              : 'text-white'
            : 'text-white'
        }`}
        style={{
          backgroundColor: message.sender === 'me' 
            ? isAI 
              ? '#255F38'
              : '#255F38'
            : '#1F7D53'
        }}>
          {message.sender === 'me' 
            ? isAI 
              ? <Bot className="w-4 h-4" /> 
              : 'Y'
            : <User className="w-4 h-4" />
          }
        </div>
        <div>
          <div className={`px-4 py-2 rounded-2xl ${
            message.sender === 'me' 
              ? 'text-white'
              : 'text-white'
          }`}
          style={{
            backgroundColor: message.sender === 'me' 
              ? isAI
                ? '#255F38'
                : '#255F38'
              : '#1F7D53'
          }}>
            <p className="text-sm break-words">{message.text}</p>
            <p className={`text-xs mt-1 ${
              message.sender === 'me' 
                ? 'text-white opacity-80' 
                : 'text-white opacity-70'
            }`}>
              {message.time}
            </p>
          </div>
          {message.sender === 'me' && isAI && (
            <p 
              className="text-xs mt-1 text-right"
              style={{ color: '#1F7D53' }}
            >
              AI Generated
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;