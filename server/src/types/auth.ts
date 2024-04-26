import type { IUser } from '@/types/user';

export interface ITokenPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IDecodedToken extends Required<ITokenPayload> {}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  tokens: ITokenPair;
  profile: IUser;
}
