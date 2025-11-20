import { ColumnDef } from '@tanstack/react-table';
import SortButton from '../ui/SortButton';
import { accentInsensitiveTextFilter, dateSameDay } from '@/validations/filtersTanStack';
import { Badge } from '@/components/ui/badge';
import { dateToLocaleDateString } from '@/lib/utils';
import React from 'react';
import RowActions from './VacanciesActions';
import { Vacancy } from '@/interfaces/vacancy';

export const vacanciesColumns: ColumnDef<Vacancy>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column} name="Título" />,
    filterFn: accentInsensitiveTextFilter,
  },
  {
    accessorKey: 'applications',
    header: ({ column }) => <SortButton column={column} name="Número de plazas" />,
  },
  {
    accessorKey: 'workShift',
    header: 'Tipo de jornada',
  },
  {
    accessorKey: 'modality',
    header: 'Modalidad',
  },
  {
    accessorKey: 'createdAt',
    cell: ({ getValue }) => dateToLocaleDateString(getValue() as string),
    header: ({ column }) => <SortButton column={column} name="Fecha de Publicación" />,
    filterFn: dateSameDay,
  },
    {
    accessorKey: 'state',
    header: ({ column }) => <SortButton column={column} name="Estado" />,
    cell: ({ getValue }) => {
      const state = getValue() as Vacancy['state'];
      const stateMap: Record<Vacancy['state'], string> = {
        Activo: 'Activa',
        EnRevisión: 'En Revisión',
        Cerrado: 'Cerrada',
        Rechazado: 'Rechazada',
      };
      return (
        <Badge
          variant={state === 'Activo' ? 'success' : state === 'EnRevisión' ? 'warning' : 'danger'}
        >
          {stateMap[state]}
        </Badge>
      );
    },
  },
  {
    header:'Editar',
    id: 'actions',
    cell: ({ row }) => <RowActions row={row} />,
  },
];