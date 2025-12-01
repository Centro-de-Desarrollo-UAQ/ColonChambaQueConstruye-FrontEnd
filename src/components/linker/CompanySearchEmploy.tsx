import { ColumnDef } from '@tanstack/react-table';
import { accentInsensitiveTextFilter, dateSameDay } from '@/validations/filtersTanStack';
import { dateToLocaleDateString } from '@/lib/utils';
import React from 'react';
import SortButton from '../tables/ui/SortButton';
import { Button } from '@/components/ui/button';
import { User } from '@/interfaces/user';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { filterType } from '@/interfaces/table'; 
import { educationlevel } from '@/interfaces/escolaridad'; 

export const getCompanySearchColumns = (
  onReviewClick: (user: User) => void
): ColumnDef<User>[] => [
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
  
  // --- AQUÍ ESTÁ LA CORRECCIÓN ---
  {
    accessorKey: 'academicLevel', 
    header: ({ column }) => <SortButton column={column} name="Escolaridad" />,
    
    // 1. Agregamos 'addMeta' como cuarto parámetro recibido
    filterFn: (row, id, filterValue, addMeta) => {
        const rowValue = row.getValue(id) as string || '';

        // CASO 1: El filtro viene del Dropdown (Array)
        if (Array.isArray(filterValue)) {
            if (filterValue.length === 0) return true;
            return filterValue.includes(rowValue);
        }

        // CASO 2: El filtro es texto (Búsqueda global)
        if (typeof filterValue === 'string') {
             // 2. Pasamos 'addMeta' a la función original para cumplir con los 4 argumentos
             return accentInsensitiveTextFilter(row, id, filterValue, addMeta);
        }

        return true;
    },
  },
  // -------------------------------

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
  {
    header: 'Acciones',
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Button
          variant="primary"
          color='accent'
          onClick={() => onReviewClick(row.original)} 
        >
          Revisar
        </Button>
      );
    },
  },
];

// Tus filtros se quedan igual, asegurando que los valores del value coincidan exactamente con los de testDataUser
export const companySearchFilters: filterType[] = [
  {
    value: 'createdAt',
    name: 'Fecha de registro',
    isDate: true,
  },
  {
    value: 'academicLevel', 
    name: 'Escolaridad',
    options: Object.values(educationlevel).map((val) => ({
      label: val,
      value: val
    }))
  }
];