import { ColumnDef } from '@tanstack/react-table';
import { accentInsensitiveTextFilter, dateSameDay } from '@/validations/filtersTanStack';
import { dateToLocaleDateString } from '@/lib/utils';
import React from 'react';
import SortButton from '../tables/ui/SortButton';
import { filterType } from '@/interfaces/table';
import { listAreasOptionsConstants, listWorkingHoursOptionsConstants } from '@/constants';
import DrawerLinkerVacancies from '../DrawerVacante/DrawerLinkerVacancies';
import { JobCardProps } from '@/interfaces';

export const vacanciesLinkerColumns: ColumnDef<JobCardProps>[] = [
  // alias "name" para compatibilidad con DataTable / TableSearchBar
  {
    id: 'name',
    accessorFn: (row) => row.title ?? '',
    header: ({ column }) => <SortButton column={column} name="Puesto" />,
    cell: ({ row }) => (row.original.title ?? ''),
    filterFn: accentInsensitiveTextFilter,
  },
  {
    accessorKey: 'company',
    header: ({ column }) => <SortButton column={column} name="Empresa" />,
    filterFn: accentInsensitiveTextFilter,
  },
   {
    accessorKey: 'sector',
    header: ({ column }) => <SortButton column={column} name="Sector" />,
    filterFn: accentInsensitiveTextFilter,
  },
  {
  accessorKey: 'schedule',
  cell: ({ getValue }) => {
    const raw = getValue<string>();
    const map: Record<string, string> = {
      TIEMPO_COMPLETO: 'Tiempo Completo',
      MEDIO_TIEMPO: 'Medio Tiempo',
      HORARIO_FLEXIBLE: 'Horario Flexible',
      PAGO_HORA: 'Pago por hora',
      PRACTICAS: 'Prácticas',
    };
    return map[raw] ?? raw;
  },
  header: ({ column }) => (
    <SortButton column={column} name="Tipo de jornada" />
  ),
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
      const id = (row.original as JobCardProps).id;
      return (
        <DrawerLinkerVacancies job={row.original as JobCardProps} sideDrawer='right' open={false} company={(row.original as JobCardProps).company} logoUrl={(row.original as JobCardProps).logoUrl} />
      );
    },
  },
];

export const filtersLinkerVacancies: filterType[] = [
{
  value: 'sector',
  name: 'Sector',
  options: listAreasOptionsConstants
},
{
  value: 'createdAt',
  name: 'Fecha de registro',
  isDate: true,
},
{
  value: 'schedule',
  name: 'Tipo de jornada',
  options:  listWorkingHoursOptionsConstants
}
]