'use client';

import { useMemo, useState } from 'react';
import TitleSectionIconLeft from '@/components/common/TitleSection IconLeft';

import ApplicantCompanyCard from '@/components/applicant/applicatCompanyCard';
import { ApplicantCompanyCardProps } from '@/interfaces/applicantCompanyCard';
import SearchBar from '@/components/toreview/searchbar';
import FormOptions from '@/components/forms/FormOptions';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { Industry, INDUSTRY_OPTIONS } from '@/interfaces/industries';
import FormRegisterDate from '@/components/forms/FormDate';
import UserLinkerVacanciesCard from '@/components/linker/UserLinkerCardvacancies';
import { JobCardProps } from '@/interfaces/jobCard';
import TableSearchBar from '@/components/ui/TableSerchBar';
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { filterType } from '@/interfaces/table';
import { filtersVacancies } from '@/data/filtersVacancies';
import { FileRemove } from '@solar-icons/react';

type Filters = {
  modality: string;
  workdayType: string;
  state: string;
  industry?: Industry | ''
  registerDate?:string
};

const fakeData: JobCardProps[] = [
  {
    title: 'Frontend Developer (React/Next.js)',
    company: 'Deloitte',
    location: 'Querétaro, Qro.',
    description:
      'Desarrolla interfaces modernas con Next.js, Tailwind CSS y buenas prácticas de accesibilidad. Colabora en proyectos de alto impacto.',
    schedule: 'Tiempo completo',
    modality: 'Híbrido',
    salaryRange: '$28,000 - $38,000 MXN',
    logoUrl: './../../public/Deloitte.svg',
    createdAt: '2025-09-23',
    sector: 'Tecnología',
  },
  {
    title: 'Backend Engineer (Node.js/Go)',
    company: 'Google',
    location: 'Ciudad de México, CDMX',
    description:
      'Diseña e implementa APIs escalables y microservicios robustos utilizando Node.js y Go. Mantén y optimiza bases de datos NoSQL.',
    schedule: 'Tiempo completo',
    modality: 'Remoto',
    salaryRange: '$40,000 - $60,000 MXN',
    logoUrl: '/Google.svg',
    createdAt: '2025-09-20',
    sector: 'Tecnología',
  },
  {
    title: 'Data Scientist Junior',
    company: 'BBVA',
    location: 'Monterrey, N.L.',
    description:
      'Analiza grandes volúmenes de datos financieros. Crea modelos predictivos utilizando Python y librerías de Machine Learning como Scikit-learn.',
    schedule: 'Medio tiempo',
    modality: 'Presencial',
    salaryRange: '$15,000 - $25,000 MXN',
    logoUrl: '/BBVA.svg',
    createdAt: '2025-09-18',
    sector: 'Finanzas',
  },
  {
    title: 'UX/UI Designer Senior',
    company: 'Mercado Libre',
    location: 'Guadalajara, Jal.',
    description:
      'Lidera el diseño de experiencia de usuario para nuevos productos. Realiza investigaciones, prototipos de alta fidelidad y pruebas de usabilidad.',
    schedule: 'Tiempo completo',
    modality: 'Híbrido',
    salaryRange: '$35,000 - $50,000 MXN',
    logoUrl: '/MercadoLibre.svg',
    createdAt: '2025-09-15',
    sector: 'Marketing',
  },
];

export default function VacanciesGestorPage() {

  const sectionConfig = {
    talents: {
      title: 'BUSQUEDA DE VACANTES',
      description: '',
    },
  };



  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-3 mb-10">
        <div className="w-8/12 pt-5 text-lg">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig} />
        </div>
        <div className='w-8/12'>
          <UniversalCardsFilter<JobCardProps>
            items={fakeData}
            filters={filtersVacancies}
            // accesors para que UniversalCardsFilter sepa cómo leer cada campo
            accessors={{
              name: (j) =>
                `${j.title} ${j.company} ${j.sector} ${j.modality} ${j.schedule} ${j.description} ${j.location} ${j.createdAt}`,
              sector: (j) => j.sector,
              modality: (j) => j.modality,
              schedule: (j) => j.schedule,
              createdAt: (j) => j.createdAt,
            }}
            render={(filtered) => (
              <div className="space-y-4">
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
