'use client';
import BaseModalTemplate, { ModalTexts } from './ConfirmModalTemplate'; 

interface ConfirmRequestReviewModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmRequestReviewModal({ open, onClose, onConfirm }: ConfirmRequestReviewModalProps) {
  const texts: ModalTexts = {
    title: 'Solicitar revisión',
    subtitle: 'Al darle click se enviará a evaluar tu perfil nuevamente.',
    cancel: 'Cancelar',
    confirm: 'Aceptar',
  };

  return (
    <BaseModalTemplate
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      texts={texts}
    />
  );
}