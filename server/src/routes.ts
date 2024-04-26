import { Request, Response, Router } from 'express';
import { AuthController } from '@/controllers/auth';
import { requireAuth } from '@/middleware/require-auth';
import { UserController } from '@/controllers/user';
import { ChatController } from '@/controllers/chat';
import { MessageController } from '@/controllers/message';

export const appRoutes = Router()
  // Test
  .get('/test', (_: Request, res: Response) => {
    res.send('👋 Express server!');
  })

  // Auth
  .post('/auth/login', AuthController.login)
  .get('/auth/check', requireAuth, AuthController.check)
  .post('/auth/refresh', AuthController.refreshToken)

  //Users
  .get('/users', requireAuth, UserController.list)
  .post('/users', UserController.create)

  // Chats
  .get('/chats', requireAuth, ChatController.list)
  .post('/chats', requireAuth, ChatController.create)
  .put('/chats/:id', requireAuth, ChatController.join)

  // Messages
  .get('/messages', requireAuth, MessageController.list)
  .post('/messages', requireAuth, MessageController.create);
