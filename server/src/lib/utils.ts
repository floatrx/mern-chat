import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@/config/const';

/**
 * Generate token
 * @param id
 * @returns token - signed JWT token with user ID expiration date (30d)
 */
export const generateToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d',
  });
};
