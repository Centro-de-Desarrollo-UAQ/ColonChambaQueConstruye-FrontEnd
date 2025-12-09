'use client';

import React, { useEffect, useState } from 'react';
import ApplicantCard from '../../../../components/linker/ApplicantCard';
import { FileRemove, UsersGroupTwoRounded } from '@solar-icons/react';
import TitleSection from '@/components/common/TitleSection';
import { apiService } from '@/services/api.service';
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { filtersApplicant } from '@/data/filtersApplicants';
import { CompanyUser } from '@/interfaces/user';
import { useCompanyStore } from '@/app/store/authCompanyStore';

const sectionConfig = {
  talents: {
    icon: <UsersGroupTwoRounded size={24} weight="Bold" className="justify-self-end" />,
    title: 'CARTERA DE USUARIOS',
    description: '',
  },
};


const mapApiUserToCompanyUser = (entry: any): CompanyUser => {
  const raw = entry?.user ?? entry?.profile ?? entry?.User ?? entry ?? {};

  const fallbackId =
    raw?.id ??
    entry?.id ??
    raw?.userId ??
    entry?.userId ??
    raw?.linkerId ??
    entry?.linkerId;

  const pickString = (...keys: string[]): string => {
    for (const key of keys) {
      if (raw?.[key]?.toString) return String(raw[key]);
      if (entry?.[key]?.toString) return String(entry[key]);
    }
    return '';
  };


  return {
    id: fallbackId,
    firstName: pickString('firstName'),
    lastName: pickString('lastName'),
    email: pickString('email'),
    cellPhone: pickString('cellPhone'),
    academicLevel: pickString('academicLevel'),
    dateFilter: pickString('reviewedAt'),
    jobExperience: pickString('jobExperience'),
    curriculumURL: pickString('curriculumUrl'),
  };
};


export default function UserLists() {
  const { token, companyId } = useCompanyStore();
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    //  estado para buscar y filtros backend
    const [search, setSearch] = useState('');
    const [backendFilters, setBackendFilters] = useState<Record<string, any>>({});
  
    // handlers que se pasan al DataTableCustomSearchBar
    const handleSearchChange = (value: string) => {
      setSearch(value);
    };
  
    const handleFilterChange = (columnId: string, value: any) => {
      setBackendFilters((prev) => ({
        ...prev,
        [columnId]: value,
      }));
    };
  
    useEffect(() => {
      const fetchVacancies = async () => {
        if (!token || !companyId) {
          console.warn('No hay token o companyId, no se hace fetch');
          setIsLoading(false);
          return;
        }
  
        try {
          const params = new URLSearchParams();
  
          if (search) {
            params.append('search', search);
          }
  
          Object.entries(backendFilters).forEach(([key, value]) => {
            if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return;
  
            if (key === 'reviewedAt' || key === 'dateFilter') {
              let date: Date | null = null;
  
              if (value instanceof Date) {
                date = value;
              } else if (typeof value === 'string') {
                date = new Date(value);
              }
  
              if (!date || isNaN(date.getTime())) {
                return;
              }
  
              const formatted = date.toISOString().split('T')[0]; 
  
              const formattedDateOnly = new Date(formatted);
              formattedDateOnly.setHours(0,0,0,0);
  
      
              const today = new Date();
              today.setHours(0,0,0,0);
              const dateOnly = new Date(date);
              dateOnly.setHours(0,0,0,0);
  
              if (dateOnly > today) {
                return;
              }
  
              params.append('dateFilter', formatted );
              return;
            }
  
            if (Array.isArray(value)) {
              const cleaned = value.map((v) => String(v));
              if (cleaned.length === 0) return;
              params.append(key, cleaned.join(','));
            } else {
              params.append(key, String(value));
            }
          });
  
  
  
          const qs = params.toString();
          const url = qs
            ? `/companies/${companyId}/users?${qs}`
            : `/companies/${companyId}/users`;
  
          const response = await apiService.get(url);
  
          if (!response?.ok) {
            setIsLoading(false);
            return;
          }
  
          const result = await response.json();
          console.log('Respuesta API completa:', result);
  
          const cardUsers =
            Array.isArray(result?.data?.companyUsers)
              ? result.data.companyUsers
              : Array.isArray(result?.data)
              ? result.data
              : Array.isArray(result)
              ? result
              : [];
  
          if (Array.isArray(cardUsers) && cardUsers.length > 0) {
            const mapped = cardUsers.map(mapApiUserToCompanyUser);

            setCompanyUsers(mapped);
          } else {
            setCompanyUsers([]);
          }
        } catch (error) {
          setCompanyUsers([]);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchVacancies();
    }, [token, companyId, search, backendFilters]);

  return (
    <main className="mt-15 flex flex-col items-center">
      <div className="flex w-10/12 flex-col">
        <TitleSection sections={sectionConfig} currentSection="talents" />

        <UniversalCardsFilter<any>
          items={companyUsers}
          filters={filtersApplicant}
          searchValue={search}
          onSearchChange={handleSearchChange}
          activeFilters={backendFilters}
          onFilterChange={handleFilterChange}
          accessors={{
            name: (u) => `${u.firstName} ${u.lastName} ${u.jobExperience} ${u.careerSummary ?? ''}`,
            academicLevel: (u) => u.academicLevel,
            dateFilter: (u) => u.dateFilter,
            state: (u) => u.status,
          }}
          render={(filtered) => (
            <div className="space-y-4">
              {isLoading && (
                <p className="text-center text-sm text-gray-500">Cargando usuarios...</p>
              )}

              {!isLoading && !filtered.length && (
                <div className="m-10 flex flex-col items-center justify-center gap-4 font-bold text-gray-300">
                  <FileRemove className="h-12 w-12 text-gray-300" />
                  <h1>NO SE ENCONTRARON RESULTADOS PARA TU BÚSQUEDA</h1>
                  <h1>INTENTA CON OTRAS PALABRAS CLAVE O REVISA SI HAY ERRORES DE ESCRITURA</h1>
                </div>
              )}

              {!isLoading &&
                filtered.map((user, index) => (
                  <ApplicantCard
                    key={`${user.id ?? user.email ?? 'user'}-${index}`}
                    user={user}
                  />
                ))}
            </div>
          )}
          multiMode="OR"
        />
      </div>
    </main>
  );
}