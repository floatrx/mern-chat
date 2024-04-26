import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

import type { IUser } from '@/types/user';

export const UserCardItem = ({ user }: { user: IUser }) => (
  <Card>
    <CardHeader>
      <div className="flex gap-2">
        <span className="font-medium">{user?.name}</span>
        <span className="flex-1" />
      </div>
      <CardDescription>{user?.email}</CardDescription>
    </CardHeader>
    <CardContent>
      <CardDescription>{user.id}</CardDescription>
    </CardContent>
  </Card>
);
