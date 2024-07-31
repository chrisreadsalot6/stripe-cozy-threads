'use client';

import {loadStripe} from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
import {useCheckout} from '../_context/CheckoutContext';
import {useShoppingCart} from '../_context/ShoppingCartContext';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
    const {options} = useCheckout();
    const {cartItems} = useShoppingCart();

    // Show loading animation
    if (!options) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4'></div>
                    <h2 className='text-2xl font-semibold text-gray-900'>Loading checkout...</h2>
                    <p className='mt-2 text-gray-600'>Please wait while we prepare your order.</p>
                </div>
            </div>
        );
    }

    // Show empty cart message
    if (cartItems.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold text-gray-900 mb-4'>Your cart is empty</h2>
                    <p className='text-xl text-gray-600 mb-8'>Add some items to your cart and come back to checkout.</p>
                    <button
                        onClick={() => (window.location.href = '/')}
                        className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105'>
                        Return to Store
                    </button>
                </div>
            </div>
        );
    }

    // Show checkout page if cart not empty
    return (
        <div id='checkout' className='container mx-auto px-4 py-8 flex flex-col min-h-screen'>
            <div className='flex-grow w-full mx-auto'>
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout className='h-full w-full' />
                </EmbeddedCheckoutProvider>
            </div>
        </div>
    );
}
