import { Router } from 'express';

import { allUsers, authUser, registerUser } from '@/controllers/user';
import { requireAuth } from '@/middleware/require-auth';

/**
 * User routes
 * @root api/users
 * @route POST /api/users - Register a new user
 * @route GET /api/users - Get all users (requires authentication)
 * @route POST /api/users/login - Authenticate user
 */
export const userRoutes = Router()
  // routes
  .get('/', requireAuth, allUsers)
  .post('/', registerUser)
  .post('/login', authUser);
