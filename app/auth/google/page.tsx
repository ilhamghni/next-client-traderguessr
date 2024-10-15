'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import useSocialAuth from '@/hooks/use-social-auth';
import { Spinner } from '@/components/common';
import { Suspense } from 'react';

// Wrapper component to handle Suspense
const GoogleAuthPageWrapper = () => {
  return (
    <div className="my-8">
      <Suspense fallback={<div>Loading...</div>}>
        <GoogleAuthPage />
      </Suspense>
    </div>
  );
};

const GoogleAuthPage = () => {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, 'google-oauth2');
	
  return (
    <div className="my-8">
      <Spinner lg />
    </div>
  );
};

export default GoogleAuthPageWrapper;
