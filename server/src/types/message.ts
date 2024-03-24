import type { IChatDocument, IUserDocument } from '@/types';

export interface IMessage {
  sender: IUserDocument;
  content: string;
  chat: IChatDocument;
  readBy: IUserDocument[];
}

export interface IMessageDocument extends IMessage, Document {}
