
import { useEffect, useState } from 'react';

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <p className="text-lg font-medium">Amount: ${orderDetails.price_amount}</p>
      <p className="text-gray-600">Status: {orderDetails.status}</p>
      <p className="text-gray-600">
        Payment URL:{' '}
        <a href={orderDetails.payment_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Pay Now
        </a>
      </p>
    </div>
  );
};

export default OrderDetails;