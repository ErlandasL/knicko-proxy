import { useState } from 'react';

interface OrderFormProps {
  onNewOrder: (order: any) => void;
}

export default function OrderForm({ onNewOrder }: OrderFormProps) {
  const [priceAmount, setPriceAmount] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in first.');
        return;
      }

      const response = await fetch('api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          order: {
            price_amount: parseFloat(priceAmount),
            price_currency: 'USD',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newOrder = await response.json();
      onNewOrder(newOrder);
      setPriceAmount(''); // Reset the input field
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="number"
        placeholder="Amount USD"
        value={priceAmount}
        onChange={(e) => setPriceAmount(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
        Create Order
      </button>
    </form>
  );
}