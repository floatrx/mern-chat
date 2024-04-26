import { User } from '@/models/user';

import { handleAsyncErrors } from '@/decorators/handle-async-errors';
import { checkPasswordValid, generateTokensPair, refreshAccessToken } from '@/lib/token';

import type { Request, Response } from 'express';
import type { ILoginPayload, ILoginResponse } from '@/types/auth';

@handleAsyncErrors
export class AuthController {
  /**
   * Login user
   * @returns status 200 if OK
   * @returns status 400 if missing parameters or invalid username or password
   * @returns status 500 if server error
   */
  static async login(req: Request<never, never, ILoginPayload>, res: Response<ILoginResponse>) {
    const { email, password } = req.body;

    // Verify if the required fields are present
    if (!email || !password) {
      res.status(400);
      throw new Error('email and password are required');
    }

    // Find user by email
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      res.status(400);
      throw new Error('Invalid username or password');
    }

    // Compare password
    const isPasswordValid = await checkPasswordValid(password, user);
    if (!isPasswordValid) {
      res.status(400);
      throw new Error('Invalid username or password');
    }

    // Generate tokens
    const tokens = generateTokensPair(user);

    res.json({ tokens, profile: user.toJSON() });
  }

  /**
   * Check if session is valid ->
   * Use after "requireAuth" middleware
   * @returns status 200 if OK
   */
  static check(req: Request, res: Response) {
    res.json({ message: 'Session is valid', profile: req.user });
  }

  /**
   * Refresh access token
   * @returns status 200 if OK
   * @returns status 400 if missing refreshToken
   * @returns status 403 if invalid refreshToken
   */
  static refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error('RefreshToken is required');
    }

    try {
      const accessToken = refreshAccessToken(refreshToken);
      res.json({ accessToken });
    } catch (error) {
      res.status(403); // should trigger logout on the client
      throw new Error('Invalid refreshToken');
    }
  }
}
