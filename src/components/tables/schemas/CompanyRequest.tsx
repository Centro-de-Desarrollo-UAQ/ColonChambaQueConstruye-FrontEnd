'use client';

import { dateToLocaleDateString } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

import SortButton from '../ui/SortButton';
import { Company } from '@/interfaces';

export const companyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton column={column} name="Nombre" />,
  },
  {
    accessorKey: 'representative',
    header: ({ column }) => <SortButton column={column} name="Representante" />,
  },
  {
    accessorKey: 'phoneContact',
    header: 'Contacto',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortButton column={column} name="Fecha de solicitud" />,
    cell: ({ getValue }) => dateToLocaleDateString(getValue() as string),
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const company = row.original;
      return (
        <Button
          size="sm"
          color="accent"
          onClick={() => console.log(`Acción para la empresa: ${company.name}`)}
        >
          Revisar
        </Button>
      );
    },
  },
];
