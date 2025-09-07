import React from 'react';
import { Play, Edit, Trash2 } from 'lucide-react';

const QuickLaunchCard = ({ option, onEdit, onDelete }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(option);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(option);
  };

  return (
    <div className="bg-black rounded-xl p-6 shadow-sm border border-gray-700 hover:shadow-md transition-all duration-300 cursor-pointer group transform hover:scale-105">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <option.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-[#1F7D53] transition-colors">
            {option.name}
            {option.isCustom && (
              <span className="ml-2 text-xs bg-[#255F38] bg-opacity-20 text-[#1F7D53] px-2 py-1 rounded-full border border-[#255F38]">
                Custom
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-400">{option.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {option.isCustom && (
            <>
              <button
                onClick={handleEdit}
                className="p-2 text-[#1F7D53] hover:bg-[#1F7D53] hover:bg-opacity-10 rounded-lg transition-colors"
                title="Edit automation"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-500 hover:bg-red-500 hover:bg-opacity-10 rounded-lg transition-colors"
                title="Delete automation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <Play className="w-5 h-5 text-gray-400 group-hover:text-[#1F7D53] transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuickLaunchCard);