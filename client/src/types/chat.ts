import type { IUser } from "@/types/user";

export interface Chat {
  id: string;
  chatName: string;
  isGroupChat: boolean;
  users: IUser[];
  createdAt: string;
  updatedAt: string;
}
