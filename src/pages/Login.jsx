import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      onLogin(response.data.user, response.data.token);
      // Redirect admin users to admin console, others to shop
      const redirectPath = response.data.user.role === 'admin' ? '/admin' : '/shop';
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">Welcome Back</h1>
        <p className="text-slate-600 mb-6">Sign in to your account</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-fuchsia-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-fuchsia-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-400 text-white font-bold py-2 rounded transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-center text-slate-600">
          Don't have an account?{' '}
          <a href="/register" className="text-fuchsia-600 hover:text-fuchsia-700 font-semibold">
            Register here
          </a>
        </p>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-slate-50 rounded border border-slate-200 text-sm">
          <p className="font-semibold text-slate-700 mb-2">Demo Admin Account:</p>
          <p className="text-slate-600">Email: admin@senditcycles.com</p>
          <p className="text-slate-600">Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
