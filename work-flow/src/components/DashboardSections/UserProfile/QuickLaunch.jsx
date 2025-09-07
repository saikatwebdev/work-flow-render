import React from 'react';
import { Plus } from 'lucide-react';
import QuickLaunchCard from './QuickLaunchCard';
import { defaultQuickLaunchOptions } from '../../data/quickLaunchData';

const QuickLaunch = ({ customQuickLaunch, onCreateNew, onEdit, onDelete }) => {
  const allOptions = [...defaultQuickLaunchOptions, ...customQuickLaunch];

  return (
    <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Launch</h3>
          <p className="text-sm text-gray-400">Start new automation campaigns instantly</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="bg-[#1F7D53] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#255F38] transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allOptions.map((option) => (
          <QuickLaunchCard 
            key={option.id} 
            option={option}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(QuickLaunch);