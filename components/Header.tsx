import React from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl mr-3 shadow-lg shadow-blue-200">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">PrimePicks</h1>
              <p className="text-xs text-slate-500 -mt-1">Affiliate Store</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <i className="fas fa-search absolute left-3 top-3.5 text-slate-400"></i>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;