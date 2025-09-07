import React, { useState } from 'react';
import { Link, Upload, X, ExternalLink, File, Plus, Eye } from 'lucide-react';

const FilesAndLinks = ({ data, onChange, validation }) => {
  const [newLink, setNewLink] = useState({ url: '', title: '' });
  const [dragActive, setDragActive] = useState(false);

  const handleAddLink = () => {
    if (newLink.url.trim() && newLink.title.trim()) {
      const updatedLinks = [...(data.links || []), { ...newLink, id: Date.now() }];
      onChange({ links: updatedLinks });
      setNewLink({ url: '', title: '' });
    }
  };

  const handleRemoveLink = (linkId) => {
    const updatedLinks = data.links.filter(link => link.id !== linkId);
    onChange({ links: updatedLinks });
  };

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    const newAttachments = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    const updatedAttachments = [...(data.attachments || []), ...newAttachments];
    onChange({ attachments: updatedAttachments });
  };

  const handleRemoveAttachment = (attachmentId) => {
    const updatedAttachments = data.attachments.filter(att => att.id !== attachmentId);
    onChange({ attachments: updatedAttachments });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('document') || type.includes('word')) return '📝';
    if (type.includes('spreadsheet') || type.includes('excel')) return '📊';
    return '📎';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#255F38' }}>
          <Link className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">Files & Links</h2>
        <p className="text-gray-300">Add resources to support your campaign</p>
      </div>

      {/* Add Links Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white flex items-center space-x-2">
          <ExternalLink className="w-5 h-5" />
          <span>Product Links</span>
        </h3>

        {/* Add New Link Form */}
        <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: '#255F38' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://example.com"
              className="px-3 py-2 rounded text-white placeholder-gray-400"
              style={{ 
                backgroundColor: '#000000',
                border: '1px solid #4b5563'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1F7D53';
                e.target.style.boxShadow = '0 0 0 2px rgba(31, 125, 83, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#4b5563';
                e.target.style.boxShadow = 'none';
              }}
            />
            <input
              type="text"
              value={newLink.title}
              onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Link title"
              className="px-3 py-2 rounded text-white placeholder-gray-400"
              style={{ 
                backgroundColor: '#000000',
                border: '1px solid #4b5563'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1F7D53';
                e.target.style.boxShadow = '0 0 0 2px rgba(31, 125, 83, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#4b5563';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <button
            onClick={handleAddLink}
            disabled={!newLink.url.trim() || !newLink.title.trim()}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded disabled:cursor-not-allowed transition-colors"
            style={{
              backgroundColor: (newLink.url.trim() && newLink.title.trim()) ? '#1F7D53' : '#6b7280'
            }}
            onMouseEnter={(e) => {
              if (newLink.url.trim() && newLink.title.trim()) {
                e.target.style.backgroundColor = '#000000';
              }
            }}
            onMouseLeave={(e) => {
              if (newLink.url.trim() && newLink.title.trim()) {
                e.target.style.backgroundColor = '#1F7D53';
              }
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>

        {/* Links List */}
        {data.links && data.links.length > 0 && (
          <div className="space-y-2">
            {data.links.map((link) => (
              <div key={link.id} className="rounded-lg p-4 flex items-center justify-between" style={{ backgroundColor: '#000000', border: '1px solid #255F38' }}>
                <div className="flex items-center space-x-3">
                  <ExternalLink className="w-5 h-5" style={{ color: '#1F7D53' }} />
                  <div>
                    <h4 className="font-medium text-white">{link.title}</h4>
                    <p className="text-sm text-gray-300 break-all">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.open(link.url, '_blank')}
                    className="p-2 text-gray-400 transition-colors"
                    style={{ color: '#9ca3af' }}
                    onMouseEnter={(e) => e.target.style.color = '#1F7D53'}
                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                    aria-label="Preview link"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    aria-label="Remove link"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>File Attachments</span>
        </h3>

        {/* File Upload Area */}
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
          style={{
            borderColor: dragActive ? '#1F7D53' : '#4b5563',
            backgroundColor: dragActive ? 'rgba(31, 125, 83, 0.1)' : 'transparent'
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onMouseEnter={(e) => {
            if (!dragActive) {
              e.target.style.borderColor = '#6b7280';
            }
          }}
          onMouseLeave={(e) => {
            if (!dragActive) {
              e.target.style.borderColor = '#4b5563';
            }
          }}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-white mb-2">
            Drop files here or click to upload
          </h4>
          <p className="text-gray-300 mb-4">
            Support for images, documents, videos, and more
          </p>
          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded cursor-pointer transition-colors text-white"
            style={{ 
              backgroundColor: '#000000',
              border: '1px solid #4b5563'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#255F38';
              e.target.style.borderColor = '#1F7D53';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#000000';
              e.target.style.borderColor = '#4b5563';
            }}
          >
            <File className="w-4 h-4" />
            <span>Choose Files</span>
          </label>
        </div>

        {/* Attachments List */}
        {data.attachments && data.attachments.length > 0 && (
          <div className="space-y-2">
            {data.attachments.map((attachment) => (
              <div key={attachment.id} className="rounded-lg p-4 flex items-center justify-between" style={{ backgroundColor: '#000000', border: '1px solid #255F38' }}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFileIcon(attachment.type)}</span>
                  <div>
                    <h4 className="font-medium text-white">{attachment.name}</h4>
                    <p className="text-sm text-gray-300">
                      {formatFileSize(attachment.size)} • {attachment.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveAttachment(attachment.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  aria-label="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {((data.links && data.links.length > 0) || (data.attachments && data.attachments.length > 0)) && (
        <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: '#255F38' }}>
          <h4 className="text-sm font-medium text-white">Resources Summary:</h4>
          <div className="rounded-lg p-4 space-y-2" style={{ backgroundColor: '#000000', border: '1px solid #1F7D53' }}>
            {data.links && data.links.length > 0 && (
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" style={{ color: '#1F7D53' }} />
                <span className="text-sm text-gray-300">
                  {data.links.length} link{data.links.length !== 1 ? 's' : ''} added
                </span>
              </div>
            )}
            {data.attachments && data.attachments.length > 0 && (
              <div className="flex items-center space-x-2">
                <File className="w-4 h-4" style={{ color: '#1F7D53' }} />
                <span className="text-sm text-gray-300">
                  {data.attachments.length} file{data.attachments.length !== 1 ? 's' : ''} attached
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Note */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#255F38', border: '1px solid #1F7D53' }}>
        <div className="flex items-start space-x-3">
          <span className="text-yellow-400 text-lg">💡</span>
          <div>
            <h4 className="text-white font-medium">Pro Tip</h4>
            <p className="text-gray-200 text-sm mt-1">
              Adding relevant links and files helps provide context and builds trust with your prospects. 
              Consider including product demos, case studies, or helpful resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesAndLinks;