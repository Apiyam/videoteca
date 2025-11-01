import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

const RedirectionInDashboard = () => {
  const router = useRouter();
  const {user} = useUser();

  useEffect(() => {
    if (user) {
      console.log(user);
      router.push('/escuela/videos-y-cursos');
    } else {
      router.push('/escuela/login');
    }
  }, [router, user]);

  return null;
};

export default RedirectionInDashboard;