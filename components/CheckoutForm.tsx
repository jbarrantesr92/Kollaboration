import { useState, useEffect, FormEvent } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

interface CheckoutFormProps {
  totalAmount: number;
  totalFee: number;
  donation: number;
  roundup: boolean;
}

export default function CheckoutForm({ totalAmount, totalFee, donation, roundup }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: totalAmount }),
        });

        const data = await response.json();
        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          setError('Failed to prepare payment. Please refresh the page and try again.');
        }
      } catch (err) {
        setError('An error occurred while preparing payment.');
      }
    };

    fetchClientSecret();
  }, [totalAmount, donation, roundup]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (clientSecret && stripe && elements) {
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) throw new Error('CardNumberElement not found');

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
          },
        });

        if (error) {
          setError(error.message || 'An unknown error occurred');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          alert('Payment was successful!');

          const purchaseId = localStorage.getItem('PurchaseId');
          if (purchaseId) {
            const qrCodeResponse = await fetch(`/api/generate-qr-code`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                purchaseId,
                paymentIntentId: paymentIntent.id,
              }),
            });

            if (!qrCodeResponse.ok) {
              throw new Error('Failed to generate and upload QR code');
            }

            // Send totalFee to update-purchase-status API along with other data
            const updateResponse = await fetch(`/api/update-purchase-status`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                purchaseId,
                status: 'purchase_complete',
                totalAmount: totalAmount,
                donation: donation,
                roundup: roundup,
                totalFee: totalFee,  // Include the total fee in the API request
              }),
            });

            if (!updateResponse.ok) {
              throw new Error('Failed to update purchase status');
            }

            localStorage.removeItem('PurchaseId');
            router.push('/payment-successful');
          } else {
            throw new Error('Purchase ID not found in local storage');
          }
        } else {
          setError('Payment failed for an unknown reason. Please try again.');
        }
      }
    } catch (err: any) {
      setError(`An error occurred while processing your payment: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', backgroundColor: 'white', borderRadius: '15px' }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#32325d',
          }}
        >
          Complete Your Payment (${totalAmount.toFixed(2)})
        </h2>

        <div style={{ marginBottom: '24px' }}>
          <label
            htmlFor="card-number-element"
            style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7c93' }}
          >
            Card Number
          </label>
          <div
            style={{
              marginTop: '8px',
              padding: '16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: '#edf2f7',
            }}
          >
            <CardNumberElement id="card-number-element" />
          </div>
        </div>

        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexBasis: '48%' }}>
            <label
              htmlFor="card-expiry-element"
              style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7c93' }}
            >
              Expiration Date
            </label>
            <div
              style={{
                marginTop: '8px',
                padding: '16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: '#edf2f7',
              }}
            >
              <CardExpiryElement id="card-expiry-element" />
            </div>
          </div>

          <div style={{ flexBasis: '48%' }}>
            <label
              htmlFor="card-cvc-element"
              style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7c93' }}
            >
              CVC
            </label>
            <div
              style={{
                marginTop: '8px',
                padding: '16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: '#edf2f7',
              }}
            >
              <CardCvcElement id="card-cvc-element" />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label
            htmlFor="postal-code-element"
            style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#6b7c93' }}
          >
            ZIP Code
          </label>
          <input
            id="postal-code-element"
            type="text"
            style={{
              width: '100%',
              padding: '16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              backgroundColor: '#edf2f7',
              color: '#32325d',
              fontSize: '16px',
            }}
            placeholder="12345"
            required
          />
        </div>

        {error && (
          <div style={{ color: '#fa755a', fontSize: '14px', marginTop: '8px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '24px',
            background: 'linear-gradient(to right, #1c91f2, #1c91f2)',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.2s ease-in-out',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}
