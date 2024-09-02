import { createDirectus, rest } from '@directus/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

interface TicketPurchase {
  TicketId: string;
  TicketQuantity: number;
  TicketPrice: number;
}

interface RequestBody {
  ticketPurchasesArray: TicketPurchase[];
  purchaseId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Initializing Directus client');
    const directus = createDirectus('https://events-db-directus.6sizjj.easypanel.host').with(rest());
    console.log('Directus client initialized');

    if (req.method === 'POST') {
      console.log('POST request received:', req.body);
      const { ticketPurchasesArray, purchaseId } = req.body as RequestBody;

      // Validation of request data
      if (!purchaseId || !Array.isArray(ticketPurchasesArray)) {
        throw new Error("Invalid request data. 'purchaseId' or 'ticketPurchasesArray' is missing or incorrect.");
      }

      await Promise.all(ticketPurchasesArray.map(async (ticket) => {
        const { TicketId, TicketQuantity, TicketPrice } = ticket;
        console.log(`Processing ticket purchase: TicketId=${TicketId}, TicketQuantity=${TicketQuantity}, PurchaseId=${purchaseId}`);

        const PurchaseTicketId = `${purchaseId}-${TicketId}`;
        const apiUrl = `https://events-db-directus.6sizjj.easypanel.host/items/TicketPurchases`;

        try {
          // Attempt to create the new ticket purchase
          const createResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
            },
            body: JSON.stringify({
              TicketId,
              PurchaseId: purchaseId,
              TicketQuantity,
              PurchaseTicketId,
              TicketPrice  // Include TicketPrice in creation
            }),
          });

          const createResult = await createResponse.json();
          if (!createResponse.ok) {
            // Check if the error is related to uniqueness constraint violation
            if (createResult.errors && createResult.errors[0].message.includes('unique')) {
              console.warn(`Uniqueness constraint violation for PurchaseTicketId=${PurchaseTicketId}. Attempting to update existing record.`);
              
              // Attempt to fetch the existing record ID
              const fetchResponse = await fetch(`${apiUrl}?filter[TicketId][_eq]=${TicketId}&filter[PurchaseId][_eq]=${purchaseId}`, {
                headers: {
                  Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
                },
              });
              
              const fetchResult = await fetchResponse.json();
              if (fetchResult.data && fetchResult.data.length > 0) {
                const existingItemId = fetchResult.data[0].id;

                // Update the existing record
                const updateResponse = await fetch(`${apiUrl}/${existingItemId}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
                  },
                  body: JSON.stringify({
                    TicketQuantity,
                    PurchaseTicketId,
                    TicketPrice  // Include TicketPrice in update
                  }),
                });

                const updateResult = await updateResponse.json();
                if (!updateResponse.ok) {
                  console.error(`Error updating ticket purchase with id=${existingItemId}:`, updateResult);
                } else {
                  console.log('Updated ticket purchase:', updateResult);
                }
              } else {
                console.error('Error: Could not find the existing record after uniqueness violation.');
              }
            } else {
              console.error('Error creating new ticket purchase:', createResult);
            }
          } else {
            console.log('Created ticket purchase:', createResult);
          }
        } catch (error) {
          console.error(`Error processing ticket purchase for TicketId=${TicketId} and PurchaseId=${purchaseId}:`, error);
        }
      }));

      res.status(200).json({ message: 'Ticket Purchases processed successfully' });
    } else {
      console.log('Invalid request method:', req.method);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Error in processing Ticket Purchases:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to process Ticket Purchases', details: error.message });
  }
}
