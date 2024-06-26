import 'server-only';
import postgres from 'postgres';
import { config } from 'dotenv';

config();

export const sql = postgres({
  ssl: Boolean(process.env.POSTGRES_URL),
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});
