import { getCartFromCookies, saveCartToCookies } from '../cookies';

const updateCartItemQuantity = (id: number, quantity: number) => {
  const cart = getCartFromCookies();
  const updatedCart = cart.map((item: { id: number; quantity: number }) =>
    item.id === id ? { ...item, quantity } : item,
  );
  saveCartToCookies(updatedCart);
};

test('updates the quantity of an existing cart item', () => {
  // Mock initial cart data
  const initialCart = [{ id: 1, quantity: 1 }];
  document.cookie = `cart=${JSON.stringify(initialCart)}`;

  updateCartItemQuantity(1, 3);

  const updatedCart = getCartFromCookies();
  expect(updatedCart[0].quantity).toBe(3);
});
