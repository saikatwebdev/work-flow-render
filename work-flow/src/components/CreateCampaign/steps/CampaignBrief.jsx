import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Linkedin, Facebook, Mail, Phone } from 'lucide-react';
import { FaWhatsapp, FaTwitter, FaTelegram } from 'react-icons/fa';

const AVAILABLE_CHANNELS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: FaWhatsapp, color: 'text-green-500' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-500'}
  
];

const CampaignBrief = ({ data, onChange, validation }) => {
  const [detectedChannels, setDetectedChannels] = useState([]);

  // Auto-detect channels from description text
  useEffect(() => {
    if (data.description) {
      const text = data.description.toLowerCase();
      const detected = AVAILABLE_CHANNELS.filter(channel => 
        text.includes(channel.name.toLowerCase()) || 
        text.includes(channel.id)
      );
      setDetectedChannels(detected.map(c => c.id));
    }
  }, [data.description]);

  const handleDescriptionChange = (e) => {
    onChange({ description: e.target.value });
  };

  const toggleChannel = (channelId) => {
    const newChannels = data.channels.includes(channelId)
      ? data.channels.filter(id => id !== channelId)
      : [...data.channels, channelId];
    onChange({ channels: newChannels });
  };

  const isChannelSelected = (channelId) => {
    return data.channels.includes(channelId) || detectedChannels.includes(channelId);
  };

  return (
    <div className="space-y-6">
      {/* Helper Note */}
      <div className="rounded-lg p-4" style={{ backgroundColor: '#255F38', border: '1px solid #1F7D53' }}>
        <div className="flex items-start space-x-3">
          <span className="text-yellow-400 text-lg">🌟</span>
          <p className="text-white text-sm">
            Talk about what you want to achieve with this campaign
          </p>
        </div>
      </div>

      {/* Description Textarea */}
      <div className="space-y-2">
        <label 
          htmlFor="campaign-description"
          className="block text-sm font-medium text-white"
        >
          Describe your campaign in a short brief.
        </label>
        <textarea
          id="campaign-description"
          value={data.description}
          onChange={handleDescriptionChange}
          placeholder="Launching an online campaign for WorkFlow can position your product as the ultimate tool for productivity and goal-setting, especially among college students, creatives, and startup enthusiasts. Start by clearly defining the campaign's purpose: 'to create awareness and sell WorkFlow to 100+ users within the first month by leveraging Instagram and WhatsApp.'"
          className={`w-full h-32 px-4 py-3 rounded-lg resize-none transition-colors text-white placeholder-gray-400 ${
            validation === false 
              ? 'bg-red-900/20 border-red-400' 
              : 'bg-black border-gray-600 focus:border-green-500'
          }`}
          style={{
            backgroundColor: validation === false ? 'rgba(127, 29, 29, 0.2)' : '#000000',
            border: validation === false ? '1px solid #f87171' : '1px solid #4b5563',
            ...(validation !== false && {
              '&:focus': {
                outline: 'none',
                borderColor: '#1F7D53',
                boxShadow: `0 0 0 2px rgba(31, 125, 83, 0.2)`
              }
            })
          }}
          onFocus={(e) => {
            if (validation !== false) {
              e.target.style.borderColor = '#1F7D53';
              e.target.style.boxShadow = '0 0 0 2px rgba(31, 125, 83, 0.2)';
            }
          }}
          onBlur={(e) => {
            if (validation !== false) {
              e.target.style.borderColor = '#4b5563';
              e.target.style.boxShadow = 'none';
            }
          }}
          aria-describedby={validation === false ? 'description-error' : undefined}
        />
        {validation === false && (
          <p id="description-error" className="text-red-400 text-sm">
            Please provide a campaign description (minimum 10 characters)
          </p>
        )}
      </div>

      {/* Channel Detection and Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Choose Platform</h3>
          {detectedChannels.length > 0 && (
            <span className="text-sm px-2 py-1 rounded" style={{ color: '#1F7D53', backgroundColor: 'rgba(31, 125, 83, 0.1)' }}>
              {detectedChannels.length} detected
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {AVAILABLE_CHANNELS.map((channel) => {
            const Icon = channel.icon;
            const isSelected = isChannelSelected(channel.id);
            const isDetected = detectedChannels.includes(channel.id);
            
            return (
              <button
                key={channel.id}
                onClick={() => toggleChannel(channel.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 hover:shadow-md ${
                  isDetected ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgba(31, 125, 83, 0.1)' : '#000000',
                  borderColor: isSelected ? '#1F7D53' : '#4b5563',
                  ...(isDetected && { 
                    '--tw-ring-color': 'rgba(31, 125, 83, 0.3)',
                    boxShadow: '0 0 0 2px rgba(31, 125, 83, 0.3)'
                  })
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = '#6b7280';
                    e.target.style.backgroundColor = 'rgba(37, 95, 56, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = '#4b5563';
                    e.target.style.backgroundColor = '#000000';
                  }
                }}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? 'Remove' : 'Add'} ${channel.name}`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : channel.color}`} />
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-white' : 'text-gray-300'
                }`}>
                  {channel.name}
                </span>
                {isDetected && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: '#1F7D53', backgroundColor: 'rgba(31, 125, 83, 0.1)' }}>
                    Auto-detected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Channels Summary */}
      {(data.channels.length > 0 || detectedChannels.length > 0) && (
        <div className="rounded-lg p-4" style={{ backgroundColor: '#255F38' }}>
          <h4 className="text-sm font-medium text-white mb-2">Selected Channels:</h4>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_CHANNELS
              .filter(channel => isChannelSelected(channel.id))
              .map(channel => {
                const Icon = channel.icon;
                return (
                  <span
                    key={channel.id}
                    className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: '#000000', border: '1px solid #1F7D53', color: 'white' }}
                  >
                    <Icon className={`w-4 h-4 ${channel.color}`} />
                    <span>{channel.name}</span>
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignBrief;