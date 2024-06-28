// src/utils/connect.ts

import 'server-only';
import postgres from 'postgres';
import { config } from 'dotenv';

config();

export const sql = postgres({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});
