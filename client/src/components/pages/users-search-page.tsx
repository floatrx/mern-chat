import { CreateUserDialog } from '@/components/features/user/create-user-dialog';
import { UserList } from '@/components/features/user/user-list';

import { Heading } from '@/components/ui/heading';

export const UsersSearchPage = () => (
  <div>
    <Heading text="Users" actions={<CreateUserDialog />} />
    <UserList />
  </div>
);

export default UsersSearchPage;
