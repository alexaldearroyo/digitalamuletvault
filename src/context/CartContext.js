'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCartFromCookies as getClientCartFromCookies,
  saveCartToCookies,
  removeCartFromCookies,
} from '../utils/cookies';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return getClientCartFromCookies();
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      saveCartToCookies(cart);
    }
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      if (newCart.length === 0) {
        removeCartFromCookies();
      }
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
