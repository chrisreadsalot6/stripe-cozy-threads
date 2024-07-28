'use client'

import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useCheckout } from '../context/CheckoutContext';
import { useShoppingCart } from '../context/ShoppingCartContext';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { options } = useCheckout();
  const { cartItems } = useShoppingCart();

  if (!options) {
    return <div>Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <p>No items in cart</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
        <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
  )
}