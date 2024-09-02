import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutPageProps {
  ticketPurchasesArray: { TicketQuantity: number; TicketPrice: number }[];
  donation: number;
  roundUp?: boolean;
}

const calculateTotalAmount = (
  tickets: { TicketQuantity: number; TicketPrice: number }[],
  donationAmount: number,
  shouldRoundUp: boolean
) => {
  let amount = tickets.reduce((acc, ticket) => acc + ticket.TicketQuantity * ticket.TicketPrice, 0) + donationAmount;
  return shouldRoundUp ? Math.ceil(amount) : amount;
};

export default function CheckoutPage({
  ticketPurchasesArray,
  donation,
  roundUp = false,
}: CheckoutPageProps) {
  const [totalAmount, setTotalAmount] = useState<number>(() =>
    calculateTotalAmount(ticketPurchasesArray, donation, roundUp)
  );

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(ticketPurchasesArray, donation, roundUp));
  }, [ticketPurchasesArray, donation, roundUp]);

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto px-4 py-8 w-full">
        <CheckoutForm totalAmount={totalAmount} />
      </div>
    </Elements>
  );
}
