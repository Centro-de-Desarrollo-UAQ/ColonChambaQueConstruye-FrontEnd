import { ColumnDef } from '@tanstack/react-table';
import { accentInsensitiveTextFilter, dateSameDay } from '@/validations/filtersTanStack';
import { Badge } from '@/components/ui/badge';
import { dateToLocaleDateString } from '@/lib/utils';
import React from 'react';
import { Vacancy } from '@/interfaces/vacancy';
import SortButton from '../tables/ui/SortButton';
import RowActions from '../tables/schemas/VacanciesActions';
import { filterType } from '@/interfaces/table';
import { Button } from '@/components/ui/button';

export const vacanciesLinkerColumns: ColumnDef<Vacancy>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column} name="Puesto" />,
    filterFn: accentInsensitiveTextFilter,
  },
  {
    accessorKey: 'company',
    header: ({ column }) => <SortButton column={column} name="Empresa" />,
    filterFn: accentInsensitiveTextFilter,
  },
  {
    accessorKey: 'createdAt',
    cell: ({ getValue }) => dateToLocaleDateString(getValue() as string),
    header: ({ column }) => <SortButton column={column} name="Fecha de solicitud" />,
    filterFn: dateSameDay,
  },
  {
    header: '  ',
    id: 'actions',
    cell: ({ row }) => {
      const id = (row.original as Vacancy).id;
      return (
        <a href={`/employer/vacancy/${id}/review`}>
          <Button
            variant="primary"
            color='accent'
            className=''
          >
            Revisar
          </Button>
        </a>
      );
    },
  },
];

export const filtersLinkerVacancies: filterType[] = [
{
  value: 'ageRange',
  name: 'Sector',
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
  name: 'Fecha de registro',
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