import { Sql } from 'postgres';

const products = [
  {
    name: 'Lucky Charm',
    description: 'A digital amulet that brings good luck.',
    price: 19.99,
    shaderPath: 'ShaderImage1',
  },
  {
    name: 'Health Talisman',
    description: 'A digital talisman that promotes health and well-being.',
    price: 29.99,
    shaderPath: 'ShaderImage2',
  },
  {
    name: 'Wealth Amulet',
    description: 'A digital amulet that attracts wealth and prosperity.',
    price: 9.99,
    shaderPath: 'ShaderImage3',
  },
  {
    name: 'Protection Sigil',
    description: 'A digital sigil that offers protection from harm.',
    price: 14.99,
    shaderPath: 'ShaderImage4',
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
      INSERT INTO products (name, description, price, shader_path) VALUES (
        ${product.name},
        ${product.description},
        ${product.price},
        ${product.shaderPath}
      )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products WHERE
        name = ${product.name}
    `;
  }
}
