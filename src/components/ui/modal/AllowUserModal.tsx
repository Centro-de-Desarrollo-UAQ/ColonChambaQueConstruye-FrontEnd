'use client';

import BaseModalTemplate, { ModalTexts } from "./ConfirmModalTemplate";


export const ALLOW_USER_TEXTS: ModalTexts = {
  title: 'APROBAR CUENTA DE USUARIO',
  subtitle: '¿Esta seguro que quiere aprobar este usuario?',
  cancel: 'Cancelar',
  confirm: 'Aceptar',
};

export default function AllowUserModal({
  onClose,
  onConfirm,
  open = true,
}: { onClose: () => void; onConfirm: () => void; open?: boolean }) {
  return (
    <BaseModalTemplate
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      texts={ALLOW_USER_TEXTS}
    />
  );
}
