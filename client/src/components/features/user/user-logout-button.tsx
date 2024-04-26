import { LogOut } from 'lucide-react';

import { useAppDispatch } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { logout } from '@/store/auth';

import { Button } from '@/components/ui/button';

interface IProps {
  circle?: boolean;
  className?: string;
}

export const UserLogoutButton = ({ circle, className }: IProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button
      onClick={handleLogout}
      className={cn('flex gap-2', className)}
      variant={circle ? 'ghost' : 'default'}
      size={circle ? 'icon' : 'default'}
    >
      {circle ? '' : 'Logout'} <LogOut className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};
