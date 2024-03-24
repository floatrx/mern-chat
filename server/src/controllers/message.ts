// message controller
import expressAsyncHandler from 'express-async-handler';

import { Chat } from '@/models/chat';
import { Message } from '@/models/message';

export const listMessages = expressAsyncHandler(async (req, res) => {
  const messages = await Message.find({ chat: req.params.id }).populate('sender');
  res.json(messages);
});

export const createMessage = expressAsyncHandler(async (req, res) => {
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
});
