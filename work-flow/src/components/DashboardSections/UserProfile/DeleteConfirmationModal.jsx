import React from 'react';
import { X } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, automationName, onClose, onConfirm }) => {
  return (
    <div className={`fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-black border border-gray-700 rounded-xl p-6 w-full max-w-md transform transition-all duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Delete Automation</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300">
            Are you sure you want to delete "{automationName}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteConfirmationModal);