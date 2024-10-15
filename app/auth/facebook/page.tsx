'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import useSocialAuth from '@/hooks/use-social-auth';
import { Spinner } from '@/components/common';
import { Suspense } from 'react';

// Wrapper component to handle Suspense
const FacebookAuthPageWrapper = () => {
  return (
    <div className="my-8">
      <Suspense fallback={<div>Loading...</div>}>
        <FacebookAuthPage />
      </Suspense>
    </div>
  );
};

const FacebookAuthPage = () => {
  const [facebookAuthenticate] = useSocialAuthenticateMutation();

  useSocialAuth(facebookAuthenticate, 'facebook');

  return (
    <div className="my-8">
      <Spinner lg />
    </div>
  );
};

export default FacebookAuthPageWrapper;
