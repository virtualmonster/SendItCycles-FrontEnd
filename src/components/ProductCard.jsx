import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { getCategoryLogo } from '../utils/bikeLogos';

export function ProductCard({ product, category, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      onAddToCart(product.id, quantity);
      setQuantity(1);
    } finally {
      setLoading(false);
    }
  };

  // Use product image if available, fallback to category logo
  const displayImage = product.image_url || (category ? getCategoryLogo(category.name) : 'https://via.placeholder.com/300x300?text=Product');

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
      <div 
        onClick={() => navigate(`/product/${product.id}`)}
        className="cursor-pointer flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100"
      >
        <img 
          src={displayImage} 
          alt={product.name}
          className="w-full h-48 object-contain bg-slate-100 hover:opacity-90 transition p-4"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 
          onClick={() => navigate(`/product/${product.id}`)}
          className="font-bold text-lg mb-2 cursor-pointer hover:text-fuchsia-600 transition"
        >
          {product.name}
        </h3>
        <p className="text-slate-600 text-sm mb-2 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-fuchsia-600">
            ${(typeof product.price === 'string' ? parseFloat(product.price) : product.price).toFixed(2)}
          </span>
          <span className={`text-sm font-semibold ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max={product.stock_quantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 px-2 py-1 border border-slate-300 rounded"
            disabled={product.stock_quantity === 0}
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0 || loading}
            className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-400 text-white font-semibold py-2 rounded transition"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
