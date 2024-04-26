import mongoose from 'mongoose';

import { MONGO_HOST, MONGO_URI } from '@/config/const';

/**
 * Connect to MongoDB
 * Returns a promise that resolves when the connection is established
 * Requires MONGO_URI to be set in .env
 * @returns {Promise<void>}
 */
export const connectToMongo = async (): Promise<void> => {
  console.log(`📦 Connecting to MongoDB ${MONGO_HOST}`);
  mongoose.set('toJSON', { virtuals: true }); // enable virtuals in query results

  await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('📦 MongoDB connected!');
    })
    .catch((e) => {
      console.error('📦 MongoDB connection error:', e.message);
      process.exit(1); // exit process
    });
};
