import handleAsyncErrors from 'express-async-handler';

import { User } from '@/models/user';

import type { NextFunction, Request, Response } from 'express';
import type { IUserDocument } from '@/types/user';
import { getDecodedToken } from '@/lib/token';

// Augment the Express Request type to include the user (auth) property
declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
    }
  }
}

/**
 * Middleware to require authentication.
 * Augment the "req.user" property with the user data
 * @returns status 200 if OK
 * @returns status 400 if missing parameters
 * @returns status 401 if unauthorized (should trigger refresh token on the client)
 */
export const requireAuth = handleAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  console.log('req.headers.authorization', req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token ID
      const tokenPayload = getDecodedToken(token);
      console.log('tokenPayload', tokenPayload);

      // Augment the Request object with the user property
      req.user = await User.findById(tokenPayload.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized! Invalid token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
