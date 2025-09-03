'use client';
import { Documents, Diploma, UserCircle, ShieldKeyholeMinimalistic } from '@solar-icons/react';
import TabOptions from '../common/TabOptions';

import { InfoCard } from '../settings/InfoCard';
export default function ApplicantTabs() {
  const tabsConfig = [
    {
      value: 'profile',
      route: '/applicant/profile',
      icon: <UserCircle size={24} weight="Bold" />,
      label: 'Información de contacto',
    },
    {
      value: 'professional',
      route: '/applicant/professionalSummary',
      icon: <Diploma size={24} weight="Bold" />,
      label: 'Perfil profesional',
    },
    {
      value: 'curriculum',
      route: '/applicant/resume',
      icon: <Documents size={24} weight="Bold" />,
      label: 'Curriculum',
    },
    {
      value: 'control',
      route: '/applicant/control',
      icon: <ShieldKeyholeMinimalistic size={24} weight="Bold" />,
      label: 'Acceso de seguridad',
    },
  ];

  return (
    <div className="mx-auto max-w-md bg-white">
      <InfoCard
        avatar="https://github.com/shadcn.png"
        name="Jane Daw"
        email="Hosea28@yahoo.com"
        cellphone="+52 441 441 22 22"
      />

      <div className="w-full px-4 pb-8">
        <TabOptions tabs={tabsConfig} defaultTab="profile" />
      </div>
    </div>
  );
}
