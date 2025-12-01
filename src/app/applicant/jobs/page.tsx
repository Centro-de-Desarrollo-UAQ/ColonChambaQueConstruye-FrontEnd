'use client';

import { useMemo, useState, useEffect } from 'react';
import { useForm, FormProvider, Form } from 'react-hook-form';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { JobCardProps } from '@/interfaces';
import DrawerApplicantVacant from '@/components/applicant/jobsCard';
import SearchBar from '@/components/common/SearchBar';
import Header from '@/components/ui/header';
import TitleSectionIconLeft from '@/components/common/TitleSection IconLeft';
import FormOptions from '@/components/forms/FormOptions';
import { CaseRound, MinimalisticMagnifer } from '@solar-icons/react';
import { states } from '@/constants';

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

interface Filters {
  modality: string;
  workdayType: string;
  state: string;
}

const normalize = (s = '') =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

export default function JobsPage() {
  const { token, id: userId } = useApplicantStore();
  const [vacancies, setVacancies] = useState<JobCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const methods = useForm<Filters>({
    defaultValues: { modality: '', workdayType: '', state: '' },
  });
  const { control } = methods;
  useEffect(() => {
    const fetchVacancies = async () => {
      if (!token || !userId) {
        setIsLoading(false);
        return;
      }

      console.log(`🚀 Iniciando petición para UserID: ${userId}`); 
      
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
            logoUrl: '/default-company-logo.svg',
          }));

          setVacancies(mappedVacancies);
        } else {
            setVacancies([]);
        }

      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancies();
  }, [token, userId]);

  const formatEnum = (text: string) => {
    if (!text) return '';
    return text.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
  };

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchTags([]);
      return;
    }
    const tags = trimmed.split(/[,\s]+/).map((t) => t.trim()).filter(Boolean);
    setSearchTags(tags);
  };
  const filteredJobs = useMemo(() => {
    const dataToFilter = vacancies; 
    if (!searchTags.length) return dataToFilter;

    const tagsNorm = searchTags.map(normalize);

    return dataToFilter.filter((job) => {
      const haystack = normalize(
        [job.title, job.company, job.location, job.description, job.modality, job.schedule]
          .filter(Boolean)
          .join(' '),
      );
      return tagsNorm.some((t) => haystack.includes(t));
    });
  }, [searchTags, vacancies]);

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
        <div className="w-8/12 pt-5 text-lg text-orange-400">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig2} />
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder="Escribe palabras clave (ej. React, remoto, Querétaro, UX)"
        />

        <div className="w-8/12 mt-3 mb-3">
          <FormProvider {...methods}>
            <Form className="flex gap-3">
              <FormOptions
                control={control}
                name="modality"
                type="select"
                placeholder="Modalidad"
                options={[
                  { value: 'presencial', label: 'Presencial' },
                  { value: 'hibrido', label: 'Híbrido' },
                  { value: 'remoto', label: 'Remoto' },
                ]}
                className="!text-brand border-brand bg-uaq-white-ghost rounded-full font-medium"
              />
              <FormOptions
                control={control}
                name="workdayType"
                type="select"
                placeholder="Tipo de Jornada"
                options={[
                  { value: 'completa', label: 'Tiempo completo' },
                  { value: 'media', label: 'Medio tiempo' },
                  { value: 'flexible', label: 'Flexible' },
                ]}
                className="!text-brand border-brand bg-uaq-white-ghost rounded-full font-medium"
              />
              <FormOptions
                control={control}
                name="state"
                type="combobox"
                placeholder="Estado"
                options={states}
                color="brand"
              />
            </Form>
          </FormProvider>
        </div>

        <div className="w-8/12 text-purple-800">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig} />
        </div>

        {isLoading && (
          <div className="py-10 text-center text-zinc-400 animate-pulse">
            Cargando vacantes...
          </div>
        )}

        {!isLoading && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
           
            <DrawerApplicantVacant key={job.title + job.company} job={job} />
          ))
        ) : !isLoading ? (
          <div className="py-10 text-center text-zinc-400">
            <p className="font-medium">No se encontraron vacantes.</p>
            {vacancies.length === 0 && <p className="text-sm text-red-400 mt-2">(Debug: La API retornó 0 elementos)</p>}
          </div>
        ) : null}
      </div>
    </>
  );
}