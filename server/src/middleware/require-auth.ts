import type { NextFunction, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@/config/const';
import { User } from '@/models/user';
import type { JWTPayload } from '@/types/jwt';
import type { IUserDocument } from '@/types/user';

// Augment the Express Request type to include the auth property
declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
    }
  }
}

export const requireAuth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      //decodes token id
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
