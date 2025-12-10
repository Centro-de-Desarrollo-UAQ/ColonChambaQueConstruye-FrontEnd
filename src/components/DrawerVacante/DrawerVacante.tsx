'use client';

import { useEffect, useState } from 'react';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import {
  MapPoint,
  Gps,
  ClockCircle,
  DollarMinimalistic,
  Balloon,
  Calendar,
  Buildings,
} from '@solar-icons/react';

import { VacancyU } from '@/interfaces/vacancyUpdate';
import { Vacancy } from '@/interfaces/vacancy';
import { useCompanyStore } from '@/app/store/authCompanyStore';
import { apiService } from '@/services/api.service';

const stateLabel: Record<Vacancy['status'], string> = {
  ABIERTA: 'ABIERTA',
  REVISION: 'REVISION',
  CERRADA: 'CERRADA',
  RECHAZADA: 'RECHAZADA',
  APROBADA: 'APROBADA',
  INACTIVA: 'INACTIVA',
};

const stateVariant = (state: Vacancy['status']) =>
  state === 'ABIERTA' ? 'success' : state === 'REVISION' ? 'warning' : 'danger';

const formatDate = (d?: string | Date | null) => {
  if (!d) return '—';
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return '—';
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
      <p className="font-medium text-[16px] text-zinc-700">{label}:</p>
      <p className="text-[16px] text-zinc-700">{String(value)}</p>
    </div>
  );
}

type DrawerVacanteProps = {
  vacancyId: string;
};

