import 'server-only';
import postgres, { Sql } from 'postgres';
import postgresConfig from '../../ley.config.js';
import { setEnvironmentVariables } from './config.js';

setEnvironmentVariables();

declare global {
  var postgresSqlClient: Sql | undefined;
}

function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres(postgresConfig);
  }

  return ((
    ...sqlParameters: Parameters<typeof globalThis.postgresSqlClient>
  ) => {
    return globalThis.postgresSqlClient!(...sqlParameters);
  }) as typeof globalThis.postgresSqlClient;
}

export const sql = connectOneTimeToDatabase();
