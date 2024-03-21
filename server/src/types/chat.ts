import type { IMessage } from '@/types/message';
import type { IUser } from '@/types/user';

export interface IChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  latestMessage: IMessage;
  groupAdmin: IUser;
  createdAt: string;
  updatedAt: string;
}
