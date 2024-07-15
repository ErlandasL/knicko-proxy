import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/orders', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      // Update orders list after successful deletion
      const updatedOrders = orders.filter((order: any) => order.id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order: any) => (
          <li key={order.id}>
            {order.amount} - {order.status} - {order.coingate_order_id}{' '}
            <button
              className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              onClick={() => handleCancelOrder(order.id)}
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;