import type { IUser } from '@/types/user';

export const UserInfo = ({ user }: { user: IUser | null }) => <span className="font-bold">{!user ? 'Guest' : user.name}</span>;
