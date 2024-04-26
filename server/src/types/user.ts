import { Document, Model } from 'mongoose';

export interface IUserBase {
  name: string;
  email: string;
}

export interface IUser extends IUserBase {
  password: string;
}

export interface IUserDocument extends IUser, Document {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}

export interface IUserCreatePayload {
  name: string;
  email: string;
  password: string;
}

export interface IUserCreateResponse extends IUserDocument {}
