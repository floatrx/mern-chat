import { Chat } from '@/models/chat';
import { Message } from '@/models/message';

import { handleAsyncErrors } from '@/decorators/handle-async-errors';

import type { Request, Response } from 'express';
import type { IMessageDocument } from '@/types/message';

@handleAsyncErrors
export class MessageController {
  /**
   * List messages
   * @returns status 200 if OK
   */
  static async list(req: Request, res: Response<IMessageDocument[]>) {
    const messages = await Message.find({ chat: req.params.id }).populate('sender');
    res.json(messages);
  }

  /**
   * Create message
   * @returns status 200 if OK
   */
  static async create(req: Request, res: Response<IMessageDocument>) {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      res.status(400);
      throw new Error('Content and chatId are required');
    }
    const messageData = {
      sender: req.user._id,
      content,
      chat: chatId,
    };
    const message = await Message.create(messageData);
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res.json(message);
  }
}
