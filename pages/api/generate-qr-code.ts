// pages/api/generate-qr-code.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { purchaseId, paymentIntentId } = req.body as { purchaseId: string; paymentIntentId: string };

    try {
        // Generate QR code
        const qrCodeUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(paymentIntentId)}&size=300x300&format=png&charset-source=UTF-8`;
        const qrCodeResponse = await fetch(qrCodeUrl);

        if (!qrCodeResponse.ok) {
            throw new Error('Failed to fetch QR code');
        }

        const qrCodeBuffer = await qrCodeResponse.arrayBuffer();
        const qrCodeBlob = new Blob([qrCodeBuffer], { type: 'image/png' });

        // Upload QR code to Directus
        const formData = new FormData();
        formData.append('file', qrCodeBlob, `${purchaseId}.png`);

        const directusUploadResponse = await fetch(`https://events-db-directus.6sizjj.easypanel.host/files`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
            },
            body: formData,
        });

        if (!directusUploadResponse.ok) {
            throw new Error('Failed to upload QR code to Directus');
        }

        const fileData = await directusUploadResponse.json();

        // Return success response
        res.status(200).json({ fileId: fileData.data.id });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
