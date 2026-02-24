import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../api';

export function Cart({ cartItems, onRemoveItem, onUpdateQuantity, onClearCart }) {
  const navigate = useNavigate();
  const [loadedProducts, setLoadedProducts] = useState({});

  useEffect(() => {
    const loadProductData = async () => {
      const itemsNeedingData = cartItems.filter(
        (item) => !loadedProducts[item.product_id]
      );

      if (itemsNeedingData.length === 0) return;

      const newProducts = {};
      for (const item of itemsNeedingData) {
        try {
          const response = await productAPI.getProductById(item.product_id);
          newProducts[item.product_id] = response.data;
        } catch (error) {
          console.error('Failed to fetch product', error);
        }
      }

      setLoadedProducts((prev) => ({ ...prev, ...newProducts }));
    };

    if (cartItems.length > 0) {
      loadProductData();
    }
  }, [cartItems, loadedProducts]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const prod = loadedProducts[item.product_id];
      if (!prod) return sum;
      const price =
        typeof prod.price === 'string' ? parseFloat(prod.price) : prod.price || 0;
      return sum + price * item.quantity;
    }, 0);
  };

  const total = calculateTotal();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-slate-600 mb-6">Your cart is empty</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const product = loadedProducts[item.product_id];
              if (!product) {
                return (
                  <div
                    key={item.product_id}
                    className="bg-white p-4 rounded-lg shadow"
                  >
                    <p className="text-slate-500">Loading...</p>
                  </div>
                );
              }

              const displayPrice =
                typeof product.price === 'string'
                  ? parseFloat(product.price)
                  : product.price;
              const itemTotal = displayPrice * item.quantity;
              const stockWarning = item.quantity > product.stock_quantity;

              const cartKey = `${item.product_id}_${item.frameSize}`;
              
              return (
                <div
                  key={cartKey}
                  className={`bg-white p-4 rounded-lg shadow flex gap-4 ${stockWarning ? 'border-2 border-red-300' : ''}`}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded bg-slate-100"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">
                      Size: <span className="font-semibold text-slate-900">{item.frameSize}</span>
                    </p>
                    {stockWarning && (
                      <p className="text-red-600 text-sm font-semibold mb-2">
                        ⚠️ Only {product.stock_quantity} in stock, you have {item.quantity}
                      </p>
                    )}
                    <p className="text-fuchsia-600 font-semibold">
                      ${displayPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max={product.stock_quantity}
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQuantity(
                          item.product_id,
                          Math.min(parseInt(e.target.value) || 1, product.stock_quantity),
                          item.frameSize
                        )
                      }
                      className="w-16 px-2 py-1 border border-slate-300 rounded"
                    />
                    <button
                      onClick={() => onRemoveItem(item.product_id, item.frameSize)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${itemTotal.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 pb-4 border-b">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>${(total * 1.1).toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
