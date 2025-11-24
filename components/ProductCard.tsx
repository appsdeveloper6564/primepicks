import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col h-full group">
      <div className="relative h-64 overflow-hidden p-6 bg-white flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-slate-800 line-clamp-2 leading-tight min-h-[3rem]">
            {product.title}
            </h3>
        </div>

        <div className="flex items-center mb-3 text-yellow-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className={`fas fa-star ${i < Math.floor(parseFloat(product.rating)) ? '' : 'text-slate-300'}`}></i>
          ))}
          <span className="ml-2 text-slate-500 text-xs font-medium">{product.rating}</span>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>

        <div className="space-y-1 mb-4">
          {product.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-xs text-slate-500">
              <i className="fas fa-check text-green-500 mr-2"></i>
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">{product.price}</span>
          <a 
            href={product.affiliate_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            Buy on Amazon
            <i className="fas fa-external-link-alt ml-2 text-xs"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;