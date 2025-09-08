import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ChevronDown, ChevronRight } from 'lucide-react';
import Message from './Message';

const ChatWindow = ({ activeChat, messages, onSendMessage, aiMode, onToggleAI, onStatusChange, isDetailsOpen, onToggleDetails, theme = 'whatsapp' }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const statusOptions = ['Active', 'Closed', 'Paused', 'Draft', 'Assign to me'];
  
  const statusColors = {
    Active: 'text-green-300',
    Closed: 'text-red-300', 
    Paused: 'text-yellow-300',
    Draft: 'text-gray-300',
    'Assign to me': 'text-green-300'
  };

  const statusBgColors = {
    Active: 'bg-green-900 bg-opacity-30',
    Closed: 'bg-red-900 bg-opacity-30',
    Paused: 'bg-yellow-900 bg-opacity-30', 
    Draft: 'bg-gray-800 bg-opacity-30',
    'Assign to me': 'bg-green-900 bg-opacity-30'
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = () => {
    if (inputMessage.trim() && !aiMode) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !aiMode) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStatusSelect = (status) => {
    if (onStatusChange && activeChat) {
      onStatusChange(activeChat.id, status);
      setShowStatusDropdown(false);
    }
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: '#000000' }}>
        <div className="text-center">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#255F38' }}
          >
            <User className="w-10 h-10" style={{ color: '#ffffff' }} />
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: '#255F38' }}>Welcome to Chat</h2>
          <p style={{ color: '#1F7D53' }}>Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full" style={{ backgroundColor: '#000000' }}>
      {/* Header */}
      <div 
        className="px-6 py-4 border-b flex-shrink-0"
        style={{ 
          backgroundColor: '#255F38',
          borderBottomColor: '#1F7D53'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: '#1F7D53' }}
            >
              {(activeChat?.name || '?').toString().charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{activeChat?.name || 'Unknown'}</h2>
              
              {/* Status Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${statusBgColors[activeChat.status]} ${statusColors[activeChat.status]}`}
                >
                  <span>{activeChat.status}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showStatusDropdown && (
                  <div 
                    className="absolute top-full left-0 mt-1 rounded-lg shadow-lg border py-1 z-50 min-w-[140px]"
                    style={{ 
                      backgroundColor: '#000000',
                      borderColor: '#1F7D53'
                    }}
                  >
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusSelect(status)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-opacity-20 transition-colors ${
                          activeChat.status === status ? 'bg-opacity-20 font-medium' : ''
                        }`}
                        style={{ 
                          backgroundColor: activeChat.status === status ? '#255F38' : 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          if (activeChat.status !== status) {
                            e.target.style.backgroundColor = 'rgba(37, 95, 56, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeChat.status !== status) {
                            e.target.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span 
                          className={`inline-block px-2 py-1 rounded-full text-xs ${statusBgColors[status]} ${statusColors[status]}`}
                        >
                          {status}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {aiMode && (
              <div 
                className="flex items-center space-x-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(31, 125, 83, 0.3)' }}
              >
                <Bot className="w-4 h-4" style={{ color: '#1F7D53' }} />
                <span className="text-sm font-medium" style={{ color: '#1F7D53' }}>AI Active</span>
              </div>
            )}
            
            {/* Toggle Details Button */}
            <button
              onClick={onToggleDetails}
              className={`p-2 rounded-lg transition-all`}
              style={{ 
                backgroundColor: isDetailsOpen ? 'rgba(31, 125, 83, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                color: isDetailsOpen ? '#1F7D53' : '#ffffff'
              }}
              title={isDetailsOpen ? 'Hide customer details' : 'Show customer details'}
              onMouseEnter={(e) => {
                if (!isDetailsOpen) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDetailsOpen) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container with Auto-scroll */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-6 scroll-smooth"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="space-y-4">
          {messages.map(message => (
            <Message key={message.id} message={message} isAI={aiMode && message.sender === 'me'} />
          ))}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div 
        className="px-6 py-4 border-t flex-shrink-0"
        style={{ 
          backgroundColor: '#000000',
          borderTopColor: '#1F7D53'
        }}
      >
        {/* AI Toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium" style={{ color: '#255F38' }}>AI Mode</span>
            {aiMode && (
              <span 
                className="text-xs px-2 py-1 rounded-full"
                style={{ 
                  color: '#1F7D53',
                  backgroundColor: 'rgba(31, 125, 83, 0.2)'
                }}
              >
                Auto-replying to messages
              </span>
            )}
          </div>
          <button
            onClick={onToggleAI}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            style={{ 
              backgroundColor: aiMode ? '#255F38' : '#1F7D53'
            }}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                aiMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Message Input */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={aiMode ? "AI is handling messages..." : "Type your message..."}
            disabled={aiMode}
            className={`flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 transition-all ${
              aiMode 
                ? 'cursor-not-allowed opacity-60' 
                : ''
            }`}
            style={{
              backgroundColor: aiMode ? 'rgba(31, 125, 83, 0.1)' : '#000000',
              borderColor: aiMode ? '#1F7D53' : '#255F38',
              color: '#ffffff',
              focusRingColor: '#255F38'
            }}
            onFocus={(e) => {
              if (!aiMode) {
                e.target.style.borderColor = '#255F38';
                e.target.style.boxShadow = '0 0 0 2px rgba(37, 95, 56, 0.3)';
              }
            }}
            onBlur={(e) => {
              if (!aiMode) {
                e.target.style.borderColor = '#255F38';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={aiMode}
            className={`p-2 rounded-full text-white transition-all transform flex-shrink-0 ${
              aiMode 
                ? 'cursor-not-allowed opacity-60' 
                : 'hover:scale-105'
            }`}
            style={{ 
              backgroundColor: aiMode ? '#1F7D53' : '#255F38'
            }}
            onMouseEnter={(e) => {
              if (!aiMode) {
                e.target.style.backgroundColor = '#1F7D53';
              }
            }}
            onMouseLeave={(e) => {
              if (!aiMode) {
                e.target.style.backgroundColor = '#255F38';
              }
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;