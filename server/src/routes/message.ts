import { Router } from 'express';

import { createMessage, listMessages } from '@/controllers/message';
import { requireAuth } from '@/middleware/require-auth';

/**
 * User routes
 * @root api/chats
 * @access Private
 */
export const messageRoutes = Router()
  // routes
  .get('/', requireAuth, listMessages)
  .post('/', requireAuth, createMessage);
