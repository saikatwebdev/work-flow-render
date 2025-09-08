import React from 'react';
import { X, Pause, FileText, UserCheck } from 'lucide-react';

const ChatItem = ({ chat, isActive, onClick, theme = 'whatsapp' }) => {
  const statusColors = {
    Active: 'bg-green-800 text-green-200 border border-green-700',
    Closed: 'bg-red-800 text-red-200 border border-red-700',
    Paused: 'bg-yellow-800 text-yellow-200 border border-yellow-700',
    Draft: 'bg-gray-800 text-gray-200 border border-gray-700',
    'Assign to me': 'bg-purple-800 text-purple-200 border border-purple-700'
  };

  const avatarColors = {
    whatsapp: 'from-green-500 to-emerald-500',
    instagram: 'from-pink-500 via-purple-500 to-indigo-500'
  };

  const statusIcons = {
    Active: <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />,
    Closed: <X className="w-3 h-3" />,
    Paused: <Pause className="w-3 h-3" />,
    Draft: <FileText className="w-3 h-3" />,
    'Assign to me': <UserCheck className="w-3 h-3" />
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b cursor-pointer transition-all ${
        isActive 
          ? 'border-l-4 border-green-500' 
          : ''
      }`}
      style={{
        backgroundColor: isActive ? '#255F38' : '#1F7D53',
        borderBottomColor: '#000000',
        borderLeftColor: isActive ? '#22c55e' : 'transparent'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = '#255F38';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.target.style.backgroundColor = '#1F7D53';
        }
      }}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${avatarColors[theme] || avatarColors.whatsapp} flex items-center justify-center text-white font-semibold`}>
          {(chat?.name || '?').toString().charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white truncate">{(chat?.name || 'Unknown')}</h3>
            <span className="text-xs text-gray-300">{chat?.time || ''}</span>
          </div>
          <p className="text-sm text-gray-300 truncate">{(chat?.lastMessage || '')}</p>
          <div className="flex items-center mt-2 space-x-2">
            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[chat?.status] || 'bg-gray-800 text-gray-200 border border-gray-700'}`}>
              {statusIcons[chat?.status] || null}
              <span>{chat?.status || 'Active'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;