import { ColumnDef } from '@tanstack/react-table';
import { accentInsensitiveTextFilter, dateSameDay } from '@/validations/filtersTanStack';
import { dateToLocaleDateString } from '@/lib/utils';
import React from 'react';
import SortButton from '../tables/ui/SortButton';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { filterType } from '@/interfaces/table'; 
import { UserCandidate } from '@/interfaces/usercandidates';
import DrawerLinkerUser from './DrawerLinkerUser';

export const UserLinkerColumns: ColumnDef<UserCandidate>[] = [
  {
    accessorFn: (row) => row.firstName, 
    id: 'name', 
    header: ({ column }) => <SortButton column={column} name="Usuario" />,
    filterFn: accentInsensitiveTextFilter,
    cell: ({ row }) => {
      const user = row.original;
      const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
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
    accessorKey: 'registrationDate',
    cell: ({ getValue }) => dateToLocaleDateString(getValue() as string),
    header: ({ column }) => <SortButton column={column} name="Fecha de registro" />,
    filterFn: dateSameDay,
  },
  {
    id: 'actions',
        header: ' ',
        cell: ({ row }) => {
          return (
            <DrawerLinkerUser 
              user={row.original as UserCandidate} 
              sideDrawer='right' 
              open={false} 
              logoUrl={''} 
            />
          );
        }
  },
];


export const UserSearchFilters: filterType[] = [
  {
    value: 'registrationDate',
    name: 'Fecha de registro',
    isDate: true,
  },
];