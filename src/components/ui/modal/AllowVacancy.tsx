'use client';

import BaseModalTemplate, { ModalTexts } from "./ConfirmModalTemplate";


export const ALLOW_VACANCY_TEXTS: ModalTexts = {
  title: 'APROBAR VACANTE',
  subtitle: '¿Esta seguro que quiere aprobhar esta vacante?',
  cancel: 'Cancelar',
  confirm: 'Aceptar',
};

export default function AllowVacancyModal({
  onClose,
  onConfirm,
  open = true,
}: { onClose: () => void; onConfirm: () => void; open?: boolean }) {
  return (
    <BaseModalTemplate
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      texts={ALLOW_VACANCY_TEXTS}
    />
  );
}
