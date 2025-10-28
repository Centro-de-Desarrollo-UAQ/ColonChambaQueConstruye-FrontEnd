import { filterType } from "@/interfaces/table";

export const filtersVacancies: filterType[] = [
{
  value: 'state',
  name: 'Estado',
  options: [
    { label: 'Activa', value: 'Activo' },
    { label: 'En revisión', value: 'EnRevisión' },
    { label: 'Cerrada', value: 'Cerrado' },
    { label: 'Rechazada', value: 'Rechazado' },
  ]
},
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
  value: 'createdAt',
  name: 'Fecha de publicación',
  isDate: true,
},
{
  value: 'workShift',
  name: 'Tipo de jornada',
  options: [
    { label: 'Tiempo Completo', value: 'Tiempo Completo' },
    { label: 'Medio Tiempo', value: 'Medio Tiempo' },
    { label: 'Horario flexible', value: 'Horario flexible' },
    { label: 'Pago por hora', value: 'Pago por hora' },
    { label: 'Prácticas', value: 'Prácticas' },
  ]
}
]