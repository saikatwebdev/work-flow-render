import React from 'react';
import { TrendingUp, TrendingDown, MessageSquare, Clock, Brain } from 'lucide-react';

const MetricCard = ({ title, value, change, changeType, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'messages': return MessageSquare;
      case 'trending-up': return TrendingUp;
      case 'clock': return Clock;
      case 'brain': return Brain;
      default: return TrendingUp;
    }
  };

  const IconComponent = getIcon();

  return (
    <div className="bg-black border border-gray-700 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#1F7D53] bg-opacity-20 rounded-lg flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-[#1F7D53]" />
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          changeType === 'positive' 
            ? 'bg-[#1F7D53] bg-opacity-20 text-[#1F7D53] border border-[#1F7D53]' 
            : 'bg-red-600 bg-opacity-20 text-red-400 border border-red-600'
        }`}>
          {changeType === 'positive' ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;