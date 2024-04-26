import { Chat } from '@/models/chat';

import { handleAsyncErrors } from '@/decorators/handle-async-errors';

import type { Request, Response } from 'express';
import type { IChatCreateRequest, IChatDocument } from '@/types/chat';

@handleAsyncErrors
export class ChatController {
  static async create(req: Request<never, never, IChatCreateRequest>, res: Response<IChatDocument>) {
    const { users = [], chatName } = req.body;
    const chatData = {
      chatName: chatName || req.user._id,
      isGroupChat: !!users.length,
      users: [req.user, ...users],
    };
    const chat = await Chat.create(chatData);
    res.json(chat);
  }

  /**
   * Get all chats
   * @returns status 200 if OK
   */
  static async list(req: Request, res: Response) {
    const chats = await Chat.find({ users: req.user._id }).populate('users');
    res.json(chats);
  }

  /**
   * Join chat
   * @returns status 200 if OK
   * @returns status 404 if chat not found
   */
  static async join(req: Request, res: Response) {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      res.status(404);
      throw new Error('Chat not found');
    }

    if (chat.isGroupChat) {
      chat.users.push(req.user);
      await chat.save();
    }

    res.json(chat);
  }
}
