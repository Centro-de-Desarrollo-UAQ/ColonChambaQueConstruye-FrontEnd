'use client';

import {UserCircle, Buildings } from '@solar-icons/react';
import TabOptions from '../common/TabOptions';
import { InfoCard } from '../settings/InfoCard';
import { useEmployerProfile } from '@/app/employer/profileconfig/layout';


export default function EmployerTab() {
  const { company, companyAccount } = useEmployerProfile();

    const tabsConfig = [
    {
      value: 'documents',
      route: '/employer/profileconfig/company',
      title: 'Documents',
      icon: <Buildings size={24} />,
      label: 'Información de la empresa',
    },
    {
      value: 'profile',
      route: '/employer/profileconfig',
      title: 'Profile',
      icon: <UserCircle size={24} />,
      label: 'Datos de acceso',
    },
  ];


    const displayName =
    company?.tradeName || company?.legalName || 'Empresa';

  const displayEmail =
    company?.companyEmail || companyAccount?.email || '';

    // Cuando sea necesario mostrar el numero
//   const displayCellphone = companyAccount?.cellPhone ?? '';

    return (
        <div className="mx-auto max-w-md bg-white text-brand">{/*Introducir la información de la empresa*/}
            <InfoCard 
                avatar="<img src='public/Deloitte.svg' alt='Deloitte QRO' />"
                name={displayName}
                email={displayEmail}
                cellphone={''}
            />

            <div className="w-full px-4 pb-8">
                <TabOptions tabs={tabsConfig} defaultTab='profile'/>
            </div>
        </div>
    );
}
