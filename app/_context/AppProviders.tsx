import React, {ReactNode} from 'react';
import {ShoppingCartProvider} from './ShoppingCartContext';
import {CheckoutProvider} from './CheckoutContext';

interface AppProvidersProps {
    children: ReactNode;
}

// Combine all providers here to use as app context
export function AppProviders({children}: AppProvidersProps) {
    return (
        <ShoppingCartProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
        </ShoppingCartProvider>
    );
}
