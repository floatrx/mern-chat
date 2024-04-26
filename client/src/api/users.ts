import { api } from '@/api/index';

import type { IUser, IUserCreateRequest } from '@/types/user';

const path = '/users';
const type = 'User';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchUsers: query<IUser[], void | null>({
      query: () => ({ url: path }),
      providesTags: [type],
    }),
    createUser: mutation<IUser, IUserCreateRequest>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
  }),
});

export const { useSearchUsersQuery, useCreateUserMutation } = injectedRtkApi;
