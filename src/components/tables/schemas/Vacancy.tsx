'use client';

import { dateToLocaleDateString } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { accentInsensitiveTextFilter } from '@/validations/filtersTanStack';
import {
  MenuDots,
  Document,
  MedalRibbonStar,
  TrashBinMinimalistic,
  CheckRead,
  Star2,
  CloseCircle,
} from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import SortButton from '../ui/SortButton';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Candidate } from '@/interfaces';

export const candidateColumns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <SortButton column={column} name="Nombre" />
    ),
    filterFn: accentInsensitiveTextFilter,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <SortButton column={column} name="Estado" />
    ),
    cell: ({ getValue }) => {
      const status = getValue() as Candidate['status'];
      const statusMap: Record<Candidate['status'], string> = {
        toreview: 'Por revisar',
        candidate: 'Candidato',
        rejected: 'Descartado',
        approved: 'Aprobado',
      };
      return (
        // Display the status with a badge
        <Badge
          variant={
            status === 'approved'
              ? 'outline'
              : status === 'candidate'
                ? 'success'
                : status === 'toreview'
                  ? 'warning'
                  : 'danger'
          }
        >
          {status === 'approved' ? (
            <MedalRibbonStar />
          ) : status === 'candidate' ? (
            <CheckRead />
          ) : status === 'toreview' ? (
            <Star2 />
          ) : (
            <CloseCircle />
          )}
          {statusMap[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <SortButton column={column} name="Fecha de postulación" />
    ),
    cell: ({ getValue }) => (
      dateToLocaleDateString(getValue() as string)
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" color="gray" size="sm_icon">
            <MenuDots weight="Bold" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => console.log('Ver detalles', row.original.id)}>
            <Document className="text-zinc-800" />
            Ver CV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Editar', row.original.id)}>
            <MedalRibbonStar className="text-zinc-800" />
            Aprobar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log('Eliminar', row.original.id)}>
            <TrashBinMinimalistic className="text-zinc-800" />
            Descartar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
