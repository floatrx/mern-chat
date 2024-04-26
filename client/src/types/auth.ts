import type { IUser } from '@/types/user';

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthLoginRequest {
  email: string;
  password: string; // password is required when creating a user
}

export interface IAuthLoginResponse {
  profile: IUser;
  tokens: ITokenPair;
}

export interface ICheckAuthResponse {
  error?: string;
  message?: string;
  auth?: {
    email: string;
    id: string;
  };
}

export interface IRefreshTokenResponse {
  accessToken: string;
}
