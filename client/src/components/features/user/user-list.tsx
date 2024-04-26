import { useSearchUsersQuery } from '@/api/users';
import { DataRenderer } from '@/components/hoc/data-renderer';

import { UserCardItem } from '@/components/features/user/user-card-item';

export const UserList = () => (
  <DataRenderer className="grid-auto" {...useSearchUsersQuery()} render={(user) => <UserCardItem key={user.id} user={user} />} />
);
