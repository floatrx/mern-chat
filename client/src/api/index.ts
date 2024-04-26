/**
 * API service with base query and error handlers
 * - baseQuery: main fn. Provides custom header "Authorization" and parse query params
 * - baseQueryWithErrorHandlers: baseQuery with error handlers
 *   • 401 Unauthorized -> refresh token -> retry
 *   • 403 Forbidden -> logout
 *
 * NOTE: Ensure to check for token updates from the auth/refresh endpoint.
 *       Either through the refresh mechanism or when an entry is added to the store (authSlice).
 */
import { API_BASE_URL } from '@/config/const';
import { logout } from '@/store/auth';
import type { RootState } from '@/store/store';
import type { BaseQueryHandler } from '@/types/rtkq';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import qs from 'query-string';

const mutex = new Mutex();

/**
 * Base query with custom header
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL, // @see vite.config.ts server.proxy
  paramsSerializer: (params) => qs.stringify(params, { skipEmptyString: true, skipNull: true }),
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth.tokens;
    accessToken && headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  },
});

/**
 * Handle errors
 * TODO: check mutex https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors
 */
const baseQueryWithErrorHandlers: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions: Record<string, unknown>,
) => {
  const result = await baseQuery(args, api, extraOptions);

  // if request is successful do nothing
  if (!result.error) return result; // OK

  // -- ERROR HANDLING --
  const { status } = result.error;

  // Handle 401 Unauthorized & refresh token -> "refreshPromise" wait other requests to finish
  if (status === 401) {
    // Prevent multiple refresh token requests
    await mutex.waitForUnlock();
    return await refreshAccessTokenAndRetry(args, api, extraOptions);
  }

  if (status === 403) {
    api.dispatch(logout());
  }

  return result;
};

/**
 * Refresh access token and retry the original request
 */
const refreshAccessTokenAndRetry: BaseQueryHandler = async (args, api, extraOptions) => {
  console.log('Handle refresh token and retry');

  if (!mutex.isLocked()) {
    const release = await mutex.acquire();

    try {
      const { auth } = api.getState() as RootState;
      const requestBody = { refreshToken: auth.tokens.refreshToken };

      if (!requestBody.refreshToken) {
        console.error('Refresh token not found. Logout');
        api.dispatch(logout());
        return;
      }
      /**
       * NOTE: Ensure to check for token updates from the auth/refresh endpoint,
       * either through the refresh mechanism or when an entry is added to the store (authSlice).
       */
      await api.dispatch(getReadyApi().endpoints['refresh'].initiate(requestBody));
      //                              ^^^^^^ used instead of "api" to avoid errors

      console.log('Refresh token success. Retry', { args, extraOptions });

      if (!extraOptions.maxRetries) return; // TODO: Check if it's needed

      return await baseQuery(args, api, extraOptions); // retry original request
    } catch (error) {
      console.error('Refresh token failed:', error);
      api.dispatch(logout());
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
    return baseQuery(args, api, extraOptions); // retry original request
  }
};

/*
 * Define a service using app URL and expected endpoints
 * Enhance generated endpoints with tags: providesTags & invalidatesTags
 * https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags
 * More at: https://www.graphql-code-generator.com/plugins/typescript-rtk-query
 */
export const api = createApi({
  reducerPath: '_api',
  tagTypes: ['User', 'Post', 'Tag'],
  refetchOnReconnect: true, // test it
  refetchOnFocus: true, // test it
  baseQuery: retry(baseQueryWithErrorHandlers, { maxRetries: 1 }),
  endpoints: () => ({}),
});

/**
 * Export the ready-to-use API [workaround]
 * Use this function to avoid typescript and runtime errors:
 *  - "Cannot read property 'endpoints' of undefined"
 *  - "Cannot access 'api' before initialization"
 */
const getReadyApi = () => api;
