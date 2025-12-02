'use client';

import { Industry } from '@/interfaces/industries';
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { FileRemove, InboxIn } from '@solar-icons/react';
import TitleSection from '@/components/common/TitleSection';
import { testDataUser } from '@/data/testDataUsers';
import { UserCandidate } from '@/interfaces/usercandidates';
import UserLinkerCard from '@/components/linker/UserLinkerCard';
import { User } from 'lucide-react';
import { UserSearchFilters } from '@/components/linker/CompanySearchEmploy';


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
      title: 'SOLICITUDES APROBADAS DE BUSCADORES DE EMPLEO',
      icon: <InboxIn size={24} weight="Bold" />,
      description: '',
    },
  };

  const allowedStatuses = new Set(['ACTIVO', 'INACTIVO']);
    const visibleUsers = testDataUser.filter((user) =>
      allowedStatuses.has(String(user.status ?? '').toUpperCase())
    );

  return (
    <>
      <div className="mx-32 flex flex-col gap-5 m-10">
        <div className="">
          <TitleSection sections={sectionConfig} currentSection={'talents'} />
        </div>
        <div className=''>
          <UniversalCardsFilter<UserCandidate>
            items={visibleUsers}
            filters={UserSearchFilters}
            accessors={{
              name: (u) =>
                `${u.firstName} ${u.lastName} ${u.desiredPosition} `,
              educationLevel: (u) => u.educationLevel,
              registrationDate: (u) => u.registrationDate,
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
                {filtered.map((user) => (
                    <UserLinkerCard key={user.id} user={user} />
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
