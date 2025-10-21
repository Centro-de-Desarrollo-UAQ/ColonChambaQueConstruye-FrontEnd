'use client';

import DrawerApplicantVacant from '@/components/applicant/jobsCard';
import SearchBar from '@/components/common/SearchBar';
import Header from '@/components/ui/header';
import { JobCardProps } from '@/interfaces';
import { useMemo, useState } from 'react';
import { CaseRound } from '@solar-icons/react';
import TitleSectionIconLeft from '@/components/common/TitleSection IconLeft';
import { MinimalisticMagnifer } from '@solar-icons/react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import FormOptions from '@/components/forms/FormOptions';
import { states } from '@/constants';

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
    logoUrl: '/Deloitte.svg',
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
  },
];

type Filters = {
  modality: string;
  workdayType: string;
  state: string;
};


const normalize = (s = '') =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

export default function JobsPage() {

    

  const methods = useForm<Filters>({
    defaultValues: {
      modality: '',
      workdayType: '',
      state: '',
    },
  });

  const { control, handleSubmit } = methods;


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
    if (!searchTags.length) return fakeData;

    const tagsNorm = searchTags.map(normalize);

    return fakeData.filter((job) => {
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
      title: 'Busqueda de vaacntes',
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

        {filteredJobs.length ? (
          filteredJobs.map((job, index) => <DrawerApplicantVacant key={index} job={job} />)
        ) : (
          <div className="py-10 text-center text-zinc-400">
            <p className="font-medium">No se encontraron vacantes que coincidan con tu búsqueda.</p>
            <p className="text-sm">Prueba con otras palabras clave o elimina filtros.</p>
          </div>
        )}
      </div>
    </>
  );
}
