// Context that manages the cart state globally
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Read Cart's cookies once the app is initialized.
    const savedCart = Cookies.get('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      // Set the cookie securely
      Cookies.set('cart', JSON.stringify(cart), {
        expires: 1, // One day
        path: '/',
        // secure: true, // Only over HTTPS
        // sameSite: 'strict', // Prevent cross-site requests
      });
    } else {
      Cookies.remove('cart');
    }
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      // Search if the product is already in the cart.
      const existingProduct = prevCart.find((item) => item.id === product.id);

      // If the product already exists in the cart, increase its quantity.
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // If the product does not exist, add it to the cart.
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
