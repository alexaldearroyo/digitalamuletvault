import secureJsonParse from 'secure-json-parse';

export const getCartFromCookies = () => {
  if (typeof document !== 'undefined') {
    const name = 'cart=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return secureJsonParse(c.substring(name.length, c.length));
      }
    }
  }
  return [];
};

export const saveCartToCookies = (cart) => {
  if (typeof document !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 1 day
    document.cookie = `cart=${JSON.stringify(cart)};expires=${expires.toUTCString()};path=/`;
  }
};

export const removeCartFromCookies = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'cart=; Max-Age=0; path=/';
  }
};
