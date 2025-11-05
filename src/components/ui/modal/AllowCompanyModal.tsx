'use client';

import BaseModalTemplate, { ModalTexts } from "./ConfirmModalTemplate";


export const ALLOW_COMPANY_TEXTS: ModalTexts = {
  title: 'PERMITIR CUENTA DE EMPRESA',
  subtitle: '¿Esta seguro que quiere aprobar esta empresa?',
  cancel: 'Cancelar',
  confirm: 'Aceptar',
};

export default function AllowCompanyModal({
  onClose,
  onConfirm,
  open = true,
}: { onClose: () => void; onConfirm: () => void; open?: boolean }) {
  return (
    <BaseModalTemplate
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      texts={ALLOW_COMPANY_TEXTS}
    />
  );
}
