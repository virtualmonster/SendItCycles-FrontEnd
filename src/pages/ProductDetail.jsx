import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../api';
import { productSpecifications } from '../utils/productData';

export function ProductDetail({ onAddToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [frameSize, setFrameSize] = useState('M');
  const [activeTab, setActiveTab] = useState('specs');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProductById(parseInt(productId));
        // Merge API data with static specifications data
        const staticProduct = productSpecifications[parseInt(productId)];
        const mergedProduct = {
          ...response.data,
          category: response.data.category_name || response.data.category,
          features: staticProduct?.features || [],
          specs: staticProduct?.specs || {},
          geometry: staticProduct?.geometry || {},
          parts: staticProduct?.parts || {},
        };
        setProduct(mergedProduct);
      } catch (error) {
        // Fallback to static product data if API fails
        const staticProduct = productSpecifications[parseInt(productId)];
        setProduct(staticProduct || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <button
            onClick={() => navigate('/shop')}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 rounded"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock_quantity <= 0) {
      return;
    }
    if (quantity > product.stock_quantity) {
      alert(`Only ${product.stock_quantity} items available in stock`);
      return;
    }
    onAddToCart(parseInt(productId), quantity, frameSize);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate('/shop')}
            className="text-white hover:text-slate-100 mb-4 text-sm font-semibold"
          >
            ← Back to Shop
          </button>
          <h1 className="text-4xl font-black mb-2">{product.name}</h1>
          <p className="text-lg text-fuchsia-100">{product.category} • ${product.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-4">
              <div className="w-full h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-lg p-4"
                    onError={(e) => {
                      // Fallback to emoji placeholder if image fails
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-fuchsia-100 to-cyan-100"><div class="text-center"><div class="text-6xl mb-4">${product.category === 'XC' ? '⚡' : product.category === 'Trail' ? '🛤️' : product.category === 'Downcountry' ? '🏔️' : product.category === 'Enduro' ? '🚵' : '🔥'}</div><p class="text-slate-600 font-semibold">${product.name}</p></div></div>`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-fuchsia-100 to-cyan-100">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {product.category === 'XC' ? '⚡' : product.category === 'Trail' ? '🛤️' : product.category === 'Downcountry' ? '🏔️' : product.category === 'Enduro' ? '🚵' : '🔥'}
                      </div>
                      <p className="text-slate-600 font-semibold">{product.name}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Frame Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setFrameSize(size)}
                        className={`py-2 rounded font-bold transition ${
                          frameSize === size
                            ? 'bg-fuchsia-600 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-slate-200 hover:bg-slate-300 px-3 py-2 rounded disabled:opacity-50"
                      disabled={product.stock_quantity === 0}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock_quantity || 1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border border-slate-300 rounded py-2 disabled:opacity-50"
                      disabled={product.stock_quantity === 0}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-slate-200 hover:bg-slate-300 px-3 py-2 rounded disabled:opacity-50"
                      disabled={product.stock_quantity === 0 || quantity >= product.stock_quantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className={`w-full font-bold py-3 rounded-lg transition ${
                    product.stock_quantity > 0
                      ? 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white'
                      : 'bg-slate-400 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>

                {product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">⚠️ Only {product.stock_quantity} left in stock</p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-3 font-semibold">Features:</p>
                  {product.features && product.features.length > 0 ? (
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex items-start">
                          <span className="text-cyan-600 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500 italic">No features available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Bike</h2>
              <p className="text-lg text-slate-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-4 px-6 text-center font-bold transition ${
                    activeTab === 'specs'
                      ? 'bg-fuchsia-50 text-fuchsia-600 border-b-2 border-fuchsia-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('geometry')}
                  className={`flex-1 py-4 px-6 text-center font-bold transition ${
                    activeTab === 'geometry'
                      ? 'bg-fuchsia-50 text-fuchsia-600 border-b-2 border-fuchsia-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Geometry
                </button>
                <button
                  onClick={() => setActiveTab('parts')}
                  className={`flex-1 py-4 px-6 text-center font-bold transition ${
                    activeTab === 'parts'
                      ? 'bg-fuchsia-50 text-fuchsia-600 border-b-2 border-fuchsia-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Components
                </button>
              </div>

              <div className="p-8">
                {/* Specifications Tab */}
                {activeTab === 'specs' && (
                  <div className="space-y-4">
                    {product.specs && Object.entries(product.specs).length > 0 ? (
                      Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center border-b border-slate-200 pb-3">
                          <span className="font-semibold text-slate-700">{key}</span>
                          <span className="text-slate-900 font-bold">{value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 italic">No specifications available</p>
                    )}
                  </div>
                )}

                {/* Geometry Tab */}
                {activeTab === 'geometry' && (
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Select Frame Size
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setFrameSize(size)}
                            className={`py-3 rounded font-bold transition ${
                              frameSize === size
                                ? 'bg-fuchsia-600 text-white'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {product.geometry && product.geometry[frameSize] ? (
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(product.geometry[frameSize]).map(([key, value]) => (
                          <div key={key} className="bg-slate-50 p-4 rounded">
                            <p className="text-sm text-slate-600 mb-1 font-semibold">{key}</p>
                            <p className="text-lg font-bold text-slate-900">{value}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">No geometry data available for this frame size</p>
                    )}
                  </div>
                )}

                {/* Parts Tab */}
                {activeTab === 'parts' && (
                  <div className="space-y-4">
                    {product.parts && Object.entries(product.parts).length > 0 ? (
                      Object.entries(product.parts).map(([component, spec]) => (
                        <div key={component} className="bg-slate-50 p-4 rounded">
                          <p className="text-sm font-semibold text-slate-600 mb-1">{component}</p>
                          <p className="text-slate-900 font-bold">{spec}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 italic">No component information available</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
