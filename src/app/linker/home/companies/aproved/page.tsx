'use client';

import { Industry } from '@/interfaces/industries';
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { FileRemove, InboxIn } from '@solar-icons/react';
import TitleSection from '@/components/common/TitleSection';
import { CompanyData } from '../../../../../interfaces/company';
import CompanyLinkerCard from '@/components/linker/CompanyLinkerCard';
import { testDataCompanyFull } from '@/data/testDataCompany';
import { filtersLinkerCompanies } from '@/components/linker/LinkerTabs';


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

// Datos de ejemplo: uno APROBADA, uno ABIERTA, uno CERRADA, otro RECHAZADA (no se mostrará)

export default function CompaniesAprovedPage() {
  const sectionConfig = {
    talents: {
      title: 'SOLICITUDES DE EMPRESAS APROBADAS ',
      icon: <InboxIn size={24} weight="Bold" />,
      description: '',
    },
  };

  const allowedStatuses = new Set(['ACTIVA', 'INACTIVA']);
   const aprovedCompanies = testDataCompanyFull.filter((v: CompanyData) => allowedStatuses.has(v?.Company.status));

  return (
    <>
      <div className="mx-32 flex flex-col gap-5 m-10">
        <div className="">
          <TitleSection sections={sectionConfig} currentSection={'talents'} />
        </div>
        <div className=''>
          <UniversalCardsFilter<CompanyData>
            items={aprovedCompanies}
            filters={filtersLinkerCompanies}
            accessors={{
              name: (c) =>
                `${c.Company.tradeName} ${c.Company.legalName} ${c.Company.state} `,
              workSector: (c) => c.Company.workSector,
              registeredAt: (c) => c.Company.registeredAt,
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
                    <CompanyLinkerCard key={job.Company.id} company={job} sideDrawer="right" />
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