export default function DrawerVacante({ vacancyId }: DrawerVacanteProps) {
  const { token, companyId } = useCompanyStore();

  const [vacancy, setVacancy] = useState<VacancyU | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      if (!token || !companyId || !vacancyId) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiService.get(
          `/companies/${companyId}/vacancies/${vacancyId}`,
        );

        if (!res?.ok) {
          setVacancy(null);
          setIsLoading(false);
          return;
        }

        const json = await res.json();
        const data = json?.data?.vacancy ?? json?.data ?? json;
        setVacancy(data as VacancyU);
        console.log('Vacancy data:', data);
      } catch {
        setVacancy(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancy();
  }, [vacancyId, token, companyId]);

  const titleText = vacancy?.name ?? 'Detalle de vacante';
  const subtitleText = vacancy
    ? `Publicado: ${formatDate(vacancy.createdAt)}`
    : isLoading
    ? 'Cargando información...'
    : 'No se encontró información para esta vacante.';

  const workShiftMap: Record<VacancyU['workShift'], string> = {
    TIEMPO_COMPLETO: 'Tiempo completo',
    MEDIO_TIEMPO: 'Medio tiempo',
    PAGO_HORA: 'Pago por hora',
    HORARIO_FLEXIBLE: 'Horario flexible',
  };
  const modalityMap: Record<NonNullable<VacancyU['modality']>, string> = {
    PRESENCIAL: 'Presencial',
    REMOTO: 'Remoto',
    HIBRIDO: 'Híbrido',
  };
  const genderMap: Record<NonNullable<VacancyU['gender']>, string> = {
    FEMENINO: 'Femenino',
    MASCULINO: 'Masculino',
    INDIFERENTE: 'Indiferente',
    OTRO: 'Otro',
  };
  const dayMap: Record<string, string> = {
    LUNES: 'Lunes',
    MARTES: 'Martes',
    MIERCOLES: 'Miércoles',
    JUEVES: 'Jueves',
    VIERNES: 'Viernes',
    SABADO: 'Sábado',
    DOMINGO: 'Domingo',
  };
  const academicDegreeMap: Record<NonNullable<VacancyU['requiredDegree']>, string> = {
    INDIFERENTE: 'Indiferente',
    TECNICA: 'Técnica',
    LICENCIATURA: 'Licenciatura',
    INGENIERIA: 'Ingeniería',
    MAESTRIA: 'Maestría',
    DOCTORADO: 'Doctorado',
  };

  const workShiftLabel = vacancy?.workShift ? workShiftMap[vacancy.workShift] ?? vacancy.workShift : undefined;
  const modalityLabel = vacancy?.modality ? modalityMap[vacancy.modality] ?? vacancy.modality : undefined;
  const genderLabel = vacancy?.gender ? genderMap[vacancy.gender] ?? vacancy.gender : undefined;
  const workingDaysLabel = Array.isArray(vacancy?.workingDay)
    ? vacancy!.workingDay
        .map((day) => {
          if (typeof day !== 'string') return '';
          const key = day.toUpperCase();
          return dayMap[key] ?? day;
        })
        .filter(Boolean)
        .join(', ')
    : typeof vacancy?.workingDay === 'string'
    ? dayMap[vacancy!.workingDay] ?? vacancy!.workingDay
    : undefined;

    const stateMap: Record<Vacancy['status'], string> = {
            APROBADA: 'APROBADA',
            REVISION: 'REVISION',
            CERRADA: 'CERRADA',
            RECHAZADA: 'RECHAZADA',
            INACTIVA: 'INACTIVA',
            ABIERTA: 'ABIERTA',
          };
  const status = vacancy?.status;

  return (
    <DrawerContent className="overflow-y-auto overflow-x-hidden px-4 py-6">
      <div className="mx-auto w-full max-w-[760px] rounded-3xl bg-background p-8 flex flex-col gap-6">
        <DrawerHeader className="flex flex-col gap-2 p-0">
          <DrawerTitle className="text-[30px] font-bold text-zinc-900">
            {titleText}
          </DrawerTitle>
          <DrawerDescription asChild>
            <div className="flex flex-wrap items-center justify-between gap-3 text-[14px] text-zinc-600">
              {vacancy?.status && (
                <Badge
                          variant={status === 'APROBADA' ? 'success' : status === 'REVISION' ? 'warning' : 'danger'}
                        >

                        </Badge>
              )}
              <span className="ml-auto text-right">{subtitleText}</span>
            </div>
          </DrawerDescription>
        </DrawerHeader>

        {isLoading && (
          <div className="py-8 text-center text-sm text-zinc-500">
            Cargando información...
          </div>
        )}

        {!isLoading && !vacancy && (
          <div className="py-8 text-center text-sm text-zinc-500">
            No se encontró la información de esta vacante.
          </div>
        )}

        {!isLoading && vacancy && (
          <>
            {/* Badge de estado + fecha ya van en el header */}
            {typeof vacancy.numberOpenings === 'number' && (
              <div className="flex items-center justify-between rounded-3xl border border-zinc-300 bg-zinc-100 px-6 py-4">
                <p className="text-[16px] text-zinc-700">
                  Solicitudes máximas permitidas: {vacancy.numberOpenings}
                </p>
                <div className="rounded-3xl border border-zinc-300 bg-white px-3 py-1">
                  <p className="text-[16px] text-zinc-700">
                    {vacancy.numberOpenings} posiciones disponibles
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <InfoRow icon={MapPoint} label="Dirección" value={vacancy.location} />
              <InfoRow icon={Gps} label="Modalidad" value={modalityLabel} />
              <InfoRow icon={ClockCircle} label="Jornada" value={workShiftLabel} />
              <InfoRow
                icon={Calendar}
                label="Días laborales"
                value={workingDaysLabel}
              />
              <InfoRow
                icon={ClockCircle}
                label="Horario"
                value={vacancy.workSchedule?.join(' - ')}
              />
              <InfoRow
                icon={DollarMinimalistic}
                label="Salario"
                value={
                  vacancy.salary?.min != null && vacancy.salary?.max != null
                    ? `${vacancy.salary.coin} $${vacancy.salary.min} - $${vacancy.salary.max}`
                    : 'No especificado'
                }
              />
              <InfoRow
                icon={Buildings}
                label="Sector empresarial"
                value={vacancy.businessSector}
              />
              <InfoRow
                icon={Balloon}
                label="Género"
                value={genderLabel}
              />
              <InfoRow
                icon={Calendar}
                label="Edad"
                value={
                  vacancy.ageRange
                    ? `${vacancy.ageRange[0]} - ${vacancy.ageRange[1]} años`
                    : null
                }
              />
              <InfoRow
                icon={Buildings}
                label="Grado requerido"
                value={vacancy.requiredDegree ? academicDegreeMap[vacancy.requiredDegree] ?? vacancy.requiredDegree : undefined}
              />
            </div>

            <Separator />

            {vacancy.description && (
              <section className="flex flex-col gap-3 break-words">
                <p className="text-[20px] font-bold text-zinc-800">Descripción</p>
                <p className="text-[16px] text-zinc-700 leading-relaxed whitespace-pre-wrap">
                  {vacancy.description}
                </p>
              </section>
            )}

            {vacancy.experience && (
              <section className="flex flex-col gap-3 break-words">
                <p className="text-[20px] font-bold text-zinc-800">
                  Experiencia requerida
                </p>
                <p className="text-[16px] text-zinc-700 leading-relaxed whitespace-pre-wrap">
                  {vacancy.experience}
                </p>
              </section>
            )}

            {vacancy.benefits && (
              <section className="flex flex-col gap-3 break-words">
                <p className="text-[20px] font-bold text-zinc-800">Beneficios</p>
                <p className="text-[16px] text-zinc-700 leading-relaxed whitespace-pre-wrap">
                  {vacancy.benefits}
                </p>
              </section>
            )}

            {vacancy.additionalInformation && (
              <section className="flex flex-col gap-3 break-words">
                <p className="text-[20px] font-bold text-zinc-800">
                  Información adicional
                </p>
                <p className="text-[16px] text-zinc-700 leading-relaxed whitespace-pre-wrap">
                  {vacancy.additionalInformation}
                </p>
              </section>
            )}

            {vacancy.comment && (
              <section className="flex flex-col gap-3 break-words">
                <p className="text-[20px] font-bold text-red-600">
                  Comentario de revisión
                </p>
                <p className="text-[16px] text-zinc-700 leading-relaxed whitespace-pre-wrap">
                  {vacancy.comment}
                </p>
              </section>
            )}
          </>
        )}
      </div>
    </DrawerContent>
  );
}