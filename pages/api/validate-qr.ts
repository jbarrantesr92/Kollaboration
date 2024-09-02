import { createDirectus, rest, readItem, updateItem } from '@directus/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string).with(rest());

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uuid } = req.query;

  if (!uuid || typeof uuid !== 'string') {
    return res.status(400).json({ error: 'UUID is required and must be a string' });
  }

  try {
    // Fetch the record from the Directus collection
    const record = await directus.request(readItem('TicketsQrCodes', uuid));

    if (!record) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    // Check if the QR code has been validated
    if (record.Status === 'validated') {
      return res.status(200).json({ message: 'QR code has already been validated.' });
    } else {
      // Update the status to 'validated'
      await directus.request(updateItem('TicketsQrCodes', uuid, { Status: 'validated' }));
      return res.status(200).json({ message: 'QR code successfully validated.' });
    }
  } catch (error) {
    console.error('Error validating QR code:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
