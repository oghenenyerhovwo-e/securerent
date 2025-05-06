// src/components/IdentifyUserSync.tsx
'use client';

import { useEffect } from 'react';
import { 
    useIdentifyUserQuery,
    setCurrentUser, 
    clearCurrentUser,
    useAppDispatch,
} from '@/redux';

const IdentifyUserSync = () => {
  const dispatch = useAppDispatch();

  const {
    data,
    isSuccess,
    isError,
  } = useIdentifyUserQuery(undefined);

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setCurrentUser(data?.user));
    }
    if (isError) {
      dispatch(clearCurrentUser());
    }
  }, [isSuccess, isError, data?.user, dispatch]);

  return null; // No UI
};

export default IdentifyUserSync;
