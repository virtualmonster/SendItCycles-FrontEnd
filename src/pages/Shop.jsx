import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../api';
import { ProductCard } from '../components/ProductCard';
import { getCategoryLogo } from '../utils/bikeLogos';

export function Shop({ onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [productsRes, categoriesRes] = await Promise.all([
          productAPI.getAllProducts(),
          productAPI.getCategories(),
        ]);
        console.log('Products fetched:', productsRes.data);
        console.log('Categories fetched:', categoriesRes.data);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);

        // Check if category is in URL params
        const categoryParam = searchParams.get('category');
        if (categoryParam && categoriesRes.data.length > 0) {
          const cat = categoriesRes.data.find((c) => c.name === categoryParam);
          if (cat) {
            setSelectedCategory(cat.id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
        setError(error.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">Shop All Bikes</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-600">
          Error: {error}
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter by Type</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchParams({});
            }}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedCategory === null
                ? 'bg-fuchsia-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSearchParams({ category: cat.name });
              }}
              className={`px-4 py-2 rounded font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-fuchsia-600 text-white'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-600">Loading bikes...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No bikes found. Products: {products.length}, Categories: {categories.length}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const category = categories.find((c) => c.id === product.category_id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                category={category}
                onAddToCart={onAddToCart}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
