// pages/api/testProducts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../src/databases/products';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
}
