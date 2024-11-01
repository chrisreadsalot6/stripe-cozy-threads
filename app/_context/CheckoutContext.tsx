'use client';

import React, {createContext, useContext, useEffect, useState, useCallback, ReactNode} from 'react';
import {useShoppingCart} from './ShoppingCartContext';

// Define the structure of the checkout context
interface CheckoutContextType {
    options: {fetchClientSecret: () => Promise<string>} | null;
    setOptions: (options: {fetchClientSecret: () => Promise<string>}) => void;
}

// Initialize the CheckoutContext with undefined to allow runtime checks
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// CheckoutProvider: Manages and provides checkout state to its children
export function CheckoutProvider({children}: {children: ReactNode}) {
    // State to store checkout options
    const [options, setOptions] = useState<{
        fetchClientSecret: () => Promise<string>;
    } | null>(null);

    // Fetch the client secret from server
    // Creates a checkout session with these items
    const {cartItems} = useShoppingCart();

    const fetchClientSecret = useCallback(async () => {
        try {
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                body: JSON.stringify({cartItems}),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`HTTP error! status: ${response.status}. body: ${errorData}`);
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
    }, [cartItems]);

    // Have latest version of fetchClientSecret by updating options whenever fetchClientSecret changes
    useEffect(() => {
        setOptions({fetchClientSecret});
    }, [fetchClientSecret]);

    // Construct context to children components
    const contextValue = {
        options,
        setOptions,
    };
    return <CheckoutContext.Provider value={contextValue}>{children}</CheckoutContext.Provider>;
}

// Custom hook to use checkout context
export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
}
