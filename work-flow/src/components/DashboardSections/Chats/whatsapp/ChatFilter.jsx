import React from 'react';
import { Search, Filter } from 'lucide-react';

const ChatFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, title = 'WhatsApp Chats', theme = 'whatsapp' }) => {
  const statusOptions = ['All', 'Active', 'Closed', 'Paused', 'Draft', 'Assign to me'];
  const isIG = theme === 'instagram';

  return (
    <div className="p-4 border-b" style={{ backgroundColor: '#1F7D53', borderBottomColor: '#255F38' }}>
      <h1 className={`text-2xl font-bold bg-gradient-to-r ${isIG ? 'from-pink-500 via-purple-500 to-indigo-500' : 'from-green-400 to-green-300'} bg-clip-text text-transparent mb-4`}>
        {title}
      </h1>
      
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isIG ? 'focus:ring-pink-500' : 'focus:ring-green-500'} focus:border-transparent text-white placeholder-gray-300`}
          style={{ 
            backgroundColor: '#255F38', 
            borderColor: '#000000'
          }}
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isIG ? 'focus:ring-pink-500' : 'focus:ring-green-500'} focus:border-transparent appearance-none text-white`}
          style={{ 
            backgroundColor: '#255F38', 
            borderColor: '#000000'
          }}
        >
          {statusOptions.map(option => (
            <option key={option} value={option} style={{ backgroundColor: '#255F38', color: 'white' }}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ChatFilter;