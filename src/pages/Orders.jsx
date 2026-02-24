import React, { useEffect, useState } from 'react';
import { orderAPI } from '../api';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderAPI.getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-600">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Order #</p>
                  <p className="font-bold">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Date</p>
                  <p className="font-bold">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="font-bold">${(typeof order.total_price === 'string' ? parseFloat(order.total_price) : order.total_price).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <p className="font-bold text-fuchsia-600 capitalize">{order.status}</p>
                </div>
              </div>

              {order.items && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Items:</p>
                  <ul className="space-y-1 text-sm">
                    {order.items.map((item, idx) => (
                      item && (
                        <li key={idx} className="text-slate-600">
                          {item.name} 
                          {item.frameSize && <span className="font-semibold"> (Size {item.frameSize})</span>}
                          {' '}× {item.quantity} @ ${(typeof item.price === 'string' ? parseFloat(item.price) : item.price).toFixed(2)}
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
