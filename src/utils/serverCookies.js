// src/utils/serverCookies.js
import { cookies } from 'next/headers';

export const getCartFromCookies = () => {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get('cart');
  if (cartCookie) {
    return JSON.parse(cartCookie.value);
  }
  return [];
};
