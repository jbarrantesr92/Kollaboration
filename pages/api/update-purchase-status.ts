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
    // Get the data from the request body
    const { purchaseId, totalAmount, donation, roundup } = req.body;

    if (!purchaseId) {
      return res.status(400).json({ message: 'PurchaseId not found in request body' });
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
        TotalPurchase: totalAmount,  // Updating total amount
        Donation: donation,        // Updating donation amount
        RoundUp: roundup           // Updating roundup
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

    return res.status(200).json({ message: 'Purchase status updated, QR code generated successfully' });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
