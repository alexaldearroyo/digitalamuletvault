// src/utils/__tests__/combineProductData.test.ts

import { getProducts } from '../../databases/products';
import { getCartFromCookies } from '../cookies';
import { Product } from '../../types/Product';

jest.mock('../../databases/products', () => ({
  getProducts: jest.fn(),
}));

jest.mock('../cookies', () => ({
  getCartFromCookies: jest.fn(),
}));

const combineProductData = async () => {
  const products: Product[] = await getProducts();
  const cart = getCartFromCookies();

  return cart.map((cartItem: { id: number; quantity: number }) => {
    const product = products.find((product) => product.id === cartItem.id);
    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });
};

test('combines product data with quantity data', async () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      type: 'Type 1',
      description: 'Description 1',
      price: 10,
      shaderPath: null,
    },
    {
      id: 2,
      name: 'Product 2',
      type: 'Type 2',
      description: 'Description 2',
      price: 20,
      shaderPath: null,
    },
  ];

  const mockCart = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 3 },
  ];

  (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  (getCartFromCookies as jest.Mock).mockReturnValue(mockCart);

  const combinedData = await combineProductData();

  expect(combinedData).toBeDefined();
  expect(combinedData[0]).toHaveProperty('id');
  expect(combinedData[0]).toHaveProperty('quantity');
  expect(combinedData[0].quantity).toBe(2);
});
