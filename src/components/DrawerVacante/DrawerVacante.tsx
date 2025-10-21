'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Balloon,
  Buildings,
  Calendar,
  ClockCircle,
  DollarMinimalistic,
  Gps,
  MapPoint,
  UserRounded,
  UsersGroupRounded,
} from '@solar-icons/react';
import { Vacancy } from '@/interfaces/vacancy';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

const stateLabel: Record<Vacancy['state'], string> = {
  Activo: 'Activo',
  EnRevisión: 'En Revisión',
  Cerrado: 'Cerrado',
  Rechazado: 'Rechazado',
};

const stateVariant = (state: Vacancy['state']) =>
  state === 'Activo' ? 'success' : state === 'EnRevisión' ? 'warning' : 'danger';

const formatDate = (d?: string | Date) => {
  if (!d) return '—';
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex items-center gap-2">
      <Icon />
      <p className="text-[16px] leading-normal font-normal text-zinc-600">{label}:</p>
      <p className="text-[16px] leading-normal font-normal text-zinc-600">{String(value)}</p>
    </div>
  );
}

type DrawerVacanteProps = {
  vacante: Vacancy;
};

export default function DrawerVacante({ vacante }: DrawerVacanteProps) {
  const {
    name,
    modality,
    workShift,
    location,
    description,
    ageRange,
    salary,
    industryCategory,
    gender,
    vacancyCareer,
    employeeBenefit,
    additionaSupport,
    experience,
    numberOpening,
    limitApply,
    createdAt,
    requiredProfile,
    state,
    applications,
    workingDay,
  } = vacante;

  return (
    <DrawerContent className="flex !w-[50vw] !max-w-none flex-col gap-7 overflow-y-auto p-8">
      <DrawerHeader className="flex flex-col gap-4 !p-0">
        <DrawerTitle className="text-[30px] leading-normal font-bold text-zinc-800">
          {name}
        </DrawerTitle>
        <DrawerDescription asChild>
          <div className="flex items-center justify-between">
            <Badge variant={stateVariant(state)}>{stateLabel[state]}</Badge>
            <p className="text-[16px] leading-normal font-normal">
              Solicitado: {formatDate(createdAt)}
            </p>
          </div>
        </DrawerDescription>
      </DrawerHeader>
      {(limitApply || numberOpening) && (
        <div className="flex items-center justify-between rounded-3xl border-1 border-zinc-300 bg-zinc-100 px-6 py-4">
          <p className="text-[16px] leading-normal font-normal">
            Solicitudes máximas permitidas: {limitApply ?? '—'}
          </p>
          <div className="gap-2 rounded-3xl border-1 border-zinc-300 bg-white px-3 py-1">
            <p className="text-[16px] leading-normal font-normal">
              {numberOpening ?? 0} posiciones disponibles
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <InfoRow icon={MapPoint} label="Dirección" value={location} />
        <InfoRow icon={Gps} label="Modalidad" value={modality} />
        <InfoRow icon={ClockCircle} label="Jornada" value={workShift} />
        <InfoRow icon={Calendar} label="Días laborales" value={workingDay?.join(' a ')} />
        <InfoRow
          icon={DollarMinimalistic}
          label="Salario"
          value={`$${salary?.min} - $${salary?.max}`}
        />
        <InfoRow icon={UserRounded} label="Género" value={gender} />
        <InfoRow icon={Balloon} label="Edad" value={`${ageRange?.min} - ${ageRange?.max} años`} />
        <InfoRow icon={Buildings} label="Sector" value={industryCategory} />
        <InfoRow icon={UsersGroupRounded} label="Aplicaciones actuales" value={applications} />
      </div>
      <Separator />
      {description && (
        <section className="flex flex-col gap-4">
          <p className="text-uaq-accent text-[16px] leading-normal font-medium uppercase">
            Acerca del empleo
          </p>
          <p className="text-[20px] leading-normal font-bold text-zinc-800">Descripción</p>
          <p className="text-[20px] leading-normal font-normal text-zinc-800">{description}</p>
        </section>
      )}
      {requiredProfile?.length ? (
        <section className="flex flex-col gap-4">
          <p className="text-[20px] leading-normal font-bold text-zinc-800">Perfil requerido</p>
          <p className="text-[20px] leading-normal font-normal text-zinc-800">
            {requiredProfile[0].skill}
          </p>
        </section>
      ) : null}
      {vacancyCareer?.length ? (
        <section className="flex flex-col gap-4">
          <p className="text-[20px] leading-normal font-bold text-zinc-800">Carreras afines</p>
          <ul className="list-inside list-disc text-[20px] leading-normal font-normal text-zinc-800">
            {vacancyCareer.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {employeeBenefit.length ? (
        <section className="flex flex-col gap-4">
          <p className="text-[20px] leading-normal font-bold text-zinc-800">Beneficios</p>
          <p className="text-[20px] leading-normal font-normal text-zinc-800">{employeeBenefit}</p>
        </section>
      ) : null}
      {additionaSupport.length ? (
        <section className="flex flex-col gap-4">
          <p className="text-[20px] leading-normal font-bold text-zinc-800">Beneficios</p>
          <p className="text-[20px] leading-normal font-normal text-zinc-800">{additionaSupport}</p>
        </section>
      ) : null}
      {experience?.length ? (
        <section className="flex flex-col gap-4">
          <p className="text-[20px] leading-normal font-bold text-zinc-800">
            Experiencia requerida
          </p>
          <div className="flex flex-col gap-2">
            {experience.map((e, i) => (
              <div key={i} className="flex items-center gap-5">
                • <p>{e.skill}</p>
                {e.time ? <p>{e.time}</p> : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </DrawerContent>
  );
}
