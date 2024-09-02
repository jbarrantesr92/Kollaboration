import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20', // Specify the API version you're using
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { amount }: { amount: number } = req.body;

      if (!amount) {
        return res.status(400).json({ error: 'Missing required amount parameter' });
      }

      // Convert amount from dollars to cents
      const amountInCents = Math.round(amount * 100);

      // Ensure amount is above the minimum Stripe requirement
      if (amountInCents < 50) { // Example for USD
        return res.status(400).json({ error: 'Amount is too low to be processed.' });
      }

      // Create a PaymentIntent with the specified amount
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' },
      });

      // Send the client secret back to the client
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err: any) {
      console.error('Error creating PaymentIntent:', err);  // Log the full error to the console
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
