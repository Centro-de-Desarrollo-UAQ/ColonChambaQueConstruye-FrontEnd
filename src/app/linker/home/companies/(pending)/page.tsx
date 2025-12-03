'use client';
import TitleSection from '@/components/common/TitleSection';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { Button } from '@/components/ui/button';
import { InboxIn } from '@solar-icons/react'
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import NoteRemove from '@/components/common/hugeIcons';
import { testDataCompanyFull } from '@/data/testDataCompany';
import { companiesLinkerColumns, filtersLinkerCompanies } from '@/components/linker/LinkerTabs';
import { CompanyData } from '@/interfaces';


const sectionConfig = {
  profile: {
    icon: <InboxIn size={24} weight="Bold" />,
    title: 'SOLICITUDES DE EMPRESAS PENDIENTES',
    description: '',
  },
};

export default function PendingCompaniesPage() {
  // Filtrar solo empresas en estado 'REVISION'
  const revisionCompanies = testDataCompanyFull.filter((v: CompanyData) => v?.Company.status === 'REVISION');
  const hasData = revisionCompanies.length > 0;

  const commonEmptyState = (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <EmptyDisplay
        icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
        firstLine="Todavía no tienes solicitudes de vacantes en revisión."
        secondline="Utiliza las opciones de la barra de navegación lateral para crear una o da clic en el siguiente botón para generar una nueva vacante."
      />
    </div>
  );

  return (
    <>
      <div className="mx-32 flex flex-col gap-5 m-10">
        <div>
          <TitleSection sections={sectionConfig} currentSection={'profile'} />
        </div>

        {hasData ? (
          <div>
            <DataTableCustomSearchBar
              columns={companiesLinkerColumns}
              data={revisionCompanies}
              filters={filtersLinkerCompanies}
            />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center text-center">
            {commonEmptyState}
          </div>
        )}

      </div>
    </>
  );
}