'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApplicantStore } from '../store/authApplicantStore'; 

interface ApplicantLayoutProps {
  children: React.ReactNode;
}

export default function ApplicantLayout({ children }: ApplicantLayoutProps) {
  const router = useRouter();
  const token = useApplicantStore((state) => state.token);
  const [isInitialized, setIsInitialized] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    setIsInitialized(true);
    
  }, []);

  useEffect(() => {
    if (isInitialized) {
      if (!token) {
        router.push('/login?redirect=/applicant/jobs'); 
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [token, isInitialized, router]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen text-lg text-gray-600'>
        Cargando. Verificando sesión...
      </div>
    );
  }

  if (token) {
      return <>{children}</>;
  }

  return null; 
}