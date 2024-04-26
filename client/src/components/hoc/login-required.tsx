import type { ReactNode } from 'react';

import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';

import { LoginUserForm } from '@/components/features/user/login-user-form';

interface IProps {
  element: ReactNode;
  showLogin: boolean;
}

/**
 * LoginRequired HOC
 * If user authorized and showLogin = true -> show login form
 * If user guest and showLogin = false -> return null
 * @param element
 * @param showLogin
 * @constructor
 */
export const LoginRequired = ({ element, showLogin }: IProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? element : showLogin ? <LoginUserForm /> : null;
};
