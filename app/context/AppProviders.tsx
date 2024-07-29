import React, {ReactNode} from 'react';
import {ShoppingCartProvider} from './ShoppingCartContext';
import {CheckoutProvider} from './CheckoutContext';

interface AppProvidersProps {
    children: ReactNode;
}

export function AppProviders({children}: AppProvidersProps) {
    return (
        <ShoppingCartProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
        </ShoppingCartProvider>
    );
}
