// src/databases/products.ts

import { sql } from '../utils/connect';
import { Product } from '../types/Product';

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await sql<Product[]>`
      SELECT id, name, type, description, price, shader_path AS "shaderPath" FROM products
    `;
    return products;
  } catch (error) {
    console.error('Error fetching products from database:', error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const [product] = await sql<Product[]>`
      SELECT id, name, type, description, price, shader_path AS "shaderPath" FROM products WHERE id = ${id}
    `;
    return product || null;
  } catch (error) {
    console.error('Error fetching product by ID from database:', error);
    return null;
  }
}
