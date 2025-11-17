import { filterType } from "@/interfaces/table";

export const filtersVacancies: filterType[] = [
{
  value: 'sector',
    name: 'Sector',
    options: [
      { label: 'Tecnología', value: 'Tecnología' },
      { label: 'Salud', value: 'Salud' },
      { label: 'Educación', value: 'Educación' },
      { label: 'Finanzas', value: 'Finanzas' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Ingeniería', value: 'Ingeniería' },
      { label: 'Ventas', value: 'Ventas' },
      { label: 'Recursos Humanos', value: 'Recursos Humanos' },
      { label: 'Logística', value: 'Logística' },
      { label: 'Construcción', value: 'Construcción' },
    ],
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
  value: 'schedule',
  name: 'Tipo de jornada',
  options: [
    { label: 'Tiempo Completo', value: 'tiempo completo' },
    { label: 'Medio Tiempo', value: 'Medio Tiempo' },
    { label: 'Horario flexible', value: 'Horario flexible' },
    { label: 'Pago por hora', value: 'Pago por hora' },
    { label: 'Prácticas', value: 'Prácticas' },
  ]
}
]