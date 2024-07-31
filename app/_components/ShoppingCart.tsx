'use client';

import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {useShoppingCart} from '../_context/ShoppingCartContext';
import Image from 'next/image';

export default function ShoppingCart() {
    const {open, setOpen, cartItems, removeFromCart, calculateSubtotal} = useShoppingCart();

    // Don't render if cart is closed
    if (!open) return null;

    // CartHeader: render title and close button
    const cartHeader = () => {
        return (
            <div className='overflow-y-auto px-4 py-6 sm:px-6'>
                <div className='flex items-start justify-between'>
                    <DialogTitle className='text-lg font-medium text-gray-900'>Shopping cart</DialogTitle>
                    <div className='ml-3 flex h-7 items-center'>
                        <button
                            type='button'
                            onClick={() => setOpen(false)}
                            className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'>
                            <span className='absolute -inset-0.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // CartFooter: render subtotal, checkout button, and continue shopping option
    const cartFooter = (formattedSubtotal: string) => {
        return (
            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                {/* Subtotal */}
                <div className='flex justify-between text-base font-medium text-gray-900'>
                    <p>Subtotal</p>
                    <p>{formattedSubtotal}</p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
                {/* Checkout button */}
                <div className='mt-6'>
                    <a
                        href='/checkout'
                        className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'>
                        Checkout
                    </a>
                </div>
                {/* Continue shopping button */}
                <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                    <p>
                        or{' '}
                        <button
                            type='button'
                            onClick={() => setOpen(false)}
                            className='font-medium text-indigo-600 hover:text-indigo-500'>
                            Continue Shopping
                            <span aria-hidden='true'> &rarr;</span>
                        </button>
                    </p>
                </div>
            </div>
        );
    };

    const renderCartItems = () => {
        return (
            <div className='my-8'>
                <div className='flow-root'>
                    <ul role='list' className='-my-6 divide-y divide-gray-200'>
                        {cartItems.map(product => (
                            <li key={product.id} className='flex py-6 px-6'>
                                {/* Product image */}
                                <div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                    <Image
                                        alt={product.imageAlt}
                                        src={product.imageSrc}
                                        className='object-cover object-center'
                                        fill
                                    />
                                </div>
                                {/* Product details container */}
                                <div className='ml-4 flex flex-1 flex-col'>
                                    {/* Show product name, price, color, and size */}
                                    <div>
                                        <div className='flex justify-between text-base font-medium text-gray-900'>
                                            <h3>{product.name}</h3>
                                            <p className='ml-4'>{product.price}</p>
                                        </div>
                                        <p className='mt-1 text-sm text-gray-500'>
                                            {product.color} - {product.size}
                                        </p>
                                    </div>
                                    {/* Product quantity and remove button */}
                                    <div className='flex items-end justify-between text-sm'>
                                        <p className='text-gray-500'>Qty {product.quantity}</p>
                                        <div className='flex'>
                                            <button
                                                type='button'
                                                className='font-medium text-indigo-600 hover:text-indigo-500'
                                                onClick={() => removeFromCart(product.id, product.color, product.size)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    // Calculate subtotal to display in cart footer
    const formattedSubtotal = calculateSubtotal(cartItems);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className='relative z-[100]'>
            {/* Dim the background when cart open */}
            <DialogBackdrop
                transition
                className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0'
            />
            {/* Cart slide-in panel container */}
            <div className='fixed inset-0 overflow-hidden'>
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                        <DialogPanel
                            transition
                            className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'>
                            <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                {cartHeader()}
                                <div className='flex-1'>{renderCartItems()}</div>
                                {cartFooter(formattedSubtotal)}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
