import { sql } from '../utils/connect';
import { Product } from '../types/Product';

export async function getProducts(): Promise<Product[]> {
  const products = await sql<Product[]>`
    SELECT id, name, type, description, price, shader_path AS "shaderPath" FROM products
  `;
  return products;
}

export async function getProductById(id: number): Promise<Product | null> {
  const [product] = await sql<Product[]>`
    SELECT id, name, type, description, price, shader_path AS "shaderPath" FROM products WHERE id = ${id}
  `;
  return product || null;
}
