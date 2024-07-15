import { useRouter } from 'next/router';
import OrderDetails from '../../components/OrderDetails';

const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <p>Loading...</p>; // Handle case when id is not available yet
  }

  return <OrderDetails orderId={id} />;
};

export default OrderDetailsPage;