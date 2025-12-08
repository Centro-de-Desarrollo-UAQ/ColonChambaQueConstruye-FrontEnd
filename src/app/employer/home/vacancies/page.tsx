'use client';

import { JSX, useEffect, useState } from 'react';

import TitleSection from '@/components/common/TitleSection';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { vacanciesColumns } from '@/components/tables/schemas/Vacancies';
import { Button } from '@/components/ui/button';
import { CaseRound } from '@solar-icons/react';
import AlertCard from '@/components/common/Alert';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { filtersVacancies } from '@/data/filtersVacancies';
import NoteRemove from '@/components/common/hugeIcons';
import { useCompanyStore } from '@/app/store/authCompanyStore';
import { apiService } from '@/services/api.service';

const sectionConfig = {
  profile: {
    icon: <CaseRound size={24} weight="Bold" />,
    title: 'MIS VACANTES',
    description: '',
  },
};

export interface VacancyRow {
  id: string;
  name: string; 
  description: string;
  location: string;
  modality: string;
  workShift: string;
  company: string;
  logoUrl: string;
  numberOpenings: number;
  salaryRange: string;
  status: string;
  dateFilter: string;
}


const mapCompanyStatus = (raw: any): 'APROBADA' | 'REVISION' | 'RECHAZADA' => {
  if (!raw) return 'APROBADA';
  const s = String(raw).toLowerCase();
  if (s.includes('reject') || s.includes('rechaz')) return 'RECHAZADA';
  if (s.includes('review') || s.includes('pending') || s.includes('revision') || s.includes('pendiente')) {
    return 'REVISION';
  }
  return 'APROBADA';
};

const VacanciesContent = ({
  hasData,
  accountStatus,
  vacancies,
  onSearchChange,
  onFilterChange,
}: {
  hasData: boolean;
  accountStatus: 'APROBADA' | 'REVISION' | 'RECHAZADA';
  vacancies: VacancyRow[];
  onSearchChange?: (value: string) => void;
  onFilterChange?: (columnId: string, value: any) => void;
}) => {
  const commonEmptyState = (
    <div className="flex w-full flex-col mt-20 items-center justify-center text-center">
      <EmptyDisplay
        icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
        firstLine="Todavía no has publicado alguna vacante."
        secondline="Utiliza las opciones de la barra de navegación lateral para crear una o da clic en el siguiente botón para generar una nueva vacante."
      />
    </div>
  );

  const statusComponents: Record<string, JSX.Element> = {
    APROBADA: hasData ? (
      <div>
        <DataTableCustomSearchBar
          columns={vacanciesColumns}
          data={vacancies}
          filters={filtersVacancies}
          onSearchChange={onSearchChange}
          onFilterChange={onFilterChange}
        />
      </div>
    ) : (
      <div className="flex w-full flex-col items-center justify-center text-center">
        {commonEmptyState}
        <Button className="mt-5" variant="primary" color="gray">
          <a href="/employer/home/post">Crear Vacante</a>
        </Button>
      </div>
    ),
    REVISION: (
      <>
        {commonEmptyState}
        <div className="flex w-full flex-col items-center justify-center text-center">
          <Button className="mt-5" variant="primary" color="gray">
            Crear Vacante
          </Button>
        </div>
        <AlertCard
          title={'Tu cuenta aún no está verificada'}
          content={'Una vez que se haya verificado la veracidad de la empresa, podrás empezar a publicar vacantes'}
        />
      </>
    ),
    
  };

  return statusComponents[accountStatus] || null;
};

export default function VacanciesPage() {
  const { token, companyId, status } = useCompanyStore();

  const [vacancies, setVacancies] = useState<VacancyRow[]>([]);
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

          if (key === 'createdAt' || key === 'dateFilter') {
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
          ? `/companies/${companyId}/vacancies?${qs}`
          : `/companies/${companyId}/vacancies`;

        const response = await apiService.get(url);

        if (!response?.ok) {
          setIsLoading(false);
          return;
        }

        const result = await response.json();
        console.log('Respuesta API completa:', result);

        const rawVacancies =
          Array.isArray(result?.data?.vacancies)
            ? result.data.vacancies
            : Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result)
            ? result
            : [];

        if (Array.isArray(rawVacancies) && rawVacancies.length > 0) {
          const mapped: VacancyRow[] = rawVacancies.map((item: any) => ({
            id: item.id,
            name: item.name ?? item.title ?? '',
            company: item.company?.name ?? item.company ?? 'Empresa',
            location: item.location ?? '',
            description: item.description ?? '',
            workShift: item.workShift ?? item.schedule ?? '',
            modality: item.modality ?? '',
            salaryRange:
              item.salary && typeof item.salary === 'object'
                ? `$${Number(item.salary.min).toLocaleString()} - $${Number(item.salary.max).toLocaleString()} MXN`
                : item.salaryRange ?? '',
            logoUrl: item.company?.logoUrl ?? item.logoUrl ?? '/default-company-logo.svg',
            status: item.status,
            numberOpenings: item.numberOpenings ?? item.numberOpenings,
            dateFilter: item.createdAt,
          }));

          setVacancies(mapped);
        } else {
          setVacancies([]);
        }
      } catch (error) {
        setVacancies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [token, companyId, search, backendFilters]);

  const hasData = vacancies.length > 0;
  const mappedStatus = mapCompanyStatus(status);

  return (
    <div className="mx-32 my-16 flex flex-col gap-5">
      <div>
        <TitleSection sections={sectionConfig} currentSection={'profile'} />
      </div>

      {isLoading ? (
        <div className="py-8 text-center">Cargando vacantes...</div>
      ) : (
        <VacanciesContent
          hasData={hasData}
          accountStatus={mappedStatus}
          vacancies={vacancies}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
}
