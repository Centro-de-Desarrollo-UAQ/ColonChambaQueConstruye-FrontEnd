'use client';

import { useState, useEffect } from 'react';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { JobCardProps } from '@/interfaces';

// Componentes Visuales
import Header from '@/components/ui/header';
import TitleSectionIconLeft from '@/components/common/TitleSection IconLeft';
import DrawerApplicantVacant from '@/components/applicant/jobsCard';
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { CaseRound, MinimalisticMagnifer, FileRemove } from '@solar-icons/react';
import { filtersVacanciesUser } from '@/data/filtersVacancies';
import { X } from 'lucide-react';

// --- TIPOS API ---
interface ApiVacancy {
  Vacancy: {
    id: string;
    name: string;
    location: string;
    description: string;
    salary: { coin: string; min: number; max: number };
    workShift: string;
    modality: string;
    createdAt: string;
    status: string;
    companyStatus: string;
  };
  Company: {
    id: string;
    tradeName: string;
    legalName: string;
    cellPhone: string;
    email: string;
  };
}

interface FilterState {
  modality: string;
  workShift: string;
  sector: string;
  [key: string]: string;
}

export default function JobsPage() {
  const { token, id: userId } = useApplicantStore();
  const [vacancies, setVacancies] = useState<JobCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. ESTADO DE FILTROS
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    modality: '',
    workShift: '',
    sector: ''
  });

  const formatEnum = (text: string) => {
    if (!text) return '';
    return text.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  };

  // 2. ACTUALIZAR FILTROS
  const handleFilterUpdate = (key: string, value: string | null) => {
    setSelectedFilters(prev => ({
        ...prev,
        [key]: value || '' 
    }));
  };

  // 3. EFECTO DE BÚSQUEDA
  useEffect(() => {
    const fetchVacancies = async () => {
      if (!token || !userId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const params = new URLSearchParams();

        Object.entries(selectedFilters).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                params.append(key, value);
            }
        });

        const queryString = params.toString();
        const endpoint = `/api/v1/users/${userId}/vacancies?${queryString}`;

        console.log(`[API] Fetching: ${endpoint}`);

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // MANEJO DE 404: Si no hay resultados, limpiamos la lista y paramos la carga
        if (response.status === 404) {
            console.warn('[API] 404 recibido -> Lista vacía');
            setVacancies([]);
            setIsLoading(false); 
            return;
        }

        if (!response.ok) {
            throw new Error(`Error API: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.statusCode === 200 && Array.isArray(result.data?.vacancies)) {
          const mappedVacancies = result.data.vacancies.map((item: ApiVacancy) => ({
            id: item.Vacancy.id,
            title: item.Vacancy.name,
            company: item.Company.tradeName,
            location: item.Vacancy.location,
            description: item.Vacancy.description,
            schedule: formatEnum(item.Vacancy.workShift), 
            modality: formatEnum(item.Vacancy.modality),
            salaryRange: `$${item.Vacancy.salary.min.toLocaleString()} - $${item.Vacancy.salary.max.toLocaleString()} ${item.Vacancy.salary.coin}`,
            logoUrl: '', 
            sector: '', 
            createdAt: item.Vacancy.createdAt,
            cellPhone: item.Company.cellPhone,
            email: item.Company.email,
          }));

          setVacancies(mappedVacancies);
        } else {
            setVacancies([]);
        }

      } catch (error) {
        console.error("Error fetching vacancies:", error);
        setVacancies([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [token, userId, selectedFilters]);

  const sectionConfig = {
    talents: { icon: <CaseRound size={24} weight="Bold" />, title: 'Empleos sugeridos', description: '' },
  };
  const sectionConfig2 = {
    talents: { icon: <MinimalisticMagnifer weight="Bold" size={24} />, title: 'Busqueda de vacantes', description: '' },
  };

  return (
    <>
      <Header />

      <div className="flex w-full flex-col items-center justify-center gap-3">
        
        <div className="w-full max-w-7xl px-4 md:px-6 pt-5 text-lg text-orange-400">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig2} />
        </div>
        
        <div className="w-full max-w-7xl px-4 md:px-6 text-purple-800">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig} />
        </div>

        <div className='w-full max-w-7xl px-4 md:px-6 mb-10'>
          
          <UniversalCardsFilter<JobCardProps>
            items={vacancies} 
            filters={filtersVacanciesUser}
            onFilterChange={handleFilterUpdate} 
            activeFilters={selectedFilters} 
            accessors={{
              name: (j) => `${j.title} ${j.company}`,
              sector: (j) => j.sector || '',
              // AJUSTE CRÍTICO: Revertimos el formato bonito a formato ENUM (MAYUSCULAS_CON_GUION)
              // para que el filtro del cliente pueda validar correctamente contra los valores seleccionados.
              modality: (j) => j.modality ? j.modality.toUpperCase() : '',
              workShift: (j) => j.schedule ? j.schedule.toUpperCase().replace(/\s+/g, '_') : '',
              createdAt: (j) => j.createdAt || '',
            }}
            render={(filtered) => (
              <div className="space-y-4 w-full relative min-h-[200px]">
                
                {/* SPINNER SUPERPUESTO */}
                {isLoading && (
                   <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-start pt-10 backdrop-blur-[1px]">
                     <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                     <span className="mt-2 text-zinc-500 font-medium animate-pulse">Cargando resultados...</span>
                   </div>
                )}

                {/* MENSAJE DE VACÍO */}
                {!isLoading && !filtered.length && (
                  <div className="flex flex-col items-center justify-center gap-4 py-10 text-gray-300 font-bold text-center">
                    <FileRemove className="w-20 h-20 text-gray-300" />
                    <div>
                      <h1>NO SE ENCONTRARON RESULTADOS</h1>
                      <h2 className="text-sm font-normal mt-2">Intenta modificar tus filtros</h2>
                    </div>
                  </div>
                )}

                {/* LISTA DE VACANTES CON ESPACIADO */}
                <div className={`${isLoading ? 'opacity-30' : 'opacity-100 transition-opacity duration-300'} space-y-4`}>
                    {filtered.map((job) => (
                        <div key={job.id ? `${job.id}` : `${job.title}-${job.company}`} className="w-full">
                            <DrawerApplicantVacant job={job} />
                        </div>
                    ))}
                </div>

              </div>
            )}
            multiMode='OR'
          />
        </div>
      </div>
    </>
  );
}