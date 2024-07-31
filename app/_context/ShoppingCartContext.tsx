'use client';

import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';

// Define cart item structure
export interface CartItem {
    id: number;
    name: string;
    description: string;
    color: string;
    price: string;
    quantity: number;
    size: string;
    imageSrc: string;
    imageAlt: string;
}

// Define shopping cart context shape
interface ShoppingCartContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number, color: string, size: string) => void;
    calculateSubtotal: (cartItems: CartItem[]) => string;
}

// Initialize shopping cart context with undefined to allow runtime checks
const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

// Wrap the app to provide shopping cart function
export function ShoppingCartProvider({children}: {children: ReactNode}) {
    const [open, setOpen] = useState(false);
    // Load cart items from session storage or default to empty
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCartItems = sessionStorage.getItem('cartItems');
            return savedCartItems ? JSON.parse(savedCartItems) : [];
        }
        return [];
    });

    // When cart items change, save to session storage
    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add to cart based on item id, color, and size
    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                i => i.id === item.id && i.color === item.color && i.size === item.size
            );
            // If item already in cart, increment quantity
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id && i.color === item.color && i.size === item.size
                        ? {...i, quantity: i.quantity + 1}
                        : i
                );
            }
            // If item not in cart, add it with quantity 1
            return [...prevItems, {...item, quantity: 1}];
        });
    };

    // Remove from cart based on item id, color, and size
    const removeFromCart = (id: number, color: string, size: string) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== id || item.color !== color || item.size !== size)
        );
    };

    // Calculate cart total price
    const calculateSubtotal = () => {
        const subtotal = cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + price * item.quantity;
        }, 0);
        return `$${subtotal.toFixed(2)}`;
    };

    // Provide context to children components
    return (
        <ShoppingCartContext.Provider value={{open, setOpen, cartItems, addToCart, removeFromCart, calculateSubtotal}}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

// Custom hook to use shopping cart context
export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (context === undefined) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
}
