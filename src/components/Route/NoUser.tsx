'use client';

// modules
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux';


const NoUserOnly = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const currentUser = useAppSelector(state => state?.userStore?.currentUser);

  useEffect(() => {
    if (currentUser?._id) {
      router.replace('/dashboard');
    }
  }, [currentUser?._id, router]);

  if (currentUser?._id) return null;

  return <>{children}</>;
};

export default NoUserOnly;
