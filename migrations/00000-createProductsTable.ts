import sql, { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(30) NOT NULL,
      type VARCHAR(30),
      description TEXT,
      price NUMERIC,
      shader_path VARCHAR(255) NOT NULL
    )
    `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE products
    `;
}
