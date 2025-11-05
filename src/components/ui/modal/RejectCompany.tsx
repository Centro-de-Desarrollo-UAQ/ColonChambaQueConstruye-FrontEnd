'use client';


import RejectModalTemplate, { ModalTexts } from "./RejectModalTemplate";

type RejectCompanyModalProps = {
  open?: boolean;
  onClose: () => void;
  onConfirm: (data: { reason: string }) => void;
  companyName: string;
  roleTitle?: string;
};

export const TEXTS: ModalTexts = {
    title: 'RECHAZAR CUENTA DE EMPRESA',
    subtitle: '',
    content: '',
    cancel: 'Cancelar',
    confirm: 'Rechazar cuenta',
  };

export default function RejectCompanyModal({
  onClose,
  onConfirm,
  open = true,
  companyName,
  roleTitle,
}: RejectCompanyModalProps) {
  return (
    <RejectModalTemplate
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      texts={TEXTS}
      description="¿Por qué no se aprobó esta empresa?"
       vacancy={{
        companyName,
        roleTitle, 
      }}
    />
  );
}
