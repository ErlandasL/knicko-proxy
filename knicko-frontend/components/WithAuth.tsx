import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const WithAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const router = typeof window !== 'undefined' ? useRouter() : null;

    useEffect(() => {
      if (!router) return;

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default WithAuth;