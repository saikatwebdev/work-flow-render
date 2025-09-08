import React, { useState, useEffect } from 'react';
import { X, Upload, Link, FileText, HelpCircle, Plus, Trash2 } from 'lucide-react';

const UploadModal = ({ sourceType, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    files: [],
    urls: [''],
    text: '',
    qaItems: [{ question: '', answer: '' }]
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, files }));
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...formData.urls];
    newUrls[index] = value;
    setFormData(prev => ({ ...prev, urls: newUrls }));
  };

  const addUrl = () => {
    setFormData(prev => ({ ...prev, urls: [...prev.urls, ''] }));
  };

  const removeUrl = (index) => {
    const newUrls = formData.urls.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, urls: newUrls }));
  };

  const handleTextChange = (value) => {
    setFormData(prev => ({ ...prev, text: value }));
  };

  const handleQAChange = (index, field, value) => {
    const newQAItems = [...formData.qaItems];
    newQAItems[index][field] = value;
    setFormData(prev => ({ ...prev, qaItems: newQAItems }));
  };

  const addQAItem = () => {
    setFormData(prev => ({ 
      ...prev, 
      qaItems: [...prev.qaItems, { question: '', answer: '' }] 
    }));
  };

  const removeQAItem = (index) => {
    const newQAItems = formData.qaItems.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, qaItems: newQAItems }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(sourceType, formData);
    handleClose();
  };

  const getModalConfig = () => {
    switch (sourceType) {
      case 'file':
        return {
          title: 'Upload Files',
          icon: Upload,
          color: 'text-white',
          bgColor: 'bg-gray-900'
        };
      case 'url':
        return {
          title: 'Add URLs',
          icon: Link,
          color: 'text-white',
          bgColor: 'bg-gray-900'
        };
      case 'text':
        return {
          title: 'Add Plain Text',
          icon: FileText,
          color: 'text-white',
          bgColor: 'bg-gray-900'
        };
      case 'qa':
        return {
          title: 'Add Q&A',
          icon: HelpCircle,
          color: 'text-white',
          bgColor: 'bg-gray-900'
        };
      default:
        return {
          title: 'Add Content',
          icon: Upload,
          color: 'text-white',
          bgColor: 'bg-gray-900'
        };
    }
  };

  const config = getModalConfig();
  const IconComponent = config.icon;

  const renderContent = () => {
    switch (sourceType) {
      case 'file':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 bg-gray-800 rounded-lg p-8 text-center hover:border-[#1F7D53] hover:bg-gray-700 transition-all duration-300">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                multiple
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-[#1F7D53] hover:text-[#255F38] font-medium transition-colors duration-200"
              >
                Click to upload files
              </label>
              <p className="text-sm text-gray-400 mt-2">PDF, TXT files supported</p>
            </div>
            {formData.files.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-white">Selected Files:</h4>
                {formData.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 border border-gray-600 p-3 rounded-lg">
                    <span className="text-sm text-white">{file.name}</span>
                    <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'url':
        return (
          <div className="space-y-4">
            {formData.urls.map((url, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#1F7D53] focus:border-[#1F7D53] placeholder-gray-400 transition-all duration-200"
                />
                {formData.urls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUrl(index)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addUrl}
              className="flex items-center space-x-2 text-[#1F7D53] hover:text-[#255F38] transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add another URL</span>
            </button>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <textarea
              value={formData.text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter your text content here..."
              rows={8}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#1F7D53] focus:border-[#1F7D53] resize-none placeholder-gray-400 transition-all duration-200"
            />
            <div className="text-sm text-gray-400">
              {formData.text.length} characters
            </div>
          </div>
        );

      case 'qa':
        return (
          <div className="space-y-6">
            {formData.qaItems.map((item, index) => (
              <div key={index} className="border border-gray-600 bg-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white">Q&A #{index + 1}</h4>
                  {formData.qaItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQAItem(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-gray-700 p-1 rounded transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                  placeholder="Enter question..."
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-[#1F7D53] focus:border-[#1F7D53] placeholder-gray-400 transition-all duration-200"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                  placeholder="Enter answer..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-[#1F7D53] focus:border-[#1F7D53] resize-none placeholder-gray-400 transition-all duration-200"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addQAItem}
              className="flex items-center space-x-2 text-[#1F7D53] hover:text-[#255F38] transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add another Q&A</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out ${
        isAnimating 
          ? 'bg-black bg-opacity-60 backdrop-blur-sm' 
          : 'bg-black bg-opacity-0 backdrop-blur-sm'
      }`}
      onClick={handleBackdropClick}
    >
      <div className={`
        bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-700
        transform transition-all duration-200 ease-out
        ${isAnimating 
          ? 'scale-100 translate-y-0 opacity-100 rotate-0' 
          : 'scale-95 translate-y-8 opacity-0 rotate-1'
        }
      `} style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}>
        {/* Header */}
        <div className={`${config.bgColor} px-6 py-4 border-b border-gray-700`} style={{ boxShadow: '0 0 20px rgba(31, 125, 83, 0.2)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-[#1F7D53] ${config.color} shadow-lg`} style={{ boxShadow: '0 0 15px rgba(31, 125, 83, 0.4)' }}>
                <IconComponent className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">{config.title}</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-800 hover:text-red-400 rounded-lg transition-all duration-200 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col max-h-[calc(90vh-140px)]">
          <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
            {renderContent()}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-700 bg-gray-900 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#1F7D53] hover:bg-[#255F38] text-white rounded-lg transition-all duration-200 shadow-lg"
              style={{ boxShadow: '0 0 15px rgba(31, 125, 83, 0.3)' }}
            >
              Add Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;