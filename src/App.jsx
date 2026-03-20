import '@/index.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { AdminConsole } from './pages/Admin';
import { useAuth } from './store/useAuth';
import { useCart } from './store/useCart';

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', fontSize: '18px', fontFamily: 'monospace' }}>
          <h1>Error in React App</h1>
          <pre>{this.state.error?.message || 'Unknown error'}</pre>
          <p>Check browser console for more details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const { user, login, logout, isAdmin, isInitializing } = useAuth();
  const { items: cartItems, addItem, removeItem, updateQuantity, clearCart } = useCart();

  const handleLogout = () => {
    logout();
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-700">
        Loading SendIt Cycles...
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header user={user} onLogout={handleLogout} cartCount={cartItems.length} />

          <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop onAddToCart={addItem} />} />
            <Route path="/product/:productId" element={<ProductDetail onAddToCart={addItem} />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/shop" /> : <Login onLogin={login} />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/shop" /> : <Register onLogin={login} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onRemoveItem={removeItem}
                  onUpdateQuantity={updateQuantity}
                  onClearCart={clearCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                user ? (
                  <Checkout cartItems={cartItems} onClearCart={clearCart} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/orders"
              element={user ? <Orders /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={isAdmin ? <AdminConsole /> : <Navigate to="/shop" />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
