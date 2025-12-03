'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompanyStore } from '../store/authCompanyStore';



interface EmployerLayoutProps {
  children: React.ReactNode;
}

export default function EmployerLayout({ children }: EmployerLayoutProps) {
  const router = useRouter();
  

  const { token, initialize } = useCompanyStore();
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    initialize(); 
    
    setIsInitialized(true);
  }, [initialize]);

  useEffect(() => {
    
    if (isInitialized) {
      if (!token) {
       
        router.push('/login/company'); 
      }
      setIsLoading(false);
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