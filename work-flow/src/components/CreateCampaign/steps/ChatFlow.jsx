import React, { useState } from 'react';
import { MessageCircle, Plus, Trash2, ChevronUp, ChevronDown, Edit3 } from 'lucide-react';

const DEFAULT_STEPS = [
  'Start with greeting and ask what their #1 goal is',
  'Listen to their response and provide personalized achievement tips',
  'Introduce your product as a solution to help them reach their goals',
  'Share success stories or testimonials from similar users',
  'Offer a free trial or demo of your product',
  'Follow up with additional resources and support'
];

const ChatFlow = ({ data, onChange, validation }) => {
  const [editingStep, setEditingStep] = useState(null);
  const [newStepText, setNewStepText] = useState('');

  const steps = data.steps.length > 0 ? data.steps : DEFAULT_STEPS;

  const handleObjectiveChange = (e) => {
    onChange({ objective: e.target.value });
  };

  const handleStepEdit = (index, newText) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = newText;
    onChange({ steps: updatedSteps });
    setEditingStep(null);
  };

  const handleAddStep = () => {
    if (newStepText.trim()) {
      const updatedSteps = [...steps, newStepText.trim()];
      onChange({ steps: updatedSteps });
      setNewStepText('');
    }
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    onChange({ steps: updatedSteps });
  };

  const moveStepUp = (index) => {
    if (index === 0) return;
    const newSteps = [...steps];
    [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
    onChange({ steps: newSteps });
  };

  const moveStepDown = (index) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
    onChange({ steps: newSteps });
  };

  const isFieldInvalid = (field) => {
    if (field === 'objective') {
      return validation === false && !data[field]?.trim();
    }
    if (field === 'steps') {
      return validation === false && steps.length === 0;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#255F38' }}>
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">Chat Flow</h2>
        <p className="text-gray-300">Design your conversation strategy</p>
      </div>

      {/* Campaign Objective */}
      <div className="space-y-2">
        <label htmlFor="campaign-objective" className="block text-sm font-medium text-white">
          Campaign Objective *
        </label>
        <textarea
          id="campaign-objective"
          value={data.objective}
          onChange={handleObjectiveChange}
          placeholder="Create awareness and sell WorkFlow to over 100 users within the first month by engaging them through personalized conversations."
          rows={3}
          className={`w-full px-4 py-3 rounded-lg transition-colors resize-none text-white placeholder-gray-400 ${
            isFieldInvalid('objective') 
              ? 'bg-red-900/20 border-red-400' 
              : 'bg-black border-gray-600'
          }`}
          style={{
            backgroundColor: isFieldInvalid('objective') ? 'rgba(127, 29, 29, 0.2)' : '#000000',
            border: isFieldInvalid('objective') ? '1px solid #f87171' : '1px solid #4b5563'
          }}
          onFocus={(e) => {
            if (!isFieldInvalid('objective')) {
              e.target.style.borderColor = '#1F7D53';
              e.target.style.boxShadow = '0 0 0 2px rgba(31, 125, 83, 0.2)';
            }
          }}
          onBlur={(e) => {
            if (!isFieldInvalid('objective')) {
              e.target.style.borderColor = '#4b5563';
              e.target.style.boxShadow = 'none';
            }
          }}
          aria-describedby={isFieldInvalid('objective') ? 'objective-error' : undefined}
        />
        {isFieldInvalid('objective') && (
          <p id="objective-error" className="text-red-400 text-sm">
            Please provide a campaign objective
          </p>
        )}
      </div>

      {/* Chat Flow Steps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Conversation Flow</h3>
          <span className="text-sm text-gray-400">{steps.length} steps</span>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              style={{ 
                backgroundColor: '#000000', 
                border: '1px solid #255F38' 
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(37, 95, 56, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
            >
              <div className="flex items-start space-x-3">
                {/* Move Controls */}
                <div className="flex flex-col space-y-1 mt-1">
                  <button
                    onClick={() => moveStepUp(index)}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveStepDown(index)}
                    disabled={index === steps.length - 1}
                    className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Step Number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white" style={{ backgroundColor: '#1F7D53' }}>
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  {editingStep === index ? (
                    <div className="space-y-2">
                      <textarea
                        value={step}
                        onChange={(e) => {
                          const updatedSteps = [...steps];
                          updatedSteps[index] = e.target.value;
                          onChange({ steps: updatedSteps });
                        }}
                        className="w-full px-3 py-2 rounded resize-none bg-black text-white placeholder-gray-400"
                        style={{ 
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
                        rows={2}
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingStep(null)}
                          className="px-3 py-1 text-white text-sm rounded hover:opacity-90 transition-colors"
                          style={{ backgroundColor: '#1F7D53' }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingStep(null)}
                          className="px-3 py-1 text-gray-300 text-sm hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-200 text-sm leading-relaxed">{step}</p>
                  )}
                </div>

                {/* Actions */}
                {editingStep !== index && (
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setEditingStep(index)}
                      className="p-1 text-gray-400 transition-colors"
                      style={{ color: '#9ca3af' }}
                      onMouseEnter={(e) => e.target.style.color = '#1F7D53'}
                      onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                      aria-label="Edit step"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      aria-label="Remove step"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Step */}
        <div className="border-2 border-dashed rounded-lg p-4 transition-colors" style={{ borderColor: '#4b5563' }}
             onMouseEnter={(e) => e.target.style.borderColor = '#255F38'}
             onMouseLeave={(e) => e.target.style.borderColor = '#4b5563'}>
          <div className="space-y-3">
            <textarea
              value={newStepText}
              onChange={(e) => setNewStepText(e.target.value)}
              placeholder="Add a new step to your conversation flow..."
              className="w-full px-3 py-2 rounded resize-none bg-black text-white placeholder-gray-400"
              style={{ border: '1px solid #4b5563' }}
              onFocus={(e) => {
                e.target.style.borderColor = '#1F7D53';
                e.target.style.boxShadow = '0 0 0 2px rgba(31, 125, 83, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#4b5563';
                e.target.style.boxShadow = 'none';
              }}
              rows={2}
            />
            <button
              onClick={handleAddStep}
              disabled={!newStepText.trim()}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded disabled:cursor-not-allowed transition-colors"
              style={{ 
                backgroundColor: newStepText.trim() ? '#1F7D53' : '#6b7280'
              }}
              onMouseEnter={(e) => {
                if (newStepText.trim()) {
                  e.target.style.backgroundColor = '#255F38';
                }
              }}
              onMouseLeave={(e) => {
                if (newStepText.trim()) {
                  e.target.style.backgroundColor = '#1F7D53';
                }
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Step</span>
            </button>
          </div>
        </div>
      </div>

      {/* Flow Summary */}
      {data.objective && steps.length > 0 && (
        <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: '#255F38' }}>
          <h4 className="text-sm font-medium text-white">Flow Summary:</h4>
          <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: '#000000', border: '1px solid #1F7D53' }}>
            <div>
              <h5 className="text-sm font-medium text-white mb-1">Objective:</h5>
              <p className="text-sm text-gray-300">{data.objective}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Conversation Steps:</h5>
              <div className="space-y-1">
                {steps.slice(0, 3).map((step, index) => (
                  <p key={index} className="text-sm text-gray-300">
                    {index + 1}. {step.length > 60 ? step.substring(0, 60) + '...' : step}
                  </p>
                ))}
                {steps.length > 3 && (
                  <p className="text-sm text-gray-400 italic">
                    +{steps.length - 3} more steps...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validation Summary */}
      {validation === false && (
        <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(127, 29, 29, 0.2)', border: '1px solid #f87171' }}>
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-red-400 mt-0.5">⚠️</div>
            <div>
              <h4 className="text-red-400 font-medium">Please complete required fields</h4>
              <p className="text-red-300 text-sm mt-1">
                Campaign objective and at least one conversation step are required.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatFlow;