import React from 'react';
import { Link } from 'react-router-dom';

export function Header({ user, onLogout, cartCount }) {
  return (
    <header className="bg-white text-gray-800 shadow">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          🚴 SendIt Cycles
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/shop" className="hover:text-gray-600 transition">
            Shop
          </Link>
          
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.first_name || user.email}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-gray-600 transition font-semibold">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="hover:text-gray-600 transition">
                Orders
              </Link>
              <button
                onClick={onLogout}
                className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-600 transition">
                Login
              </Link>
              <Link to="/register" className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded transition font-semibold">
                Register
              </Link>
            </>
          )}
          
          <Link to="/cart" className="relative hover:text-gray-600 transition" aria-label="Cart">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white/30">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}