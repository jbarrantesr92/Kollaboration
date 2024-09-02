import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { purchaseId, qrCodeData } = req.body;

  if (!purchaseId || !qrCodeData) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    // Directus API endpoint
    const directusUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/items/TicketsQrCodes`;

    // Data to send to Directus
    const data = {
      purchase_id: purchaseId,
      qr_code: qrCodeData,  // assuming qrCodeData is the base64 or URL of the QR code image
    };

    // Call Directus API to create the new record
    const response = await fetch(directusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create QR code in Directus');
    }

    const result = await response.json();
    return res.status(200).json({ message: 'QR code created successfully', data: result });

  } catch (error: any) {
    console.error('Error creating QR code:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
