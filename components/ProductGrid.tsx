import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl h-[450px] animate-pulse p-4 border border-slate-100">
              <div className="bg-slate-200 h-48 w-full rounded-lg mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3 mb-6"></div>
              <div className="mt-auto h-10 bg-slate-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block p-6 rounded-full bg-slate-100 text-slate-400 mb-4">
            <i className="fas fa-box-open text-4xl"></i>
        </div>
        <h3 className="text-xl font-medium text-slate-700 mb-2">No products found</h3>
        <p className="text-slate-500">Try adjusting your search filters or use AI Scout to find new items.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;