import type { IChat, IUser } from '@/types';

export interface IMessage {
  _id: string;
  sender: IUser;
  content: string;
  chat: IChat;
  readBy: IUser[];
  createdAt: string;
  updatedAt: string;
}
