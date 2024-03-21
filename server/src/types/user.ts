import { Document, Model } from 'mongoose';

export interface IUserBase {
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IUserBase {
  password: string;
}

export interface IUserDocument extends IUser, Document {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}

export interface IUserCreatePayload {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserAuthResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface IUsersListResponse {
  users: IUserBase[];
}
