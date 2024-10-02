import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutPageProps {
  ticketPurchasesArray: { TicketQuantity: number; TicketPrice: number; TicketFee: number }[];
  donation: number;
  roundUp?: boolean;
}

// Function to calculate subtotal
const calculateSubtotal = (
  tickets: { TicketQuantity: number; TicketPrice: number }[]
) => {
  return tickets.reduce(
    (acc, ticket) => acc + ticket.TicketQuantity * ticket.TicketPrice, 
    0
  );
};

// Function to calculate fees using subtotal
const calculateTransactionFee = (
  tickets: { TicketQuantity: number; TicketPrice: number; TicketFee: number }[],
  subtotal: number
) => {
  const fixedFee = 0.3;
  const processingFee = subtotal * 0.029;

  // Calculate ticket-specific fees
  const ticketFees = tickets.reduce(
    (acc, ticket) => acc + ticket.TicketQuantity * ticket.TicketPrice * (ticket.TicketFee / 100),
    0
  );

  // Total transaction fee
  return fixedFee + processingFee + ticketFees;
};

// Function to calculate the total amount, including donation and rounding up
const calculateTotalAmount = (
  tickets: { TicketQuantity: number; TicketPrice: number; TicketFee: number }[],
  donationAmount: number,
  shouldRoundUp: boolean
) => {
  const subtotal = calculateSubtotal(tickets);
  const fees = calculateTransactionFee(tickets, subtotal);
  let amount = subtotal + fees + donationAmount;

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
  const [totalFee, setTotalFee] = useState<number>(() =>
    calculateTransactionFee(ticketPurchasesArray, calculateSubtotal(ticketPurchasesArray))
  );

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(ticketPurchasesArray, donation, roundUp));
    setTotalFee(calculateTransactionFee(ticketPurchasesArray, calculateSubtotal(ticketPurchasesArray)));
  }, [ticketPurchasesArray, donation, roundUp]);

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto px-4 py-8 w-full">
        {/* Pass totalAmount, totalFee, donation, and roundUp to CheckoutForm */}
        <CheckoutForm 
          totalAmount={totalAmount} 
          totalFee={totalFee} 
          donation={donation} 
          roundup={roundUp} 
        />
      </div>
    </Elements>
  );
}
