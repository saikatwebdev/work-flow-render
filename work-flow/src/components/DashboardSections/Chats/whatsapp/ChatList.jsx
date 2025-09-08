import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ({ chats, activeChat, onChatSelect, searchTerm, statusFilter, theme = 'whatsapp' }) => {
  const filteredChats = chats.filter(chat => {
    const name = (chat?.name || '').toString();
    const last = (chat?.lastMessage || '').toString();
    const matchesSearch = name.toLowerCase().includes((searchTerm || '').toLowerCase()) ||
                         last.toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesStatus = statusFilter === 'All' || chat?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div 
      className="flex-1 overflow-y-auto"
      style={{ backgroundColor: '#000000' }}
    >
      {filteredChats.length === 0 ? (
        <div 
          className="flex flex-col items-center justify-center h-full text-center p-8"
          style={{ backgroundColor: '#000000' }}
        >
          <div 
            className="text-xl font-medium mb-2"
            style={{ color: '#255F38' }}
          >
            No chats found
          </div>
          <div 
            className="text-sm opacity-70"
            style={{ color: '#1F7D53' }}
          >
            Try adjusting your search or filter
          </div>
        </div>
      ) : (
        filteredChats.map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={activeChat?.id === chat.id}
            onClick={() => onChatSelect(chat)}
            theme={theme}
          />
        ))
      )}
    </div>
  );
};

export default ChatList;