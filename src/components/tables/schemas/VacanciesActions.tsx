import { Button } from '@/components/ui/button';
import { MenuDots, Document,UsersGroupRounded, CloseSquare, DocumentAdd} from '@solar-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Drawer } from '@/components/ui/drawer';
import DrawerVacante from '@/components/DrawerVacante/DrawerVacante';
import * as React from 'react';
import { Vacancy } from '@/interfaces/vacancy';

export default function RowActions({ row }: { row: { original: Vacancy } }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" color="gray" size="sm_icon">
            <MenuDots weight="Bold" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setOpen(true)}>
            <Document className="text-zinc-800" />

            Ver vacante

          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => console.log('Ver candidatos', row.original.id)}>
            <DocumentAdd className="text-zinc-800" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => console.log('Eliminar', row.original.id)}>
            <CloseSquare className="text-zinc-800" />
            Cerrar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DrawerVacante vacante={row.original} />
    </Drawer>
  );
}
