import React, { useState } from 'react';
import { getExpertBuyingAdvice } from '../services/geminiService';

const ExpertView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setAdvice(null);
    try {
      const result = await getExpertBuyingAdvice(query);
      setAdvice(result);
    } catch (error) {
      console.error(error);
      setAdvice("Sorry, I couldn't generate advice at this moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Expert Buying Advisor</h2>
        <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 border border-indigo-100">
           <i className="fas fa-brain mr-2"></i> Thinking Mode Enabled
        </div>
        <p className="text-slate-600">
          Ask complex questions. The AI will take time to "think" deeply about specs, value, and usage cases.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
           <label className="block text-sm font-medium text-slate-700 mb-2">What do you need help with?</label>
           <div className="flex gap-2">
             <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Compare the MacBook Air M2 vs M3 for video editing..."
                className="flex-grow p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
             />
             <button 
                onClick={handleAsk}
                disabled={isLoading || !query.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
                {isLoading ? 'Thinking...' : 'Ask Expert'}
             </button>
           </div>
        </div>

        <div className="p-8 min-h-[300px] bg-white">
           {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                 <div className="relative w-20 h-20 mb-4">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                 </div>
                 <p className="animate-pulse font-medium text-indigo-600">Analyzing market data...</p>
                 <p className="text-xs text-slate-400 mt-2">Thinking Budget: 32k tokens</p>
              </div>
           )}

           {!isLoading && !advice && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                 <i className="far fa-comments text-6xl mb-4 text-slate-200"></i>
                 <p>Ask me anything about products!</p>
              </div>
           )}

           {advice && (
              <div className="prose prose-slate max-w-none">
                 <div className="flex items-start mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 mr-4">
                        <i className="fas fa-robot"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Expert Analysis</h4>
                        <div className="mt-2 text-slate-700 whitespace-pre-line leading-relaxed">
                            {advice}
                        </div>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ExpertView;