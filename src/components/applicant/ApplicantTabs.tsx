'use client';
import { Documents, Diploma, UserCircle, ShieldKeyholeMinimalistic } from '@solar-icons/react';
import TabOptions from '../common/TabOptions';

import { InfoCard } from '../settings/InfoCard';
import { useUserStore } from '@/app/store/useUserInfoStore';
export default function ApplicantTabs() {
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

  const {user} = useUserStore()

  let displayName = 'Cargando...';
  let displayEmail = '';
  let displayCellphone: string | null = null;

  if (user) {
    displayName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Usuario';
    displayEmail = user.email ?? '';
    displayCellphone = user.phone ?? null;
  }

  console.log('el user es',user)


  return (
    <div className="mx-auto max-w-md bg-white text-brand">
      <InfoCard
        name={displayName}
        email={displayEmail}
        cellphone={displayCellphone}
      />

      <div className="w-full px-4 pb-8">
        <TabOptions tabs={tabsConfig} defaultTab="profile" />
      </div>
    </div>
  );
}
