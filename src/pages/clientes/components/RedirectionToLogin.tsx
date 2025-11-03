import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';

const RedirectionInDashboard = () => {
  const router = useRouter();
  const {user} = useUser();

  useEffect(() => {
    if (user) {
      console.log(user);
      router.push('/clientes/whatsapp');
    } else {
      router.push('/clientes/login');
    }
  }, [router, user]);

  return null;
};

export default RedirectionInDashboard;