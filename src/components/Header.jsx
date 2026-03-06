import React from 'react';
import { Link } from 'react-router-dom';
export function Header({ user, onLogout, cartCount }) {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-fuchsia-500">
          🚴 SendIt Cycles
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/shop" className="hover:text-fuchsia-400 transition">
            Shop
          </Link>
          
          {user ? (
            <>
              <span className="text-sm text-slate-300">{user.first_name || user.email}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-fuchsia-400 transition font-semibold">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="hover:text-fuchsia-400 transition">
                Orders
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-fuchsia-400 transition">
                Login
              </Link>
              <Link to="/register" className="bg-fuchsia-600 hover:bg-fuchsia-700 px-4 py-2 rounded transition">
                Register
              </Link>
            </>
          )}
          
          <Link to="/cart" className="relative hover:text-fuchsia-400 transition">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}