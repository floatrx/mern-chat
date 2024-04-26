import { CircleUserRound, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';
import { useToggle } from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import { selectUser } from '@/store/auth';
import { useMediaQuery } from 'usehooks-ts';

import { UserLogoutButton } from '@/components/features/user/user-logout-button';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface IProps {
  className?: string;
  asDropdown?: boolean; // If true, render as dropdown
}

export const UserProfileButton = ({ className, asDropdown }: IProps) => {
  const user = useAppSelector(selectUser);
  const { isOpen, setOpen } = useToggle();
  const smallScreen = useMediaQuery('(max-width: 767px)'); // auto-close on mobile
  const classNames = cn(`flex items-center gap-2 text-nowrap`, className);

  if (!user.id) {
    return (
      <Link to="/login" className={cn(classNames, 'px-3 py-2')}>
        <LogIn /> Login
      </Link>
    );
  }

  const name = user.name.split(' ');
  const displayName = name.length > 1 ? `${name[0]} ${name[1][0]}.` : user.name;

  return asDropdown ? (
    <div className="flex items-center gap-2">
      <DropdownMenu open={isOpen && !smallScreen} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className="outline-0">
          <Link to="/profile" className={cn(classNames)}>
            <CircleUserRound />
            <span className="font-semibold">{displayName}</span>
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-10 hover:bg-card">
          <DropdownMenuItem className="!bg-transparent text-center">
            <div className="space-y-1">
              <CircleUserRound size={60} className="mx-auto mb-4" />
              <Link className="text-xl font-semibold" to="/profile">
                {user.name}
              </Link>
              <div className="!mb-4 text-muted-foreground">{user.email}</div>
              <UserLogoutButton className="w-full" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    // Inline
    <div className={cn('stack justify-between font-semibold', className)}>
      <Link to="/profile" className="stack">
        <CircleUserRound />
        <span className="max-w-[11ch] truncate sm:max-w-[18ch] md:max-w-[7ch] lg:max-w-[15ch]">{user.name}12198218291829182</span>
      </Link>
      <UserLogoutButton circle />
    </div>
  );
};
