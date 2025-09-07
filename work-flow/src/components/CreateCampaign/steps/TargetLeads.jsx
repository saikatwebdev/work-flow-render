import React, { useState } from 'react';
import { Users, Target, FileText, X, Plus } from 'lucide-react';

const SUGGESTED_AUDIENCES = [
  'Students',
  'Creators', 
  'Founders',
  'Entrepreneurs',
  'College Students',
  'Startup Enthusiasts',
  'Productivity Seekers',
  'Goal-oriented Individuals',
  'Young Professionals',
  'Content Creators'
];

const TargetLeads = ({ data, onChange, validation }) => {
  const [audienceInput, setAudienceInput] = useState('');
  const [audienceTags, setAudienceTags] = useState(
    data.targetAudience ? data.targetAudience.split(', ').filter(Boolean) : []
  );

  const handleAudienceInputChange = (e) => {
    setAudienceInput(e.target.value);
  };

  const handleAudienceInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addAudienceTag(audienceInput.trim());
    }
  };

  const addAudienceTag = (tag) => {
    if (tag && !audienceTags.includes(tag)) {
      const newTags = [...audienceTags, tag];
      setAudienceTags(newTags);
      onChange({ targetAudience: newTags.join(', ') });
      setAudienceInput('');
    }
  };

  const removeAudienceTag = (tagToRemove) => {
    const newTags = audienceTags.filter(tag => tag !== tagToRemove);
    setAudienceTags(newTags);
    onChange({ targetAudience: newTags.join(', ') });
  };

  const addSuggestedAudience = (suggestion) => {
    addAudienceTag(suggestion);
  };

  const handleLeadSourceChange = (e) => {
    onChange({ leadSource: e.target.value });
  };

  const isFieldInvalid = (field) => {
    if (field === 'targetAudience') {
      return validation === false && audienceTags.length === 0;
    }
    return validation === false && !data[field]?.trim();
  };

  return (
    <div className="space-y-6 bg-black text-white min-h-screen p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-[#255F38] rounded-full flex items-center justify-center mx-auto">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">Target Leads</h2>
        <p className="text-gray-400">Define your audience and lead sources</p>
      </div>

      {/* Target Audience */}
      <div className="space-y-3">
        <label htmlFor="target-audience" className="block text-sm font-medium text-white">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Who are you reaching out to? *</span>
          </div>
        </label>
        
        {/* Tags Display */}
        {audienceTags.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-[#1F1F1F] rounded-lg border border-[#255F38]">
            {audienceTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 bg-[#1F7D53] text-white px-3 py-1 rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeAudienceTag(tag)}
                  className="hover:bg-[#255F38] rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Input Field */}
        <div className="relative">
          <input
            id="target-audience"
            type="text"
            value={audienceInput}
            onChange={handleAudienceInputChange}
            onKeyDown={handleAudienceInputKeyDown}
            placeholder="Type audience and press Enter or comma to add..."
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1F7D53] focus:border-transparent transition-colors bg-black text-white placeholder-gray-500 ${
              isFieldInvalid('targetAudience') ? 'border-red-500 bg-red-900' : 'border-[#255F38]'
            }`}
            aria-describedby={isFieldInvalid('targetAudience') ? 'audience-error' : undefined}
          />
          {audienceInput && (
            <button
              onClick={() => addAudienceTag(audienceInput.trim())}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-[#1F7D53] hover:bg-[#255F38] rounded"
              aria-label="Add audience tag"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>

        {isFieldInvalid('targetAudience') && (
          <p id="audience-error" className="text-red-400 text-sm">
            Please add at least one target audience
          </p>
        )}

        {/* Suggested Audiences */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Suggested audiences:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_AUDIENCES
              .filter(suggestion => !audienceTags.includes(suggestion))
              .map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addSuggestedAudience(suggestion)}
                  className="px-3 py-1 text-sm border border-[#255F38] rounded-full hover:border-[#1F7D53] hover:bg-[#255F38] transition-colors text-white"
                >
                  + {suggestion}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Lead Source */}
      <div className="space-y-2">
        <label htmlFor="lead-source" className="block text-sm font-medium text-white">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>How did you obtain the target user? *</span>
          </div>
        </label>
        <textarea
          id="lead-source"
          value={data.leadSource}
          onChange={handleLeadSourceChange}
          placeholder="who engage with content on Instagram and WhatsApp related to productivity and goal-setting."
          rows={4}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1F7D53] focus:border-transparent transition-colors resize-none bg-black text-white placeholder-gray-500 ${
            isFieldInvalid('leadSource') ? 'border-red-500 bg-red-900' : 'border-[#255F38]'
          }`}
          aria-describedby={isFieldInvalid('leadSource') ? 'source-error' : undefined}
        />
        {isFieldInvalid('leadSource') && (
          <p id="source-error" className="text-red-400 text-sm">
            Please describe how you obtained these leads
          </p>
        )}
      </div>

      {/* Lead Summary */}
      {(audienceTags.length > 0 || data.leadSource) && (
        <div className="bg-[#1F1F1F] rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-medium text-white">Lead Summary:</h4>
          <div className="bg-black rounded-lg p-4 border border-[#255F38] space-y-3">
            {audienceTags.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Target Audience:</h5>
                <p className="text-sm text-gray-400">
                  {audienceTags.join(', ')}
                </p>
              </div>
            )}
            {data.leadSource && (
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Lead Source:</h5>
                <p className="text-sm text-gray-400">
                  {data.leadSource}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Validation Summary */}
      {validation === false && (
        <div className="bg-red-900 border border-red-500 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-red-400 mt-0.5">⚠️</div>
            <div>
              <h4 className="text-red-400 font-medium">Please complete required fields</h4>
              <p className="text-red-300 text-sm mt-1">
                Target audience and lead source information are required to proceed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetLeads;