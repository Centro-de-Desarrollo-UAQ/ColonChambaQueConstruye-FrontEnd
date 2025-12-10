'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import EmployerSideBar from '@/components/sidebar/EmployerSideBar';
import Header from '@/components/ui/header';
import EmployerTab from '@/components/employer/EmployerTab';
import { apiService } from '@/services/api.service';


//Tipado de respuesta al endpont
type Company = {
  id: string;
  tradeName: string;
  legalName: string;
  zipCode: string;
  street: string;
  streetNumber: string;
  state: string;
  district: string;
  municipality: string;
  country: string;
  investmentCountry: string;
  totalWorkers: number;
  description: string;
  rfc: string;
  status: string;
  workSector: string;
  companyEmail: string;
  comment: string | null;
};

type CompanyAccount = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cellPhone: string;
  landlinePhone: string;
  jobTitle: string;
};

type ApiResponse = {
  statusCode: number;
  data: {
    Company: Company;
    CompanyAccount: CompanyAccount;
  };
};

type EmployerProfileContextType = {
  company: Company | null;
  companyAccount: CompanyAccount | null;
  loading: boolean;
  error: string | null;
};



const EmployerProfileContext =
  createContext<EmployerProfileContextType | undefined>(undefined);

export function useEmployerProfile() {
  const ctx = useContext(EmployerProfileContext);
  if (!ctx) {
    throw new Error(
      'useEmployerProfile debe usarse dentro de LayoutEmployerView',
    );
  }
  return ctx;
}



export default function LayoutEmployerView({children,}: Readonly<{ children: React.ReactNode }>) {

  const [company, setCompany] = useState<Company | null>(null);
  const [companyAccount, setCompanyAccount] =
    useState<CompanyAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        
        const companyId = localStorage.getItem('companyId');

        if (!companyId) {
          setError('No se encontró companyId en localStorage');
          setLoading(false);
          return;
        }

       
        const res = await apiService.get(`/companies/${companyId}`,);

        if (!res) {
          setError('No hubo respuesta del servidor');
          setLoading(false);
          return;
        }

        if (!res.ok) {
          setError(`Error ${res.status} al cargar la empresa`);
          setLoading(false);
          return;
        }

        const json = (await res.json()) as ApiResponse;

        setCompany(json.data.Company);
        setCompanyAccount(json.data.CompanyAccount);
        console.log(json)

      } catch (err) {
        console.error('Error cargando perfil de empresa', err);
        setError('No se pudo cargar la información de la empresa');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <EmployerProfileContext.Provider
      value={{ company, companyAccount, loading, error }}
    >
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-white shadow-sm">
          <Header showProfileButton={false} companyTitle={company?.tradeName || 'Empresa'}/>
        </header>

        {/* Main layout with padding for fixed header */}
        <main className="flex pt-16">
          {/* Sidebar */}
          <div className="shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
            <EmployerSideBar />
          </div>

          <div className="w-120 py-12 shrink-0">
            <EmployerTab />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto py-10 px-6">
            {children}
          </div>
        </main>
      </div>
    </EmployerProfileContext.Provider>
  );
}
