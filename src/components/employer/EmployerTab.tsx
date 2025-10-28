'use client';

import {UserCircle, Buildings } from '@solar-icons/react';
import TabOptions from '../common/TabOptions';
import { InfoCard } from '../settings/InfoCard';


export default function EmployerTab() {
  const tabsConfig = [
    {
        value:"documents",
        route:"/employer/home/company",
        title: 'Documents',
        icon: <Buildings size={24} />,
        label:"Información de la empresa"
    },
    {
        value:"profile",
        route:"/employer/home/access",
        title: 'Profile',
        icon: <UserCircle size={24} />,
        label:"Datos de acceso"
    },
  ]; 

    return (
        <div className="mx-auto max-w-md bg-white text-brand">{/*Introducir la información de la empresa*/}
            <InfoCard 
                avatar="<img src='public/Deloitte.svg' alt='Deloitte QRO' />"
                name="Deloitte QRO"
                email="contacto.qro@deloitte.com"
                cellphone=""
            />

            <div className="w-full px-4 pb-8">
                <TabOptions tabs={tabsConfig} defaultTab='profile'/>
            </div>
        </div>
    );
}
