import { lazy } from 'react';

import type { RouteItem } from '@/types/route';

/**
 * Lazy loaded components
 * @see https://reactjs.org/docs/code-splitting.html#reactlazy
 */

// -- General
const Overview = lazy(() => import('@/components/pages/overview'));
const Page404 = lazy(() => import('@/components/pages/page404'));
// -- User
const UserLoginForm = lazy(() => import('@/components/features/user/login-user-form'));
const UsersSearchPage = lazy(() => import('@/components/pages/users-search-page'));
const UserProfilePage = lazy(() => import('@/components/features/user/profile-page'));

export const routes: RouteItem[] = [
  {
    path: '/',
    element: Overview,
  },
  {
    path: 'login',
    element: UserLoginForm,
  },
  {
    path: 'users',
    element: UsersSearchPage,
    isPrivate: true,
  },
  {
    path: 'profile',
    element: UserProfilePage,
    isPrivate: true,
  },
  {
    path: '*',
    element: Page404,
  },
];
