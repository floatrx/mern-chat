import { Heading } from '@/components/ui/heading';
import { CreateUserDialog } from '@/components/features/user/create-user-dialog';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';
import { UserList } from '@/components/features/user/user-list';

export const UsersSearch = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className="flex flex-col space-y-4">
      <Heading text="Register" actions={<CreateUserDialog />} />
      {isLoggedIn && <UserList />}
    </div>
  );
};

export default UsersSearch;
