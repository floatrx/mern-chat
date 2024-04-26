import { RootState } from '@/store/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { IAuthLoginResponse, ITokenPair } from '@/types/auth';
import type { IUser, IUserUpdateRequest } from '@/types/user';

export interface AuthState {
  isLoggedIn: boolean;
  user: IUser;
  tokens: ITokenPair;
}

/*
 * TODO: Update with profile
 * auth.user - for websockets (imperative code -> only getState)
 */

const userInitialState: IUser = {
  id: '',
  name: '',
  email: '',
  createdAt: '',
  updatedAt: '',
};

export const authInitialState: AuthState = {
  isLoggedIn: false,
  user: userInitialState,
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    login: (state: AuthState, { payload }: PayloadAction<IAuthLoginResponse>) => {
      state.user = payload.profile;
      state.tokens = payload.tokens;
      state.isLoggedIn = true;
    },
    setUser: (state: AuthState, { payload }: PayloadAction<IUser | undefined>) => {
      state.user = payload?.id ? payload : userInitialState;
    },
    updateUser: (state: AuthState, { payload }: PayloadAction<IUserUpdateRequest>) => {
      state.user = { ...state.user, ...payload };
    },
    refreshAccessToken: (state: AuthState, { payload }: PayloadAction<string>) => {
      state.tokens.accessToken = payload;
    },
    logout: () => authInitialState,
  },
});

export default authSlice.reducer;

export const { login, refreshAccessToken, logout, setUser, updateUser } = authSlice.actions;

// Selectors
export const selectAuth = ({ auth }: RootState) => auth;
export const selectIsLoggedIn = ({ auth }: RootState) => auth.isLoggedIn;
export const selectUser = ({ auth }: RootState) => auth.user;
export const selectUserId = ({ auth }: RootState) => auth.user.id;
