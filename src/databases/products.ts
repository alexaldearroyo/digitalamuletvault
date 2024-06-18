// src/databases/products.ts

import { sql } from '../../utils/connect';

export async function getProducts() {
  return await sql`
    SELECT id, name, type, description, price, shader_path FROM products
  `;
}

export async function getProductById(id: number) {
  return await sql`
    SELECT id, name, type, description, price, shader_path FROM products WHERE id = ${id}
  `;
}
