import { filterType } from "@/interfaces/table";

export const filtersVacancies: filterType[] = [
{
  value: 'modality',
  name: 'Modalidad',
  options: [
    { label: 'Remoto', value: 'Remoto' },
    { label: 'Presencial', value: 'Presencial' },
    { label: 'Híbrido', value: 'Híbrido' },
  ]
},
{
  value: 'workShift',
  name: 'Jornada laboral',
  options: [
    { label: 'Tiempo Completo', value: 'tiempo completo' },
    { label: 'Medio Tiempo', value: 'Medio Tiempo' },
    { label: 'Horario flexible', value: 'Horario flexible' },
  ]
},
{
  value: 'createdAt',
  name: 'Fecha de publicación',
  isDate: true,
},
{
  value: 'state',
  name: 'Estado',
  options: [
    { label: 'Aprobado', value: 'Aprobado' },
    { label: 'En revisión', value: 'EnRevisión' },
    { label: 'Rechazado', value: 'Rechazado' },
    { label: 'Cerrado', value: 'Cerrado' },
  ]
}
]