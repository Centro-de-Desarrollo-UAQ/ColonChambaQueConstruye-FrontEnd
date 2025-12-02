'use client';

import { Industry } from '@/interfaces/industries';
import UserLinkerVacanciesCard from '@/components/linker/UserLinkerCardvacancies';
import { JobCardProps } from '@/interfaces/jobCard';
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { filtersVacancies } from '@/data/filtersVacancies';
import { FileRemove, InboxIn } from '@solar-icons/react';
import { AdminNavbarMenu } from '@/components/navigation/AdminNavbarMenu';
import TitleSection from '@/components/common/TitleSection';
import AdditionalInformation from '../../../../../components/forms/vacancy/AdditionalInformation';

type Filters = {
  modality: string;
  workdayType: string;
  state: string;
  industry?: Industry | ''
  registerDate?:string
};

export const workShiftLabelMap: Record<string, string> = {
  TIEMPO_COMPLETO: "Tiempo completo",
  MEDIO_TIEMPO: "Medio tiempo",
  HORARIO_FLEXIBLE: "Horario flexible",
  PAGO_HORA: "Pago por hora",
  PRACTICAS: "Prácticas",
};

export const JobCardsData: JobCardProps[] = [
  {
    id: '1',
    status: 'REVISION',
    title: 'Desarrollador Frontend Senior',
    company: 'Tech Solutions',
    location: 'Juriquilla, Querétaro',
    description:
      'Desarrollo de interfaces modernas y optimizadas en React con buenas prácticas.',
    salaryRange: '$30,000 - $50,000 MXN',
    schedule: 'TIEMPO_COMPLETO',
    modality: 'Presencial',
    logoUrl: '/Deloitte.svg',
    information:
      'Seguro de gastos médicos, vales de despensa, capacitaciones continuas. Horario flexible, home office parcial, estacionamiento gratuito.',
    createdAt: '2025-07-28',
    sector: 'Tecnología e informática',
    numberOfPositions: 5,
    BenefitsSection: 'Seguro de gastos médicos, vales de despensa, capacitaciones continuas. Horario flexible, home office parcial, estacionamiento gratuito.',
    degree: 'LICENCIATURA',
    AdditionalInformation: 'Se ofrece plan de carrera con mentoría personalizada. Modalidad híbrida con equipo de cómputo proporcionado por la empresa.',
    gender: 'Indistinto',
    ageRange: { min: 25, max: 35 },
    RequiredExperience: '2 años en desarrollo frontend con React'
  },
  {
    id: '2',
    status: 'CERRADA',
    title: 'Analista de Datos',
    company: 'Data Insights',
    location: 'CDMX, México',
    description:
      'Generación de dashboards y análisis de KPIs clave en Power BI.',
    salaryRange: '$250 - $250 MXN (pago por hora)',
    schedule: 'PAGO_HORA',
    modality: 'Remoto',
    logoUrl: '/Deloitte.svg',
    information:
      'Capacitación continua y acceso a certificaciones. Trabajo 100% remoto y horarios flexibles.',
    createdAt: '2025-02-28T06:00:00.000Z',
    sector: 'Ingeniería en Software',
    numberOfPositions: 2,
    BenefitsSection: 'Capacitación continua y acceso a certificaciones. Trabajo 100% remoto y horarios flexibles.',
    degree: 'INGENIERIA',
    AdditionalInformation: 'Se ofrece plan de carrera con mentoría personalizada. Modalidad híbrida con equipo de cómputo proporcionado por la empresa.',
    ageRange: { min: 22, max: 40 },
    gender: 'Indistinto',
    RequiredExperience: '2 años en análisis de datos y generación de dashboards'
  },
  {
    id: '3',
    status: 'CERRADA',
    title: 'Network Developer .NET',
    company: 'NetCorp',
    location: 'Guadalajara, Jalisco',
    description:
      'Desarrollo de aplicaciones .NET orientadas a la conectividad de redes.',
    salaryRange: '$20,000 - $25,000 MXN',
    schedule: 'MEDIO_TIEMPO',
    modality: 'Presencial',
    logoUrl: '/Deloitte.svg',
    information:
      'Seguro de vida, comedor subsidiado. Convenios con universidades para maestrías.',
    createdAt: '2024-10-01T12:00:00.000Z',
    sector: 'Telecomunicaciones',
    numberOfPositions: 1,
    BenefitsSection: 'Seguro de vida, comedor subsidiado. Convenios con universidades para maestrías.',
    degree: 'TECNICA',
    AdditionalInformation: 'Convenios con universidades para maestrías.',
    gender: 'Indistinto',
    ageRange: { min: 30, max: 50 },
    RequiredExperience: '4 años en desarrollo .NET y 2 años en administración de redes'
  },
  {
    id: '4',
    status: 'RECHAZADA',
    title: 'Jr. Backend',
    company: 'Innovatech',
    location: 'Monterrey, Nuevo León',
    description:
      'Apoyo en desarrollo de APIs con Node.js y Express.',
    salaryRange: '$15,000 - $20,000 MXN',
    schedule: 'HORARIO_FLEXIBLE',
    modality: 'Híbrido',
    logoUrl: '/Deloitte.svg',
    information:
      'Plan de carrera y mentoría. Modalidad híbrida, equipo de cómputo proporcionado.',
    createdAt: '2025-01-28T06:00:00.000Z',
    sector: 'Ingeniería en Software',
    numberOfPositions: 3,
    BenefitsSection: 'Plan de carrera y mentoría. Modalidad híbrida, equipo de cómputo proporcionado.',
    degree: 'LICENCIATURA',
    AdditionalInformation: 'Se ofrece plan de carrera con mentoría personalizada. Modalidad híbrida con equipo de cómputo proporcionado por la empresa.',
    gender: 'Indistinto',
    ageRange: { min: 25, max: 35 },
    RequiredExperience: '1 año en desarrollo backend con Node.js y Express'
  },
];

export default function VacanciesGestorPage() {
  const sectionConfig = {
    talents: {
      title: 'SOLICITUDES DE VACANTES APROBADAS ',
      icon: <InboxIn size={24} weight="Bold" />,
      description: '',
    },
  };

  // mostrar solo estados: ABIERTA, APROBADA, CERRADA, INACTIVA
  const allowedStatuses = new Set(['RECHAZADA']);
  const visibleJobs = JobCardsData.filter((job) => allowedStatuses.has(String(job.status).toUpperCase()));

  return (
    <>
      <div className="mx-32 flex flex-col gap-5 m-10">
        <div className="">
          <TitleSection sections={sectionConfig} currentSection={'talents'} />
        </div>
        <div className=''>
          <UniversalCardsFilter<JobCardProps>
            items={visibleJobs}
            filters={filtersVacancies}
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
