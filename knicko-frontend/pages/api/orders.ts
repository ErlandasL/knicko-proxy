import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const COINGATE_API_URL = 'http://localhost:3001/orders';

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(COINGATE_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
      }
      break;
    case 'POST':
      try {
        const orderResponse = await fetch(COINGATE_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        const orderData = await orderResponse.json();
        res.status(201).json(orderData);
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;