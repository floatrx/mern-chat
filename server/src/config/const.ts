import 'dotenv/config';

// App port
export const PORT = process.env.PORT || 3000;

// JWT
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || 'secret';
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '1m';
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '1d';

// MongoDB's connection string
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://user:password@localhost:27018';

// MongoDB host
export const MONGO_HOST = MONGO_URI.split('@').pop() || '<unknown>';
