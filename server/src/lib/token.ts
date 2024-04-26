import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { pick } from '@/lib/pick';

import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, TOKEN_SECRET_KEY } from '@/config/const';

import type { IUserDocument } from '@/types/user';
import type { IDecodedToken, ITokenPair, ITokenPayload } from '@/types/auth';

/**
 * Generate access and refresh tokens
 * @param user
 * @returns tokens pair
 */
export const generateTokensPair = (user: IUserDocument): ITokenPair => {
  // Generate access token
  const payload: ITokenPayload = {
    id: user._id,
    email: user.email,
  };

  const [accessToken, refreshToken] = [ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN].map((expiresIn) =>
    jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn }),
  );

  return { accessToken, refreshToken };
};

/**
 * Refresh access token using the refresh token
 * @param refreshToken
 * @returns new access token
 */
export const refreshAccessToken = (refreshToken: string): string => {
  // Verify refreshToken
  const tokenPayload = jwt.verify(refreshToken, TOKEN_SECRET_KEY) as IDecodedToken;
  // Generate new access token
  return jwt.sign(pick(tokenPayload, ['id', 'email']), TOKEN_SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};

/**
 * Check if the password is valid
 * @param password
 * @param user
 * @returns boolean Promise
 */
export const checkPasswordValid = (password: string, user: IUserDocument): Promise<boolean> => {
  return bcrypt.compare(password, user.password);
};

/**
 * Decode token and return the payload
 * @param token
 */
export const getDecodedToken = (token: string): IDecodedToken => {
  return jwt.verify(token, TOKEN_SECRET_KEY) as IDecodedToken;
};
