import React from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, activeView, setActiveView }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => setActiveView('home')}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl mr-3 shadow-lg shadow-blue-200">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">PrimePicks</h1>
                <p className="text-xs text-slate-500 -mt-1">Affiliate Store</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveView('home')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeView === 'home' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveView('scout')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center ${
                  activeView === 'scout' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <i className="fas fa-search-location mr-2"></i>
                Scout
              </button>
            </nav>
          </div>

          {/* Search Bar - Only visible on Home view */}
          {activeView === 'home' && (
            <div className="relative w-full md:w-96 animate-in fade-in duration-300">
              <input
                type="text"
                placeholder="Filter products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <i className="fas fa-search absolute left-3 top-3.5 text-slate-400"></i>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;