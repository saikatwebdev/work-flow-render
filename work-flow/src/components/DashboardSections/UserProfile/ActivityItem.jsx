import React from 'react';
import { Activity, Users, MessageSquare, CheckCircle } from 'lucide-react';

const ActivityItem = ({ activity }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-[#1F7D53] text-white';
      case 'paused': return 'bg-[#255F38] text-white';
      case 'new': return 'bg-[#255F38] text-white';
      case 'sent': return 'bg-[#1F7D53] text-white';
      default: return 'bg-gray-700 text-gray-200';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'automation': return <Activity className="w-4 h-4" />;
      case 'lead': return <Users className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors bg-black">
      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white">
        {getIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-white truncate">{activity.name}</p>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
            {activity.status}
          </span>
        </div>
        <p className="text-xs text-gray-400">{activity.action} • {activity.time}</p>
      </div>
    </div>
  );
};

export default React.memo(ActivityItem);