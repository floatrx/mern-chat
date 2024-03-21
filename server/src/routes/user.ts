import { Router } from 'express';

import { allUsers, authUser, registerUser } from '@/controllers/user';
import { requireAuth } from '@/middleware/require-auth';

/**
 * User routes
 * @root api/users
 */
export const userRoutes = Router()
  // Endpoints
  .get('/', requireAuth, allUsers)
  .post('/', registerUser)
  .post('/login', authUser);
