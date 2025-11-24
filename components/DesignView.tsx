import React, { useState } from 'react';
import { generateProductConcept } from '../services/geminiService';
import { ImageSize } from '../types';

const DesignView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const url = await generateProductConcept(prompt, size);
      if (url) {
        setImageUrl(url);
      } else {
        setError("Failed to generate image. Try a different prompt.");
      }
    } catch (err) {
      setError("An error occurred during generation. Please ensure you have selected a valid API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 mb-2">Product Visualizer</h2>
           <p className="text-slate-600 mb-8">Generate concept images for products that don't exist yet using <span className="font-semibold text-pink-600">Nano Banana Pro</span>.</p>
           
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Product Description</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic transparent toaster with neon blue lights..."
                className="w-full h-32 p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none mb-4"
              />
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Resolution</label>
                <div className="flex space-x-2">
                   {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            size === s 
                            ? 'bg-pink-600 text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                   ))}
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                    <>
                       <i className="fas fa-circle-notch fa-spin mr-2"></i> Generating...
                    </>
                ) : (
                    <>
                       <i className="fas fa-wand-magic-sparkles mr-2 text-pink-400"></i> Generate Concept
                    </>
                )}
              </button>
              {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
           </div>

           <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-start">
                 <i className="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
                 <p className="text-sm text-blue-800">
                    High-quality image generation requires a paid API key. You will be prompted to select one if you haven't already.
                 </p>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-center bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 min-h-[500px] overflow-hidden relative">
            {!imageUrl && !isLoading && (
                <div className="text-center text-slate-400 p-8">
                    <i className="fas fa-image text-6xl mb-4 opacity-50"></i>
                    <p>Your generated image will appear here</p>
                </div>
            )}

            {isLoading && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-10">
                    <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-pink-600 font-medium">Creating masterpiece...</p>
                 </div>
            )}

            {imageUrl && (
                <div className="relative group w-full h-full flex items-center justify-center bg-slate-900">
                    <img src={imageUrl} alt="Generated Concept" className="max-w-full max-h-full object-contain shadow-2xl" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={imageUrl} download="concept.png" className="bg-white/20 hover:bg-white/40 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium">
                            <i className="fas fa-download mr-2"></i> Download
                        </a>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DesignView;
