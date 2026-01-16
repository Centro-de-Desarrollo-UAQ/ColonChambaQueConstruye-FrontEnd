'use client';
import { Diploma, UserCircle, ShieldKeyholeMinimalistic } from '@solar-icons/react';
import TabOptions from '../common/TabOptions';
import { InfoCard } from '../settings/InfoCard';
import { useUserStore } from '@/app/store/useUserInfoStore';

export default function ApplicantTabs() {
  const { user, isLoading } = useUserStore();

  const tabsConfig = [
    {
      value: 'profile',
      route: '/applicant/user/profile',
      icon: <UserCircle size={24} weight="Bold" />,
      label: 'Información de contacto',
    },
    {
      value: 'professional',
      route: '/applicant/user/professionalSummary',
      icon: <Diploma size={24} weight="Bold" />,
      label: 'Perfil profesional',
    },
    {
      value: 'control',
      route: '/applicant/user/control',
      icon: <ShieldKeyholeMinimalistic size={24} weight="Bold" />,
      label: 'Acceso de seguridad',
    },
  ];

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : 'Cargando...';

  return (
    <div className="mx-auto max-w-md bg-white text-brand">
      <InfoCard
        avatar="https://github.com/shadcn.png"
        name={fullName || 'Sin nombre'}
        email={user?.email || 'Sin correo'}
        cellphone={user?.phone || 'Sin teléfono'}
      />

      <div className="w-full px-4 pb-8">
        <TabOptions tabs={tabsConfig} defaultTab="profile" />
      </div>
    </div>
  );
}
