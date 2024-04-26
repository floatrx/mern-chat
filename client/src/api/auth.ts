import { api } from '@/api/index';
import { login, refreshAccessToken } from '@/store/auth';

import type { IAuthLoginRequest, IAuthLoginResponse, ICheckAuthResponse, IRefreshTokenResponse } from '@/types/auth';

const path = '/auth';

export const authApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    login: mutation<IAuthLoginResponse, IAuthLoginRequest>({
      query: (body) => ({ url: `${path}/login`, method: 'POST', body }),
      onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
        const { data } = await cacheDataLoaded;
        dispatch(login(data));
      },
      extraOptions: {
        maxRetries: 0,
      },
    }),
    refresh: mutation<IRefreshTokenResponse, { refreshToken: string }>({
      query: (body) => ({ url: `auth/refresh`, method: 'POST', body }),
      onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
        const { data } = await cacheDataLoaded;
        dispatch(refreshAccessToken(data.accessToken));
      },
      extraOptions: {
        maxRetries: 0,
      },
    }),
    checkAuth: query<ICheckAuthResponse, void>({
      query: () => ({ url: `${path}/check` }),
      extraOptions: {
        maxRetries: 0,
      },
    }),
  }),
});

export const { useLoginMutation, useCheckAuthQuery, useLazyCheckAuthQuery, useRefreshMutation } = authApi;
