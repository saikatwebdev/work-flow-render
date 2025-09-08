import React, { useState, useRef, useEffect } from 'react';
import { Upload, Link2, FileText, HelpCircle, Plus } from 'lucide-react';

const SourceSelector = ({ onSourceSelect, showAsButton = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const sources = [
    {
      type: 'file',
      icon: Upload,
      title: 'File Upload',
      description: 'Upload documents, PDFs, or text files'
    },
    {
      type: 'url',
      icon: Link2,
      title: 'URL / Website',
      description: 'Add content from websites or links'
    },
    {
      type: 'text',
      icon: FileText,
      title: 'Plain Text',
      description: 'Paste or type content directly'
    },
    {
      type: 'qa',
      icon: HelpCircle,
      title: 'Q&A',
      description: 'Add question and answer pairs'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

  const handleSourceClick = (sourceType) => {
    setShowDropdown(false);
    onSourceSelect(sourceType);
  };

  // Button mode - shows as "Add More Content" button with dropdown
  if (showAsButton) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-4 py-2 bg-[#1F7D53] hover:bg-[#255F38] text-white rounded-lg transition-all duration-200 flex items-center space-x-2 shadow-lg border border-gray-600"
          style={{ boxShadow: '0 0 15px rgba(31, 125, 83, 0.3)' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add More Content</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 z-50 overflow-hidden">
            <div className="p-2">
              {sources.map((source) => (
                <button
                  key={source.type}
                  onClick={() => handleSourceClick(source.type)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group border border-transparent hover:border-gray-600"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center group-hover:bg-[#1F7D53] transition-all duration-200">
                      <source.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">{source.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{source.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default grid mode - shows as the main selector grid
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">Feed your AI</h3>
        <p className="text-gray-400">Choose a content source to train your AI assistant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => (
          <button
            key={source.type}
            onClick={() => onSourceSelect(source.type)}
            className="bg-gray-900 border-2 border-gray-700 rounded-xl p-6 hover:border-[#1F7D53] hover:bg-gray-800 hover:shadow-xl transition-all duration-300 group text-left relative overflow-hidden"
            style={{ 
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="flex items-start space-x-4 relative z-10">
              <div className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center group-hover:bg-[#1F7D53] group-hover:border-[#255F38] transition-all duration-300">
                <source.icon className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-white mb-1 group-hover:text-white">{source.title}</h4>
                <p className="text-sm text-gray-400 group-hover:text-gray-300">{source.description}</p>
              </div>
            </div>
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F7D53] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SourceSelector;