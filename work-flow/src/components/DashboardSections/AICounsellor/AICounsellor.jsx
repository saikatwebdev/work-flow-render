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
    <div className="max-w-6xl mx-auto p-4 space-y-6 bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Counsellor</h1>
          <p className="text-gray-300">Select a user conversation from any platform and get actionable insights.</p>
        </div>
      </div>

      <div className="bg-[#255F38] rounded-lg border border-gray-700 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-white mb-1">Conversation</label>
            <select
              className="w-full border border-gray-700 bg-black text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1F7D53] focus:border-transparent"
              value={selectedId}
              onChange={e => setSelectedId(e.target.value)}
              disabled={loadingList}
            >
              <option value="" disabled>Select a conversation…</option>
              {conversations.map(c => (
                <option key={c.id} value={c.id}>{c.name || c.username || c.id}</option>
              ))}
            </select>
          </div>
          <div className="flex md:justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!selectedId || analyzing}
              className={`px-4 py-2 rounded-lg text-white font-medium ${(!selectedId || analyzing) ? 'bg-gray-600' : 'bg-[#1F7D53] hover:bg-black'} transition-colors`}
            >
              {analyzing ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* System prompt editor */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">System prompt (what we sell, positioning, tone)</label>
          <textarea
            className="w-full border border-gray-700 bg-black text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1F7D53] focus:border-transparent min-h-[100px] placeholder-gray-400"
            placeholder="e.g., We sell a SaaS workflow automation tool for SMBs. Emphasize ROI, fast onboarding, and 24/7 support. Use friendly, concise tone."
            value={systemPrompt}
            onChange={e => setSystemPrompt(e.target.value)}
            disabled={!selectedId}
          />
          <div className="flex gap-2">
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
              className={`px-3 py-2 rounded-lg text-white font-medium ${!selectedId ? 'bg-gray-600' : 'bg-black hover:bg-[#1F7D53]'} transition-colors`}
            >
              Save prompt
            </button>
          </div>
        </div>

        {error && <div className="text-sm text-red-400">{error}</div>}
      </div>

      {/* Analysis card */}
      <div className="bg-[#255F38] rounded-lg border border-gray-700 p-4">
        {!analysis ? (
          <div className="text-gray-400 text-sm">No analysis yet. Select a conversation and click Analyze.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Intent</p>
                <p className="text-sm font-medium text-white">{analysis.intent || '-'}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Interest Score</p>
                  <p className="text-sm font-medium text-white">{analysis.interestScore ?? '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Stage</p>
                  <p className="text-sm font-medium text-white capitalize">{analysis.stage || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Urgency</p>
                  <p className="text-sm font-medium text-white capitalize">{analysis.urgency || '-'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Objections</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(analysis.objections || []).length === 0 ? (
                    <span className="text-xs text-gray-400">None detected</span>
                  ) : (
                    (analysis.objections || []).map((o, i) => (
                      <span key={i} className="text-xs bg-[#1F7D53] text-gray-300 px-2 py-1 rounded">{o}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">Suggested Next Step</p>
                <p className="text-sm font-medium text-white">{analysis.suggestedNextStep || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Recommended Content</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(analysis.recommendedContent || []).length === 0 ? (
                    <span className="text-xs text-gray-400">None</span>
                  ) : (
                    (analysis.recommendedContent || []).map((c, i) => (
                      <span key={i} className="text-xs bg-[#1F7D53] text-white px-2 py-1 rounded">{c}</span>
                    ))
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Summary</p>
                <p className="text-sm text-gray-300 mt-1">{analysis.summary || '-'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICounsellor;