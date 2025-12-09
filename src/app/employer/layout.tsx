'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompanyStore } from '../store/authCompanyStore';
import { apiService } from '@/services/api.service';



interface EmployerLayoutProps {
  children: React.ReactNode;
}

type CompanyApiResponse = {
  statusCode: number;
  data: {
    Company: {
      tradeName: string;
      legalName: string;
    };
  };
};

export default function EmployerLayout({ children }: EmployerLayoutProps) {
  const router = useRouter();
  

  const { token, initialize } = useCompanyStore();
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setCompanyName = useCompanyStore((s) => s.setCompanyName);

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

  
    useEffect(() => {
    if (!token) return; // solo si ya hay sesión

    const companyId = localStorage.getItem('companyId');
    if (!companyId) {
      console.warn('No se encontró companyId en localStorage');
      return;
    }

    //fetch al api para obtener nombre de empresa
    const fetchCompanyName = async () => {
      try {
        const res = await apiService.get(`/companies/${companyId}`);
        if (!res || !res.ok) {
          console.warn('No se pudo cargar la empresa para header');
          return;
        }

        const json = (await res.json()) as CompanyApiResponse;
        const name =
          json.data.Company.tradeName ||
          json.data.Company.legalName ||
          'Empresa';

        console.log('EmployerLayout -> guardando en store:', name);
        setCompanyName(name);
      } catch (err) {
        console.error('Error cargando companyName en EmployerLayout', err);
      }
    };

    fetchCompanyName();
  }, [token, setCompanyName])

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