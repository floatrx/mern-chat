import { Router } from 'express';

import { createChat, joinChat, listChats } from '@/controllers/chat';
import { requireAuth } from '@/middleware/require-auth';

/**
 * User routes
 * @root api/chats
 * @access Private
 */
export const chatRoutes = Router()
  // routes
  .get('/', requireAuth, listChats)
  .post('/', requireAuth, createChat)
  .put('/:id', requireAuth, joinChat);
