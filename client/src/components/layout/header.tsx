import { Link } from 'react-router-dom';

import { mainNavItems } from '@/config/nav';
import { useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { selectIsLoggedIn } from '@/store/auth';

import { UserProfileButton } from '@/components/features/user/user-profile-button';

import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header className="top-0 z-40 w-full bg-header/50 p-1 shadow border-b dark:border-violet-500/30">
      <div className="container flex h-16 items-center space-x-4 sm:space-x-0">
        <Logo />
        <nav className="flex-auto">
          <ul className="stack gap-4">
            <li className="flex-1 hidden sm:flex" />
            {mainNavItems.map(({ Icon, ...item }, idx) => (
              <li key={idx} className={cn(!item.to && 'flex-1', 'hidden md:block' /* show only sm & larger screens */)}>
                {(!item.private || (item.private && isLoggedIn)) && (
                  <Link to={item.to} className="stack">
                    <Icon /> <span className="text-nowrap">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
            <li className="flex-1" />
            <li>
              <ThemeToggle />
            </li>
            <li>
              <UserProfileButton asDropdown />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
