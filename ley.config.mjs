import { postgresConfig, setEnvironmentVariables } from './src/utils/config.js';

setEnvironmentVariables();

// const options = {
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// };

export default postgresConfig;
