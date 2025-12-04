'use client';

import DrawerApplicantVacant from '@/components/applicant/jobsCard';
// SearchBar intentionally omitted — this page only lists jobs and provides a basic search
import Header from '@/components/ui/header';
import { JobCardProps } from '@/interfaces';
import { useMemo, useState } from 'react';
import { CaseRound, FileRemove } from '@solar-icons/react';
import TitleSectionIconLeft from '@/components/common/TitleSection IconLeft';
import { MinimalisticMagnifer } from '@solar-icons/react';
// form helpers and states not required here
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { JobCardsData } from '@/app/linker/home/vacancies/rejected/page';
import { filtersVacancies, filtersVacanciesUser } from '@/data/filtersVacancies';
import UserLinkerVacanciesCard from '@/components/linker/UserLinkerCardvacancies';
import { Industry } from '@/interfaces/industries';

// Local filter/type definitions not required for this page


const normalize = (s = '') =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

export default function JobsPage() {

    

  const [searchTags, setSearchTags] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchTags([]);
      return;
    }

    const tags = trimmed
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    setSearchTags(tags);
  };

  const filteredJobs = useMemo(() => {
    if (!searchTags.length) return JobCardsData;

    const tagsNorm = searchTags.map(normalize);

    return JobCardsData.filter((job) => {
      const haystack = normalize(
        [job.title, job.company, job.location, job.description, job.modality, job.schedule]
          .filter(Boolean)
          .join(' '),
      );

      return tagsNorm.some((t) => haystack.includes(t));
    });
  }, [searchTags]);

  const sectionConfig = {
    talents: {
      icon: <CaseRound size={24} weight="Bold" />,
      title: 'Empleos sugeridos',
      description: '',
    },
  };

  const sectionConfig2 = {
    talents: {
      icon: <MinimalisticMagnifer weight="Bold" size={24} />,
      title: 'Busqueda de vacantes',
      description: '',
    },
  };



  return (
    <>
      <Header />

      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="w-8/12 pt-5 text-lg text-orange-400">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig2} />
        </div>
        <div className="w-8/12 text-purple-800">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig} />
        </div>
        <div className='w-8/12 mb-10'>
                  <UniversalCardsFilter<JobCardProps>
                    items={JobCardsData}
                    filters={filtersVacanciesUser}
                    // accesors para que UniversalCardsFilter sepa cómo leer cada campo
                    accessors={{
                      name: (j) =>
                        `${j.title} ${j.company} ${j.sector} ${j.modality} ${j.schedule} ${j.description} ${j.location} ${j.createdAt}`,
                      sector: (j) => j.sector,
                      modality: (j) => j.modality,
                      workShift: (j) => j.schedule,
                      createdAt: (j) => j.createdAt,
                    }}
                    render={(filtered) => (
                      <div className="space-y-4 w-full">
                        {!filtered.length &&
                        <>
                          <div className="flex flex-col items-center justify-center gap-4 m-10 text-gray-300 font-bold">
                            <FileRemove className="w-50 h-50 text-gray-300" />
                            <h1>NO SE ENCONTRARON RESULTADOS PARA TU BÚSQUEDA</h1>
                            <h1>INTENTA CON OTRAS PALABRAS CLAVE O REVISA SI HAY ERRORES DE ESCRITURA</h1>
                          </div>
                        </>
                        }
                        {filtered.map((job) => (
                          
                          <UserLinkerVacanciesCard key={job.title} job={job} company={job.company} />
                        ))}
                      </div>
                    )}
                    multiMode='OR'
                  />
                </div>
      </div>
    </>
  );
}
