import type { IMessage } from '@/types/message';
import type { IUserDocument } from '@/types/user';

export interface IChat {
  chatName: string;
  isGroupChat: boolean;
  users: IUserDocument[];
  latestMessage: IMessage;
  groupAdmin: IUserDocument;
}

export interface IChatDocument extends IChat, Document {}

export interface IChatCreateRequest {
  chatName: string;
  users: string[];
}
