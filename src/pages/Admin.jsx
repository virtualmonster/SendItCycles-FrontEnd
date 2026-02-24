import React, { useEffect, useState } from 'react';
import { adminAPI, productAPI } from '../api';
import { ImagePicker } from '../components/ImagePicker';

export function AdminConsole() {
  const [activeTab, setActiveTab] = useState('orders');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '',
    image_url: '',
    has_sizes: true,
    available_sizes: 'S,M,L,XL',
    features: '',
    specs: '',
    geometry: '',
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          productAPI.getAllProducts(),
          adminAPI.getCategories(),
          adminAPI.getAllOrders(),
        ]);
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Order Management
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await adminAPI.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((o) => (o.id === orderId ? response.data : o)));
      alert('Order status updated!');
    } catch (error) {
      alert('Failed to update order: ' + error.response?.data?.error);
    }
  };

  // Product Management
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.createProduct({
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock_quantity: parseInt(newProduct.stock_quantity),
        category_id: parseInt(newProduct.category_id),
        specs: newProduct.specs ? JSON.parse(newProduct.specs) : {},
        geometry: newProduct.geometry ? JSON.parse(newProduct.geometry) : {},
      });
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: '',
        image_url: '',
        has_sizes: true,
        available_sizes: 'S,M,L,XL',
        features: '',
        specs: '',
        geometry: '',
      });
      alert('Product added successfully!');
    } catch (error) {
      alert('Failed to add product: ' + error.response?.data?.error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await adminAPI.updateProduct(editingProduct.id, {
        name: editingProduct.name,
        description: editingProduct.description,
        price: parseFloat(editingProduct.price),
        stock_quantity: parseInt(editingProduct.stock_quantity),
        category_id: parseInt(editingProduct.category_id),
        image_url: editingProduct.image_url,
        has_sizes: editingProduct.has_sizes,
        available_sizes: editingProduct.available_sizes,
        features: editingProduct.features,
        specs: editingProduct.specs ? (typeof editingProduct.specs === 'string' ? JSON.parse(editingProduct.specs) : editingProduct.specs) : {},
        geometry: editingProduct.geometry ? (typeof editingProduct.geometry === 'string' ? JSON.parse(editingProduct.geometry) : editingProduct.geometry) : {},
      });
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? response.data : p))
      );
      setEditingProduct(null);
      alert('Product updated successfully!');
    } catch (error) {
      alert('Failed to update product: ' + error.response?.data?.error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminAPI.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      alert('Product deleted');
    } catch (error) {
      alert('Failed to delete: ' + error.response?.data?.error);
    }
  };

  // Category Management
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.createCategory(newCategory);
      setCategories([...categories, response.data]);
      setNewCategory({ name: '', description: '' });
      alert('Category added successfully!');
    } catch (error) {
      alert('Failed to add category: ' + error.response?.data?.error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      const response = await adminAPI.updateCategory(editingCategory.id, editingCategory);
      setCategories(
        categories.map((c) => (c.id === editingCategory.id ? response.data : c))
      );
      setEditingCategory(null);
      alert('Category updated successfully!');
    } catch (error) {
      alert('Failed to update category: ' + error.response?.data?.error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await adminAPI.deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
      alert('Category deleted');
    } catch (error) {
      alert('Failed to delete: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Admin Console</h1>
          <a
            href="http://localhost:5000/api-docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            📚 API Documentation
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-300">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-semibold transition border-b-2 ${
              activeTab === 'orders'
                ? 'text-fuchsia-600 border-fuchsia-600'
                : 'text-slate-600 border-transparent'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-semibold transition border-b-2 ${
              activeTab === 'products'
                ? 'text-fuchsia-600 border-fuchsia-600'
                : 'text-slate-600 border-transparent'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 font-semibold transition border-b-2 ${
              activeTab === 'categories'
                ? 'text-fuchsia-600 border-fuchsia-600'
                : 'text-slate-600 border-transparent'
            }`}
          >
            Categories
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : activeTab === 'orders' ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Customer Orders</h2>
            {orders.length === 0 ? (
              <p className="text-slate-600">No orders yet</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Order ID</p>
                      <p className="font-bold">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Customer</p>
                      <p className="font-bold">
                        {order.first_name} {order.last_name}
                      </p>
                      <p className="text-sm text-slate-600">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Total</p>
                      <p className="font-bold text-lg">${(typeof order.total_price === 'string' ? parseFloat(order.total_price) : order.total_price).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Date</p>
                      <p className="font-bold">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-slate-50 rounded">
                    <p className="font-semibold mb-2">Items:</p>
                    {order.items &&
                      order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-slate-600">
                          • {item.name} × {item.quantity}
                        </p>
                      ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span
                        className={`px-4 py-2 rounded font-semibold text-white ${
                          order.status === 'pending'
                            ? 'bg-yellow-600'
                            : order.status === 'shipped'
                            ? 'bg-green-600'
                            : 'bg-slate-600'
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'pending')}
                        disabled={order.status === 'pending'}
                        className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-400 text-white px-4 py-2 rounded"
                      >
                        Mark Pending
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                        disabled={order.status === 'shipped'}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white px-4 py-2 rounded"
                      >
                        Mark Shipped
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : activeTab === 'products' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Product Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form
                onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              >
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({ ...editingProduct, name: e.target.value })
                        : setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    required
                  />

                  <select
                    value={
                      editingProduct ? editingProduct.category_id : newProduct.category_id
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({ ...editingProduct, category_id: e.target.value })
                        : setNewProduct({ ...newProduct, category_id: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <textarea
                    placeholder="Description"
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({ ...editingProduct, description: e.target.value })
                        : setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />

                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({ ...editingProduct, price: e.target.value })
                        : setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    required
                  />

                  <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={
                      editingProduct
                        ? editingProduct.stock_quantity
                        : newProduct.stock_quantity
                    }
                    onChange={(e) =>
                      editingProduct
                        ? setEditingProduct({
                            ...editingProduct,
                            stock_quantity: e.target.value,
                          })
                        : setNewProduct({ ...newProduct, stock_quantity: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    required
                  />

                  <ImagePicker
                    category={
                      editingProduct
                        ? (categories.find(c => c.id === parseInt(editingProduct.category_id))?.name || 'General')
                        : (categories.find(c => c.id === parseInt(newProduct.category_id))?.name || 'General')
                    }
                    currentImage={editingProduct ? editingProduct.image_url : newProduct.image_url}
                    onSelect={(url) =>
                      editingProduct
                        ? setEditingProduct({ ...editingProduct, image_url: url })
                        : setNewProduct({ ...newProduct, image_url: url })
                    }
                  />

                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-bold mb-3 text-sm">Product Details</h3>

                    <label className="flex items-center gap-2 mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProduct ? editingProduct.has_sizes : newProduct.has_sizes}
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({ ...editingProduct, has_sizes: e.target.checked })
                            : setNewProduct({ ...newProduct, has_sizes: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">This product has frame sizes</span>
                    </label>

                    {(editingProduct ? editingProduct.has_sizes : newProduct.has_sizes) && (
                      <input
                        type="text"
                        placeholder="Available sizes (e.g. S,M,L,XL)"
                        value={editingProduct ? editingProduct.available_sizes : newProduct.available_sizes}
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({ ...editingProduct, available_sizes: e.target.value })
                            : setNewProduct({ ...newProduct, available_sizes: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded mb-3 text-sm"
                      />
                    )}

                    <textarea
                      placeholder="Features (comma separated, e.g. Lightweight frame, Full suspension, Hydraulic brakes)"
                      value={editingProduct ? editingProduct.features : newProduct.features}
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({ ...editingProduct, features: e.target.value })
                          : setNewProduct({ ...newProduct, features: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm mb-3"
                      rows="3"
                    />

                    <label className="text-xs font-bold text-slate-600 block mb-1">Tech Specs (JSON)</label>
                    <textarea
                      placeholder={`{"Wheel Size": "29\\"", "Weight": "13.5 lbs", "Travel": "140mm"}`}
                      value={editingProduct ? editingProduct.specs : newProduct.specs}
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({ ...editingProduct, specs: e.target.value })
                          : setNewProduct({ ...newProduct, specs: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm mb-3 font-mono"
                      rows="3"
                    />

                    <label className="text-xs font-bold text-slate-600 block mb-1">Geometry by Size (JSON)</label>
                    <textarea
                      placeholder={`{"S": {"Reach": "405mm"}, "M": {"Reach": "430mm"}}`}
                      value={editingProduct ? editingProduct.geometry : newProduct.geometry}
                      onChange={(e) =>
                        editingProduct
                          ? setEditingProduct({ ...editingProduct, geometry: e.target.value })
                          : setNewProduct({ ...newProduct, geometry: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm mb-3 font-mono"
                      rows="3"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 rounded"
                    >
                      {editingProduct ? 'Update' : 'Add'} Product
                    </button>
                    {editingProduct && (
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 rounded"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Products List */}
            <div className="lg:col-span-2 space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow flex gap-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded bg-slate-100"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-slate-600">
                      {product.category_name} • Stock: {product.stock_quantity}
                    </p>
                    <p className="text-fuchsia-600 font-semibold">
                      ${(typeof product.price === 'string' ? parseFloat(product.price) : product.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Category Form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <form
                onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
              >
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={editingCategory ? editingCategory.name : newCategory.name}
                    onChange={(e) =>
                      editingCategory
                        ? setEditingCategory({ ...editingCategory, name: e.target.value })
                        : setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    required
                  />

                  <textarea
                    placeholder="Description"
                    value={
                      editingCategory ? editingCategory.description : newCategory.description
                    }
                    onChange={(e) =>
                      editingCategory
                        ? setEditingCategory({ ...editingCategory, description: e.target.value })
                        : setNewCategory({ ...newCategory, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 rounded"
                    >
                      {editingCategory ? 'Update' : 'Add'} Category
                    </button>
                    {editingCategory && (
                      <button
                        type="button"
                        onClick={() => setEditingCategory(null)}
                        className="flex-1 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 rounded"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Categories List */}
            <div className="lg:col-span-2 space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-slate-600">{category.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
