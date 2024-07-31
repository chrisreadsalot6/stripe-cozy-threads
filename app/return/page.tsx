'use client';

import React, {useEffect, useState, Suspense} from 'react';
import {redirect, useSearchParams} from 'next/navigation';
import {useShoppingCart} from '../_context/ShoppingCartContext';
import {CheckCircleIcon} from '@heroicons/react/24/solid';

interface LineItem {
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    price: {
        unit_amount: number;
        [key: string]: any;
    };
    quantity: number;
    [key: string]: any;
}

function ReturnContent() {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [shippingOption, setShippingOption] = useState('');
    const [amountTotal, setAmountTotal] = useState(0);
    const [currency, setCurrency] = useState('');
    const [lineItems, setLineItems] = useState<{data: LineItem[]}>({
        data: [],
    });
    const [cartCleared, setCartCleared] = useState(false);
    const {cartItems, removeFromCart} = useShoppingCart();
    const searchParams = useSearchParams();

    // State management for order details and cart interaction
    useEffect(() => {
        const session_id = searchParams.get('session_id');
        if (!session_id) return;

        fetch(`/api/checkout_sessions?session_id=${session_id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
                setShippingOption(data.shipping_rate);
                setAmountTotal(data.amount_total);
                setCurrency(data.currency);
                setLineItems(data.line_items);
            });
    }, [searchParams]);

    // Clear cart after successful purchase
    useEffect(() => {
        if (status === 'complete' && !cartCleared) {
            cartItems.forEach(item => {
                removeFromCart(item.id, item.color, item.size);
            });
            setCartCleared(true);
        }
    }, [status, cartItems, removeFromCart, cartCleared]);

    // Redirect to home if the session failed
    if (status === 'open') {
        return redirect('/');
    }

    // Fetch and set order details from Stripe session
    if (status === 'complete') {
        // Render order confirmation and summary
        return (
            <div className='flex-grow'>
                <div className='max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
                    <div className='bg-white shadow-xl rounded-lg overflow-hidden sm:rounded-lg border border-gray-200 p-8'>
                        <div className='px-4 py-5 sm:p-6'>
                            {/* Thank you message */}
                            <div className='flex items-center justify-center mb-6'>
                                <CheckCircleIcon className='h-12 w-12 text-green-500 mr-3' />
                                <h2 className='text-3xl font-extrabold text-gray-900'>Thank you for your purchase!</h2>
                            </div>

                            {/* Confirmation email notice */}
                            <p className='mt-1 text-sm text-gray-600 text-center mb-8'>
                                We have received your order for {customerEmail}.
                            </p>

                            {/* Order details */}
                            <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
                                <dl className='sm:divide-y sm:divide-gray-200'>
                                    {/* Shipping option */}
                                    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                        <dt className='text-sm font-medium text-gray-500'>Shipping Option</dt>
                                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                            {shippingOption}
                                        </dd>
                                    </div>
                                    {/* Order summary */}
                                    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                        <dt className='text-sm font-medium text-gray-500'>Order Summary</dt>
                                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                            <ul className='border border-gray-200 rounded-md divide-y divide-gray-200'>
                                                {/* List of purchased items */}
                                                {lineItems?.data.map(item => (
                                                    <li
                                                        key={item.id}
                                                        className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
                                                        <div className='w-0 flex-1 flex items-center'>
                                                            <span className='ml-2 flex-1 w-0 truncate'>
                                                                {item.description}
                                                            </span>
                                                        </div>
                                                        <div className='ml-4 flex-shrink-0'>
                                                            <span className='font-medium'>
                                                                {item.quantity} x{' '}
                                                                {(item.price.unit_amount / 100).toFixed(2)}{' '}
                                                                {currency.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </div>

                                    {/* Total Amount Paid */}
                                    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                                        <dt className='text-sm font-medium text-gray-500'>Total Amount Paid</dt>
                                        <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold'>
                                            {(amountTotal / 100).toFixed(2)} {currency.toUpperCase()}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Return to Store button */}
                            <div className='mt-8 flex justify-center'>
                                <button
                                    onClick={() => (window.location.href = '/')}
                                    className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105'>
                                    Return to Store
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export default function Return() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReturnContent />
        </Suspense>
    );
}
