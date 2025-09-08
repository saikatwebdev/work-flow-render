import React from 'react';
import { Edit2, Trash2, Zap, Calendar, Power } from 'lucide-react';
import { platforms } from '../../data/platformData';

const AutomationCard = ({ automation, onToggle, onEdit, onDelete }) => {
  const platform = platforms[automation.platform] || { name: automation.platform || 'Platform', icon: () => null, color: 'bg-gray-400' };
  const Icon = platform.icon;

  return (
    <div className="bg-black rounded-xl shadow-sm border border-gray-700 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${platform.color} text-white`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{automation.name}</h3>
            <p className="text-sm text-gray-400">{automation.trigger}</p>
          </div>
        </div>
        <button
          onClick={() => onToggle(automation.id)}
          className={`p-2 rounded-lg transition-colors ${
            automation.active 
              ? 'bg-green-900 text-green-400 hover:bg-green-800' 
              : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
          }`}
          title={automation.active ? 'Deactivate' : 'Activate'}
        >
          <Power size={20} />
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Zap size={14} style={{color: '#255F38'}} />
          <span>{automation.logic}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar size={14} style={{color: '#1F7D53'}} />
          <span>{automation.schedule || 'Event-driven'}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(automation)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
        >
          <Edit2 size={14} />
          Edit
        </button>
        <button
          onClick={() => onDelete(automation.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 border border-red-800 rounded-lg hover:border-red-700 transition-colors"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AutomationCard;