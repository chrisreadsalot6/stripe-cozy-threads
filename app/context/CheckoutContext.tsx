'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useShoppingCart } from './ShoppingCartContext';

interface CheckoutContextType {
  options: { fetchClientSecret: () => Promise<string> } | null;
  setOptions: (options: { fetchClientSecret: () => Promise<string> }) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<{ fetchClientSecret: () => Promise<string> } | null>(null);
  const { cartItems } = useShoppingCart();

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify({ cartItems }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.clientSecret) {
        throw new Error('Client secret not found in response');
      }
      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    setOptions({ fetchClientSecret });
  }, [fetchClientSecret]);

  const contextValue = {
    options,
    setOptions,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}