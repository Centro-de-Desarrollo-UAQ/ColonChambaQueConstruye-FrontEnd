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
import { User } from '@/interfaces/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const companySearchColumns: ColumnDef<User>[] = [
  {
    accessorFn: (row) => row.firstName, 
    id: 'name', 
    header: ({ column }) => <SortButton column={column} name="Usuario" />,
    filterFn: accentInsensitiveTextFilter,
    cell: ({ row }) => {
      const user = row.original as User;
      const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.photoURL ?? undefined} />
            <AvatarFallback className="bg-orange-500 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{user.firstName}</span>
          </div>
        </div>
      );
    }
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: 'fullName',
    header: ({ column }) => <SortButton column={column} name="Nom. Comp." />,
    filterFn: accentInsensitiveTextFilter,
    
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortButton column={column} name="Correo" />,
    filterFn: dateSameDay,
  },
  {
    accessorKey: 'createdAt',
    cell: ({ getValue }) => dateToLocaleDateString(getValue() as string),
    header: ({ column }) => <SortButton column={column} name="Fecha de registro" />,
    filterFn: dateSameDay,
  },
  // {
  //   accessorKey: 'academicLevel',
  //   header: ({ column }) => <SortButton column={column} name="Escolaridad" />,
  //   filterFn: accentInsensitiveTextFilter,
  // },
  {
    header: '  ',
    id: 'actions',
    cell: ({ row }) => {
      const id = (row.original as User).id;
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

export const companySearchFilters: filterType[] = [
  // {
  //   value: 'academicLevel',
  //   name: 'Escolaridad',
  //   options: [
  //     { label: 'Preescolar', value: 'PREESCOLAR' },
  //     { label: 'Primaria', value: 'PRIMARIA' },
  //     { label: 'Secundaria', value:'SECUNDARIA' },
  //     { label: 'Bachillerato', value: 'BACHILLERATO_GENERAL' },
  //     { label: 'Carrera Técnica', value: 'CARRERA_TECNICA' },
  //     { label: 'Licenciatura', value: 'LICENCIATURA' },
  //     { label: 'Ingeniera', value: 'INGENIERIA' },
  //     { label: 'Maestría', value: 'MAESTRIA' },
  //     { label: 'Doctorado', value: 'DOCTORADO' },
  //     { label: 'Postdoctorado', value: 'POSDOCTORADO' },
  //   ]
  // },
  {
    value: 'createdAt',
    name: 'Fecha de registro',
    isDate: true,
  }
]