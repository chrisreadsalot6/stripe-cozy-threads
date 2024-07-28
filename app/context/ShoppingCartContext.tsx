'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

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
  removeFromCart: (id: number) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

const defaultCartItems = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    description: 'Throwback Hip Bag',
    color: 'Salmon',
    price: '$90',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    size: 'M'
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    description: 'Medium Stuff Satchel',
    color: 'Blue',
    price: '$32',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    size: 'M'
  },
  // More products...
]

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems);
// const pathname = usePathname();

//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const initialCart = searchParams.get('initialCart');
//     if (pathname === '/' && initialCart && cartItems.length === 0) {
//       setCartItems(defaultCartItems);
//     }
//   }, [pathname, searchParams]);
  

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider value={{ open, setOpen, cartItems, addToCart, removeFromCart }}>
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