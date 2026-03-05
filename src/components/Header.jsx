import React from 'react';
import { Link } from 'react-router-dom';
export function Header({ user, onLogout, cartCount }) {
  return (
    <header className="bg-[#FF3399] text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white drop-shadow-sm">
          🚴 SendIt Cycles
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link to="/shop" className="hover:text-white/90 transition">
            Shop
          </Link>
          
          {user ? (
            <>
              <span className="text-sm text-white/90">{user.first_name || user.email}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-white/90 transition font-semibold">
                  Admin
                </Link>
              )}
              <Link to="/orders" className="hover:text-white/90 transition">
                Orders
              </Link>
              <button
                onClick={onLogout}
                className="bg-white text-[#FF3399] hover:bg-[#ffe6f2] px-4 py-2 rounded transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white/90 transition">
                Login
              </Link>
              <Link to="/register" className="bg-white text-[#FF3399] hover:bg-[#ffe6f2] px-4 py-2 rounded transition font-semibold">
                Register
              </Link>
            </>
          )}
          
          <Link to="/cart" className="relative hover:text-white/90 transition" aria-label="Cart">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#FF3399] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white/30">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}