// src/utils/__tests__/cartSum.test.ts

const calculateCartTotal = (cart: { price: number; quantity: number }[]) => {
  return cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
};

test('calculates the total price of the cart', () => {
  const cart = [
    { id: 1, price: 10, quantity: 2 },
    { id: 2, price: 20, quantity: 1 },
  ];
  const total = calculateCartTotal(cart);
  expect(total).toBe(40);
});
