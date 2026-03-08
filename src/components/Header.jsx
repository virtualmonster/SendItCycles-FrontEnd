import React from 'react';
import { Link } from 'react-router-dom';

export function Header({ user, onLogout, cartCount }) {
  return (
    <header className="bg-gray-900 text-gray-100 shadow-md border-b-4 border-pink-500">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pink-400 hover:text-pink-300 transition">
          🚴 SendIt Cycles
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/shop" className="hover:text-pink-400 transition font-medium">
            Shop
          </Link>
          
          {user ? (
            <>
              <span className="text-sm text-gray-300">{user.first_name || user.email}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-pink-400 transition font-semibold">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="hover:text-pink-400 transition">
                Orders
              </Link>
              <button
                onClick={onLogout}
                className="bg-pink-600 text-white hover:bg-pink-700 px-4 py-2 rounded transition font-semibold"
                style={{ backgroundColor: '#FF3399' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-pink-400 transition">
                Login
              </Link>
              <Link to="/register" className="text-white hover:opacity-90 px-4 py-2 rounded transition font-semibold" style={{ backgroundColor: '#FF3399' }}>
                Register
              </Link>
            </>
          )}
          
          <Link to="/cart" className="relative hover:text-pink-400 transition" aria-label="Cart">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white/30" style={{ backgroundColor: '#FF3399' }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}