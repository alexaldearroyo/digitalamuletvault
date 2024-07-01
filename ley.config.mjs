import {
  postgresConfig,
  setEnvironmentVariables,
} from './src/utils/config.mjs';

setEnvironmentVariables();

export default postgresConfig;
