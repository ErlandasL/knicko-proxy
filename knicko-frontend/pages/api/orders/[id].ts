import { NextApiRequest, NextApiResponse } from 'next';

const COINGATE_API_URL = 'http://localhost:3001/orders';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const { id } = query;

  if (!id) {
    return res.status(400).json({ error: 'id parameter is required' });
  }

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(`${COINGATE_API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch order ${id}`);
        }
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        console.error(`Error fetching order ${id}:`, error);
        res.status(500).json({ error: `Failed to fetch order ${id}` });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default handler;