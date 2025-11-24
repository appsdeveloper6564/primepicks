import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductGrid from './components/ProductGrid';
import ScoutView from './components/ScoutView';
import ExpertView from './components/ExpertView';
import DesignView from './components/DesignView';
import { DEMO_PRODUCTS } from './constants';
import { Product } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('home');
  
  // Basic client-side filtering for the home page
  const filteredProducts: Product[] = DEMO_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      <main className="flex-grow">
        {activeView === 'home' && (
          <>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
              <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Curated Tech & Lifestyle</h1>
                <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                  Discover the best products curated just for you.
                </p>
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Featured Products</h2>
                  <span className="text-sm text-slate-500">{filteredProducts.length} items</span>
                </div>
                <ProductGrid products={filteredProducts} />
            </div>
          </>
        )}
        
        {activeView === 'scout' && <ScoutView />}
        {activeView === 'expert' && <ExpertView />}
        {activeView === 'design' && <DesignView />}
      </main>

      <Footer />
    </div>
  );
}

export default App;