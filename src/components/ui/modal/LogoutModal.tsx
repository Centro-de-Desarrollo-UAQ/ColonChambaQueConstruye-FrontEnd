'use client';

import BaseModalTemplate, { ModalTexts } from "./ConfirmModalTemplate";


export const LOGOUT_TEXTS: ModalTexts = {
  title: 'CERRAR SESIÓN',
  subtitle: '¿Está seguro que quiere cerrar sesión?',
  cancel: 'Cancelar',
  confirm: 'Aceptar',
};

export default function LogoutModal({
  onClose,
  onConfirm,
  open = true,
}: { onClose: () => void; onConfirm: () => void; open?: boolean }) {
  return (
    <BaseModalTemplate
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      texts={LOGOUT_TEXTS}
    />
  );
}
