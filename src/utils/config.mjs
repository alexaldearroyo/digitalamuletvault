<<<<<<< HEAD:src/utils/config.js
// src/utils/config.js

=======
// src/utils/config.mjs
>>>>>>> Deployment:src/utils/config.mjs
import { config } from 'dotenv-safe';
import postgres from 'postgres';

export const postgresConfig = {
  ssl: Boolean(process.env.POSTGRES_URL),
  transform: {
    ...postgres.camel,
    undefined: null,
  },
};

export function setEnvironmentVariables() {
  if (process.env.NODE_ENV === 'production' || process.env.CI) {
    if (process.env.POSTGRES_URL) {
      process.env.PGHOST = process.env.POSTGRES_HOST;
      process.env.PGDATABASE = process.env.POSTGRES_DATABASE;
      process.env.PGUSERNAME = process.env.POSTGRES_USER;
      process.env.PGPASSWORD = process.env.POSTGRES_PASSWORD;
    }
    return;
  }

<<<<<<< HEAD:src/utils/config.js
  // Avoid connecting to the database during the build
  if (process.env.NODE_ENV !== 'build') {
=======
  // Evitar conexión a la base de datos durante el build
  if (!process.env.BUILD_ENV) {
>>>>>>> Deployment:src/utils/config.mjs
    config();
  }
}
