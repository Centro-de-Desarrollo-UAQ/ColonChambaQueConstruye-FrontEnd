import { Button } from '@/components/ui/button';
import { MenuDots, Eye, UsersGroupRounded, CloseSquare, DocumentAdd, Document, CloseCircle } from '@solar-icons/react';
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
import { useState } from 'react';
import CloseVacancyModal from '@/components/ui/modal/CloseVacancyModal';
import { Close } from '@radix-ui/react-dialog';
import { VacancyRow } from '@/app/employer/home/vacancies/page';
import { VacancyU } from '@/interfaces/vacancyUpdate';

export default function RowActions({ row }: { row: { original: VacancyRow } }) {
  const [open, setOpen] = React.useState(false);

  const [showCloseVacancy, setShowCloseVacancy] = useState(false);

  const handleCloseVacancyConfirm = () => {
    console.log('Vacante cerrada:', row.original.id);
    setShowCloseVacancy(false);
  };

  function handleEditVacancy(id: string) {
    console.log("Editar vacante: " + id)
    window.location.href = `/employer/home/vacancies/edit/${id}`;
  }

  const openCloseVacancyModal = () => setShowCloseVacancy(true);
  const closeCloseVacancyModal = () => setShowCloseVacancy(false);

  return (
    <>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" color="gray" size="sm_icon">
              <MenuDots weight="Bold" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditVacancy(row.original.id)}>
              <DocumentAdd className="text-zinc-800" />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={() => setOpen(true)}>
              <Document className="text-zinc-800" />
              Ver vacante
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={openCloseVacancyModal}>
              <CloseCircle className="text-zinc-800" />
              Cerrar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DrawerVacante vacancyId={row.original.id} />
      </Drawer>

      <div className="mb-6 space-y-4">
        {showCloseVacancy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <CloseVacancyModal onConfirm={handleCloseVacancyConfirm} onClose={closeCloseVacancyModal} />
           </div>
        )}
      </div> 
    </>
  );
}
