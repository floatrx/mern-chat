import { UsersRound } from 'lucide-react';

export type MainNavItem = {
  // path to navigate@
  to: string;
  // label to display
  label: string;
  // Icon component (as a React component)
  Icon: React.FC;
  // Mark route as private (only for authenticated users)
  private?: boolean;
};

export const mainNavItems: MainNavItem[] = [{ to: '/users', label: 'Users', Icon: UsersRound, private: true }];
