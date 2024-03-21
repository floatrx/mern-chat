import 'dotenv/config';

// App port
export const PORT = process.env.PORT || 3000;

// JWT secret
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// MongoDB's connection string
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://user:password@localhost:27018';

// MongoDB host
export const MONGO_HOST = MONGO_URI.split('@').pop() || '<unknown>';
