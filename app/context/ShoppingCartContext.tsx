'use client';

import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';

interface CartItem {
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

interface ShoppingCartContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number, color: string, size: string) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

const defaultCartItems: CartItem[] = [];

export function ShoppingCartProvider({children}: {children: ReactNode}) {
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCartItems = sessionStorage.getItem('cartItems');
            return savedCartItems ? JSON.parse(savedCartItems) : defaultCartItems;
        }
        return defaultCartItems;
    });

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                i => i.id === item.id && i.color === item.color && i.size === item.size
            );
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id && i.color === item.color && i.size === item.size
                        ? {...i, quantity: i.quantity + 1}
                        : i
                );
            }
            return [...prevItems, {...item, quantity: 1}];
        });
    };

    const removeFromCart = (id: number, color: string, size: string) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== id || item.color !== color || item.size !== size)
        );
    };

    return (
        <ShoppingCartContext.Provider value={{open, setOpen, cartItems, addToCart, removeFromCart}}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (context === undefined) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
}
