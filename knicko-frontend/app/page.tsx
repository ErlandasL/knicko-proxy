'use client';

import React, { useState, useEffect, useCallback } from 'react';
import WithAuth from '../components/WithAuth';
import OrderForm from '../components/OrderForm';
import OrderDetails from '../components/OrderDetails';

interface Order {
  id: string;
  price_amount: number;
  status: string;
}

const Home: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleNewOrder = async (newOrder: Order) => {
    fetchOrders();
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <OrderForm onNewOrder={handleNewOrder} />

      {selectedOrderId && (
        <div className="mt-8 w-full max-w-2xl">
          <OrderDetails orderId={selectedOrderId} />
        </div>
      )}

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-4">Orders</h2>
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li
              key={index}
              className={`p-4 border rounded-lg shadow-lg cursor-pointer transition duration-200 hover:bg-gray-100 ${
                selectedOrderId === order.id ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => handleSelectOrder(order.id)}
            >
              <p className="text-lg font-semibold">Amount: ${order.price_amount}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <p className="text-gray-400 text-sm">Order id: {order.id}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default WithAuth(Home);