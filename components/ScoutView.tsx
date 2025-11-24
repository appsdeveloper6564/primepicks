import React, { useState } from 'react';
import { Product } from '../types';
import { searchProductsWithGrounding } from '../services/geminiService';
import ProductGrid from './ProductGrid';

const ScoutView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setProducts([]); // Clear previous results immediately
    
    try {
      const results = await searchProductsWithGrounding(query);
      setProducts(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[600px]">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">AI Product Scout</h2>
        <p className="text-slate-600 mb-8">
          Use the power of Google Search grounding to find the latest real-world products.
        </p>
        
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., best noise cancelling headphones under ₹20000"
            className="w-full pl-6 pr-32 py-4 text-lg bg-white border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-8 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Scout'}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="mt-8">
           <h3 className="text-xl font-semibold mb-6 px-4">
             {isLoading ? 'Scouting products...' : `Results for "${query}"`}
           </h3>
           <ProductGrid products={products} isLoading={isLoading} />
        </div>
      )}
      
      {!hasSearched && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-center text-slate-500">
           <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
             <i className="fas fa-globe-americas text-3xl text-blue-400 mb-4"></i>
             <h4 className="font-semibold text-slate-800 mb-2">Live Search</h4>
             <p className="text-sm">Connects to Google Search to find current products and prices.</p>
           </div>
           <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
             <i className="fas fa-filter text-3xl text-purple-400 mb-4"></i>
             <h4 className="font-semibold text-slate-800 mb-2">Smart Filtering</h4>
             <p className="text-sm">Understands complex queries like "best for gaming" or "under budget".</p>
           </div>
           <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
             <i className="fas fa-tags text-3xl text-green-400 mb-4"></i>
             <h4 className="font-semibold text-slate-800 mb-2">Real Data</h4>
             <p className="text-sm">Retrieves actual product details directly from the web.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default ScoutView;