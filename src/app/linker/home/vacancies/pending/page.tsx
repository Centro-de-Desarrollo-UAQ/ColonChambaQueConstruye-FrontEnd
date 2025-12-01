'use client';
import TitleSection from '@/components/common/TitleSection';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { Button } from '@/components/ui/button';
import { InboxIn } from '@solar-icons/react'
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { DataVacancies } from '@/data/testDataVacancies';
import NoteRemove from '@/components/common/hugeIcons';
import { filtersLinkerVacancies, vacanciesLinkerColumns } from '@/components/linker/LinkerTabs';
import { AdminNavbarMenu } from '@/components/navigation/AdminNavbarMenu';
import { JobCardsData } from '../rejected/page';

const sectionConfig = {
  profile: {
    icon: <InboxIn size={24} weight="Bold" />,
    title: 'SOLICITUDES DE VACANTES PENDIENTES',
    description: '',
  },
};

export default function tablillaPage() {
  // Filtrar solo vacantes en estado 'REVISION'
  const revisionVacancies = JobCardsData.filter((v: any) => v?.status === 'REVISION');
  const hasData = revisionVacancies.length > 0;

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
      <AdminNavbarMenu NameTitle="Vacantes" basePath="vacancies" />
      <div className="mx-32 flex flex-col gap-5 m-10">
        <div>
          <TitleSection sections={sectionConfig} currentSection={'profile'} />
        </div>

        {hasData ? (
          <div>
            <DataTableCustomSearchBar
              columns={vacanciesLinkerColumns}
              data={revisionVacancies}
              filters={filtersLinkerVacancies}
            />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center text-center">
            {commonEmptyState}
            <div className="mt-4">
              <Button variant="primary" color="accent">
                <a href="/employer/user/vacancy/create">Crear Vacante</a>
              </Button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}