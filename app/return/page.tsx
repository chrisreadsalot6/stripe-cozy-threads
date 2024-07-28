'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useShoppingCart } from '../context/ShoppingCartContext';

export default function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const { cartItems, removeFromCart } = useShoppingCart();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      redirect('/')
    )
  }

  if (status === 'complete') {
    const purchasedItems = [...cartItems];
    
    cartItems.forEach((item) => {
      removeFromCart(item.id);
    });

    const totalSpent = purchasedItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price * item.quantity;
    }, 0);

    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Your Purchased Items:</h2>
        <ul className="mt-4">
          {purchasedItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-4 mb-4">
              <img src={item.imageSrc} alt={item.imageAlt} className="w-16 h-16 object-cover" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-lg font-semibold">Total Spent: ${totalSpent.toFixed(2)}</p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Return to Store
        </button>
      </section>
    )
  }

  return null;
}