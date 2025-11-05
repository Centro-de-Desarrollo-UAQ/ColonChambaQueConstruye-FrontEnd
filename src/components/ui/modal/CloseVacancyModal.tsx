'use client';

import BaseModalTemplate, { ModalTexts } from "./ConfirmModalTemplate";


export const CLOSE_VACANCY_TEXTS: ModalTexts = {
  title: 'CERRAR VACANTE',
  subtitle: '¿Está seguro que quiere cerrar esta vacante?',
  cancel: 'Cancelar',
  confirm: 'Aceptar',
};

export default function CloseVacancyModal({
  onClose,
  onConfirm,
  open = true,
}: { onClose: () => void; onConfirm: () => void; open?: boolean }) {
  return (
    <BaseModalTemplate
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      texts={CLOSE_VACANCY_TEXTS}
    />
  );
}
