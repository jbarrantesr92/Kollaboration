import { NextApiRequest, NextApiResponse } from 'next';
import { createDirectus, rest, createItem } from '@directus/sdk';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Initialize the Directus client
    const directus = createDirectus('https://events-db-directus.6sizjj.easypanel.host').with(rest());

    console.log('Directus client initialized for purchase creation');

    if (req.method === 'POST') {
      console.log('POST request to create purchase');

      // Create a new purchase with status 'on_hold'
      const purchase = await directus.request(createItem('Purchases', {
        Status: 'on_hold',
      }));

      console.log('Purchase created with id:', purchase.id);
      res.status(200).json({ purchaseId: purchase.id });
    } else {
      console.log('Invalid request method:', req.method);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Error in creating Purchase:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to create purchase', details: error.message });
  }
}
