'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FileRemove, InboxIn } from '@solar-icons/react';
import TitleSection from '@/components/common/TitleSection';
import { CompanyData } from '@/interfaces'; 
import CompanyLinkerCard from '@/components/linker/CompanyLinkerCard';
import { filtersLinkerCompanies } from '@/components/linker/LinkerTabs';
import PaginationControl from '@/components/navigation/paginationControl';
import { LinkerSearch } from '@/components/linker/LinkerSearch';
import { useSearchParams } from 'next/navigation';

import { useApplicantStore } from '@/app/store/authApplicantStore';
import { apiService } from '@/services/api.service';
import { toast } from 'sonner';

const sectionConfig = {
  talents: {
    title: 'SOLICITUDES DE EMPRESAS APROBADAS',
    icon: <InboxIn size={24} weight="Bold" className="text-uaq-brand" />,
    description: 'Empresas activas en la plataforma.',
  },
};

export default function CompaniesAprovedPage() {
  const { id: linkerId, token } = useApplicantStore();
  const searchParams = useSearchParams();

  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para la paginación controlada desde el servidor
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCompanies = useCallback(async () => {
    if (!linkerId || !token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const offset = (currentPage - 1) * pageSize;

      const queryParams = new URLSearchParams({
        status: 'ACTIVA',
        limit: pageSize.toString(),
        offset: offset.toString(),
      });

      const search = searchParams.get('search');
      if (search) queryParams.append('search', search);

      const workSector = searchParams.get('workSector');
      if (workSector) queryParams.append('workSector', workSector);

      const dateFilter = searchParams.get('dateFilter');
      if (dateFilter) queryParams.append('dateFilter', dateFilter);

      const endpoint = `/linkers/${linkerId}/companies?${queryParams.toString()}`;
      const response = await apiService.get(endpoint);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Fallo al obtener empresas`);
      }

      const result = await response.json();
      
      /**
       * Estructura esperada del backend:
       * result.data = {
       * companies: CompanyData[],
       * total: number
       * }
       */
      const backendList = result.data?.companies || [];
      const backendTotal = result.data?.total || 0;

      setTotalItems(backendTotal);
      setCompanies(backendList);

    } catch (error: any) {
      console.error("Error en fetchCompanies:", error);
      toast.error('No se pudieron cargar las empresas aprobadas.');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [linkerId, token, currentPage, pageSize, searchParams]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const totalPages = Math.ceil(totalItems / pageSize);

  // Pantalla de carga inicial
  if (loading && companies.length === 0) {
    return (
      <div className="mx-32 flex flex-col gap-5 m-10">
        <TitleSection sections={sectionConfig} currentSection={'talents'} />
        <div className="h-64 flex items-center justify-center text-zinc-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uaq-brand-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-32 flex flex-col gap-5 m-10">
      <TitleSection sections={sectionConfig} currentSection={'talents'} />

      <div className={`space-y-4 transition-opacity duration-300 ${loading ? 'opacity-60' : 'opacity-100'}`}>
        <LinkerSearch filters={filtersLinkerCompanies} />
        <div className="space-y-4">
          {!companies.length && !loading ? (
            <div className="flex flex-col items-center justify-center gap-4 m-10 text-gray-300 font-bold">
              <FileRemove className="w-20 h-20 text-gray-300" />
              <div className="text-center">
                <h1 className="uppercase">No se encontraron empresas activas</h1>
                <h2 className="text-sm font-normal mt-2">Intenta con otras palabras clave</h2>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {companies.map((companyData) => (
                <CompanyLinkerCard 
                  key={companyData.Company.id} 
                  company={companyData} 
                  sideDrawer="right" 
                />
              ))}
            </div>
          )}

          {/* Componente de Paginación */}
          {totalItems > 0 && (
            <div className="border-t pt-4 mt-6">
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages || 1}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                pageSizeOptions={[10, 20, 30, 40, 50]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}