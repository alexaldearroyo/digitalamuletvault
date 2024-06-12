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
    // Save cart's status onto cookies whenever it changes
    if (cart.length > 0) {
      Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Expira en 7 días
    } else {
      Cookies.remove('cart'); // Delete cookies if cart's empty
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
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
