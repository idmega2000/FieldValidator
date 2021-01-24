const dotenv = require('dotenv');

dotenv.config();

const envData = {
  PORT: process.env.PORT || 9700,
  SENTRY_DSN: process.env.SENTRY_DSN,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE
};

export default envData;
