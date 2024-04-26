import type { IUser } from "@/types/user";

export interface IMessage {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
