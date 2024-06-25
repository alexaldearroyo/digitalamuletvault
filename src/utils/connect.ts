import 'server-only';
import postgres from 'postgres';
import { config } from 'dotenv';
import { postgresConfig, setEnvironmentVariables } from './config.js';

setEnvironmentVariables();

export const sql = postgres({
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});
