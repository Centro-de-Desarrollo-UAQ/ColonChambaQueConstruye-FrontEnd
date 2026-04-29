'use client';

import React, { useEffect, useState } from 'react';
import { FileRemove, InboxIn } from '@solar-icons/react';

import UserLinkerVacanciesCard from '@/components/linker/UserLinkerCardvacancies';
import PaginationControl from '@/components/navigation/paginationControl';
import TitleSection from '@/components/common/TitleSection';
import { LinkerSearch } from '@/components/linker/LinkerSearch';
import { useSearchParams } from 'next/navigation';

import { filtersLinkerVacancies } from '@/components/linker/LinkerTabs';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { apiService } from '@/services/api.service';

import { 
  JobCardProps, 
  BackendVacancyResponse, 
  mapBackendVacancyToJobCard
} from '@/interfaces/jobCard';

export default function VacanciesRejectedPage() {
  const { id: linkerId } = useApplicantStore();
  const searchParams = useSearchParams();
  const [vacancies, setVacancies] = useState<JobCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [totalItems, setTotalItems] = useState(0); 

  const sectionConfig = {
    talents: {
      title: 'SOLICITUDES DE VACANTES RECHAZADAS', 
      icon: <FileRemove size={24} weight="Bold" className="text-uaq-brand" />, 
      description: '',
    },
  };

  useEffect(() => {
    const fetchVacancies = async () => {
      if (!linkerId) return;

      setLoading(true);
      try {
        const offset = (currentPage - 1) * pageSize;

        const queryParams = new URLSearchParams({
          status: 'RECHAZADA', 
          limit: pageSize.toString(),
        });

        if (offset > 0) {
          queryParams.append('offset', offset.toString());
        }

        const search = searchParams.get('search');
        if (search) queryParams.append('search', search);

        const sector = searchParams.get('sector');
        if (sector) queryParams.append('sector', sector);

        const workShift = searchParams.get('workShift');
        if (workShift) queryParams.append('workShift', workShift);

        const dateFilter = searchParams.get('dateFilter');
        if (dateFilter) queryParams.append('dateFilter', dateFilter);

        const url = `/linkers/${linkerId}/vacancies?${queryParams.toString()}`;
        console.log("Fetching Rejected Page:", currentPage, "URL:", url);

        const response = await apiService.get(url);
        const result: BackendVacancyResponse = await response.json();

        if (result.data && Array.isArray(result.data.vacancies)) {
          const serverVacancies = result.data.vacancies;
          
          setTotalItems(result.data.total || 0);

          const mappedVacancies: JobCardProps[] = serverVacancies.map(mapBackendVacancyToJobCard);

          setVacancies(mappedVacancies);
        } else {
          setVacancies([]);
          setTotalItems(0);
        }

      } catch (error) {
        console.error("Error fetching rejected vacancies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [linkerId, currentPage, pageSize, searchParams]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="mx-32 flex flex-col gap-5 m-10">
      <div>
        <TitleSection sections={sectionConfig} currentSection={'talents'} />
      </div>

      <div className={`space-y-4 transition-opacity duration-300 ${loading ? 'opacity-60' : 'opacity-100'}`}>
        <LinkerSearch filters={filtersLinkerVacancies} />
        <div className="space-y-4">
          
          {!vacancies.length && !loading ? (
            <div className="flex flex-col items-center justify-center gap-4 m-10 text-gray-300 font-bold">
              <FileRemove className="w-20 h-20 text-gray-300" />
              <div className="text-center">
                <h1>NO SE ENCONTRARON VACANTES RECHAZADAS</h1>
                <h2 className="text-sm font-normal mt-2">INTENTA CON OTRAS PALABRAS CLAVE</h2>
              </div>
            </div>
          ) : (
            vacancies.map((job) => (
              <UserLinkerVacanciesCard 
                key={job.id} 
                job={job} 
                company={job.company}
                logoUrl={job.logoUrl}
              />
            ))
          )}

          {vacancies.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
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