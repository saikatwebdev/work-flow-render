import React, { useEffect, useMemo, useState } from 'react';

// Simple select + panel that lets user pick a conversation from any platform
// and runs AI analysis over the last messages.
const AICounsellor = () => {
  const [loadingList, setLoadingList] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');

  // Load available conversations (Messenger for now; extendable later)
  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoadingList(true);
      setError('');
      try {
        const res = await fetch('/api/messenger/conversations');
        const data = await res.json();
        if (!res.ok) {
          if (!ignore) setError(typeof data?.error === 'string' ? data.error : 'Failed to load conversations');
          return;
        }
        if (!ignore && Array.isArray(data)) setConversations(data);
      } catch (e) {
        if (!ignore) setError('Failed to load conversations');
      } finally {
        if (!ignore) setLoadingList(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const selected = useMemo(() => conversations.find(c => c.id === selectedId) || null, [conversations, selectedId]);

  // Load stored system prompt when conversation changes
  useEffect(() => {
    let ignore = false;
    if (!selectedId) { setSystemPrompt(''); return; }
    (async () => {
      try {
        const res = await fetch('/api/messenger/messages?conversationId=' + encodeURIComponent(selectedId));
        // We don't need messages here; just try fetch stored prompt via a dedicated endpoint soon.
      } catch (_) {}
      // Try to fetch stored system prompt via a tiny POST (existing save endpoint doesn't have GET; we can extend later)
      try {
        const res = await fetch('/api/messenger/system-prompt?conversationId=' + encodeURIComponent(selectedId));
        if (res.ok) {
          const data = await res.json();
          if (typeof data?.systemPrompt === 'string') setSystemPrompt(data.systemPrompt);
        }
      } catch (_) {}
    })();
    return () => { ignore = true; };
  }, [selectedId]);

  const handleAnalyze = async () => {
    if (!selectedId) return;
    setAnalyzing(true);
    setAnalysis(null);
    setError('');
    try {
      const res = await fetch('/api/ai/analyze-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: selectedId, systemPrompt })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data?.error === 'string' ? data.error : 'analyze_failed');
        return;
      }
      setAnalysis(data.analysis || null);
    } catch (e) {
      setError('Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4">AI Conversation Counsellor</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Analyze customer conversations with AI-powered insights to improve engagement and conversion rates
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-1">Configuration</h2>
            <p className="text-sm text-gray-400">Select a conversation and configure analysis parameters</p>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Conversation Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Select Conversation
                </label>
                <select
                  className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1F7D53] focus:border-transparent transition-colors"
                  value={selectedId}
                  onChange={e => setSelectedId(e.target.value)}
                  disabled={loadingList}
                >
                  <option value="" disabled>
                    {loadingList ? 'Loading conversations...' : 'Choose a conversation to analyze'}
                  </option>
                  {conversations.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name || c.username || c.id}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedId || analyzing}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    (!selectedId || analyzing) 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-[#1F7D53] hover:bg-[#255F38] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {analyzing ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing
                    </span>
                  ) : (
                    'Analyze'
                  )}
                </button>
              </div>
            </div>

            {/* System Prompt Editor */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-200">
                System Prompt
                <span className="text-xs text-gray-400 ml-2">
                  Define your product, positioning, and communication tone
                </span>
              </label>
              <textarea
                className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1F7D53] focus:border-transparent min-h-[120px] placeholder-gray-500 transition-colors"
                placeholder="Example: We sell a SaaS workflow automation tool for SMBs. Emphasize ROI, fast onboarding, and 24/7 support. Use a friendly, professional, and concise tone that builds trust."
                value={systemPrompt}
                onChange={e => setSystemPrompt(e.target.value)}
                disabled={!selectedId}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {systemPrompt.length} characters
                </span>
                <button
                  onClick={async () => {
                    if (!selectedId) return;
                    try {
                      const res = await fetch('/api/messenger/system-prompt', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ conversationId: selectedId, systemPrompt })
                      });
                      if (!res.ok) {
                        const data = await res.json().catch(()=>({}));
                        setError(typeof data?.error === 'string' ? data.error : 'Failed to save system prompt');
                        return;
                      }
                      setError('');
                    } catch (_) {
                      setError('Failed to save system prompt');
                    }
                  }}
                  disabled={!selectedId}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !selectedId 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-700 hover:bg-[#1F7D53] text-white'
                  }`}
                >
                  Save Prompt
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-red-600 rounded-full p-1 mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-400 text-sm font-medium">{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-1">Analysis Results</h2>
            <p className="text-sm text-gray-400">AI-powered insights from conversation data</p>
          </div>
          
          <div className="p-6">
            {!analysis ? (
              <div className="text-center py-12">
                <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No analysis available</p>
                <p className="text-gray-600 text-sm mt-1">Select a conversation and click "Analyze" to get insights</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-[#1F7D53]">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">Interest Score</div>
                    <div className="text-3xl font-bold text-white mt-2">{analysis.interestScore ?? '-'}</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-[#255F38]">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">Stage</div>
                    <div className="text-3xl font-bold text-white mt-2 capitalize">{analysis.stage || '-'}</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6 border-l-4 border-yellow-500">
                    <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">Urgency</div>
                    <div className="text-3xl font-bold text-white mt-2 capitalize">{analysis.urgency || '-'}</div>
                  </div>
                </div>

                {/* Detailed Analysis Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Intent */}
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Customer Intent</h3>
                      <p className="text-gray-300 leading-relaxed">{analysis.intent || 'No intent detected'}</p>
                    </div>

                    {/* Objections */}
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Identified Objections</h3>
                      <div className="flex flex-wrap gap-2">
                        {(analysis.objections || []).length === 0 ? (
                          <span className="text-gray-500 italic">No objections detected</span>
                        ) : (
                          (analysis.objections || []).map((objection, i) => (
                            <span key={i} className="bg-red-900/30 text-red-300 px-3 py-1 rounded-full text-sm border border-red-800">
                              {objection}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Next Steps */}
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Suggested Next Step</h3>
                      <p className="text-gray-300 leading-relaxed">{analysis.suggestedNextStep || 'No suggestions available'}</p>
                    </div>

                    {/* Recommended Content */}
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">Recommended Content</h3>
                      <div className="flex flex-wrap gap-2">
                        {(analysis.recommendedContent || []).length === 0 ? (
                          <span className="text-gray-500 italic">No content recommendations</span>
                        ) : (
                          (analysis.recommendedContent || []).map((content, i) => (
                            <span key={i} className="bg-[#1F7D53] text-white px-3 py-1 rounded-full text-sm">
                              {content}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                {analysis.summary && (
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Executive Summary</h3>
                    <p className="text-gray-300 leading-relaxed text-base">{analysis.summary}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICounsellor;