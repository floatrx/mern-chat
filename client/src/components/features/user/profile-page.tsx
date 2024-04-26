import { useLazyCheckAuthQuery } from '@/api/auth';
import { useAppSelector } from '@/hooks/redux';
import { toast } from '@/hooks/use-toast';
import { selectAuth } from '@/store/auth';

import { Button } from '@/components/ui/button';

export const ProfilePage = () => {
  const auth = useAppSelector(selectAuth);
  const [checkSession] = useLazyCheckAuthQuery(); // just for testing

  const handleTest = async () => {
    try {
      await checkSession().unwrap();
      toast({ variant: 'success', title: 'Session is valid' });
    } catch (e) {
      console.log('failed', e);
      toast({ title: 'Unauthorized', variant: 'destructive' });
    }
  };

  return (
    <div className="prose dark:prose-invert">
      <h1>Profile Page</h1>
      <div className="font-mono my-2">{JSON.stringify(auth.user, null, 2)}</div>
      <div className="stack">
        <Button type="button" onClick={handleTest} variant="outline">
          Test session
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
