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
  };
}

export default function JobsPage() {
  // 1. LÓGICA DE DATOS
  const { token, id: userId } = useApplicantStore();
  const [vacancies, setVacancies] = useState<JobCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper para formatear textos
  const formatEnum = (text: string) => {
    if (!text) return '';
    return text.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  };

  // Petición a la API
  useEffect(() => {
    const fetchVacancies = async () => {
      if (!token || !userId) {
        setIsLoading(false);
        return;
      }

      
      try {
        const response = await fetch(`/api/v1/users/${userId}/vacancies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

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
            logoUrl: '', //AQui debe de estar el Avatar
            sector: '', 
            createdAt: item.Vacancy.createdAt
          }));

          setVacancies(mappedVacancies);
        } else {
            setVacancies([]);
        }

      } catch (error) {
        console.error("Error fetching vacancies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [token, userId]);

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
          {isLoading ? (
             <div className="py-10 text-center text-zinc-400 animate-pulse">
               Cargando vacantes...
             </div>
          ) : (
            <UniversalCardsFilter<JobCardProps>
              items={vacancies} 
              filters={filtersVacanciesUser}
              accessors={{
                name: (j) =>
                  `${j.title} ${j.company} ${j.modality} ${j.schedule} ${j.description} ${j.location}`,
                sector: (j) => j.sector || '',
                modality: (j) => j.modality,
                workShift: (j) => j.schedule,
                createdAt: (j) => j.createdAt || '',
              }}
              render={(filtered) => (
                <div className="space-y-4 w-full">
                  {!filtered.length && (
                    <div className="flex flex-col items-center justify-center gap-4 m-10 text-gray-300 font-bold text-center">
                      <FileRemove className="w-20 h-20 text-gray-300" />
                      <div>
                        <h1>NO SE ENCONTRARON RESULTADOS PARA TU BÚSQUEDA</h1>
                        <h2 className="text-sm font-normal mt-2">INTENTA CON OTRAS PALABRAS CLAVE O REVISA SI HAY ERRORES DE ESCRITURA</h2>
                      </div>
                    </div>
                  )}
                  {filtered.map((job) => (
                    // Aseguramos que el componente card también sepa que puede crecer
                    <div key={job.id ? `${job.id}` : `${job.title}-${job.company}`} className="w-full">
                        <DrawerApplicantVacant job={job} />
                    </div>
                  ))}
                </div>
              )}
              multiMode='OR'
            />
          )}
        </div>
      </div>
    </>
  );
}