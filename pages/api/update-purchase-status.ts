import type { NextApiRequest, NextApiResponse } from 'next';

interface ErrorResponse {
  message: string;
}

interface SuccessResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the PurchaseId from the request body
    const purchaseId = req.body.purchaseId as string;

    if (!purchaseId) {
      return res.status(400).json({ message: 'PurchaseId not found in local storage' });
    }

    // Call Directus API to update the purchase status
    const directusResponse = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_API_URL}/items/Purchases/${purchaseId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      body: JSON.stringify({
        Status: 'purchase_complete',
      }),
    });

    if (!directusResponse.ok) {
      const errorData = await directusResponse.json();
      return res.status(directusResponse.status).json({ message: errorData.errors || 'Failed to update purchase status' });
    }

    // Call the external API to generate a QR code
    const qrCodeResponse = await fetch(`http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(purchaseId)}&size=300x300&format=png&charset-source=UTF-8`);

    if (!qrCodeResponse.ok) {
      return res.status(qrCodeResponse.status).json({ message: 'Failed to generate QR code' });
    }

    // Optionally, you can handle the QR code image returned from the API
    // Note: In Node.js, blobs are not typically used. You might want to use buffers instead.
    // const qrCodeBlob = await qrCodeResponse.blob(); // For client-side use

    return res.status(200).json({ message: 'Purchase status updated, QR code generated successfully' });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
