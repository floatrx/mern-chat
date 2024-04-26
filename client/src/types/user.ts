export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserCreateRequest {
  name: string;
  email: string;
  password: string; // password is required when creating a user
}

export interface IUserUpdateRequest extends IUserCreateRequest {}
