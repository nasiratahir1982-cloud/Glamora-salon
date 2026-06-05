"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'product' | 'service';
  date?: string;
  time?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any, type: 'product' | 'service') => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  
  // Wishlist
  wishlist: CartItem[];
  toggleWishlist: (item: any, type: 'product' | 'service') => void;
  isInWishlist: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('glamora-cart');
    const savedWishlist = localStorage.getItem('glamora-wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('glamora-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('glamora-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const addToCart = (item: any, type: 'product' | 'service') => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace('£', '')) : item.price;
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: price, 
        image: item.image || item.icon, 
        quantity: 1,
        type,
        date: item.date,
        time: item.time
      }];
    });
  };

  const toggleWishlist = (item: any, type: 'product' | 'service') => {
    setWishlist(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.filter(i => i.id !== item.id);
      }
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace('£', '')) : item.price;
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: price, 
        image: item.image || item.icon, 
        quantity: 1,
        type 
      }];
    });
  };

  const isInWishlist = (id: string) => wishlist.some(i => i.id === id);

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal,
      wishlist, toggleWishlist, isInWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
