// chat controller
import expressAsyncHandler from 'express-async-handler';

import { Chat } from '@/models/chat';

export const createChat = expressAsyncHandler(async (req, res) => {
  const { users = [] } = req.body;
  const chatData = {
    chatName: req.user._id,
    isGroupChat: !!users.length,
    users: [req.user, ...users],
  };
  const chat = await Chat.create(chatData);
  res.json(chat);
});

export const listChats = expressAsyncHandler(async (req, res) => {
  const chats = await Chat.find({ users: req.user._id });
  res.json(chats);
});

export const joinChat = expressAsyncHandler(async (req, res) => {
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
});
