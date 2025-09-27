'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarNavButtonAdmin } from './SidebarNavButtonAdmin';
import { UserPlusRounded } from '@solar-icons/react'
import { Case } from '@solar-icons/react'
import { Buildings2 } from '@solar-icons/react'


export default function AdminSideBar() {
  const pathname = usePathname();

  //Vinculos creados en base al figma
  const navLinks = [
    { href: '/testing/plantilla/Mateo', label: 'Empresas', icon: Buildings2 },
    { href: '/publicar-vacantes', label: 'Vacantes', icon: Case },
    { href: '/Cartera de usuarios', label: 'Usuarios', icon: UserPlusRounded }, 
  
  ];

  return (
    <nav className="group/sidebar bg-uaq-accent h-screen w-15 hover:w-64 transition-all duration-300 ease-in-out flex flex-col justify-start pt-5 pl-2 pr-2 overflow-hidden stroke-3 shadow-[4px_0_8px_rgba(0,0,0,0.3)]">

      {/* Logos alineados */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/colon_logo.png" alt="UAQ Logo" width={100} height={100} className="h-10 w-10 group-hover/sidebar:hidden 
          0" />
        </Link>

        <Link href="/" className="hidden group-hover/sidebar:flex transition-opacity duration-200">
          <Image
            src="/Empleate_Colon_Logo.png"
            alt="Bolsa de Trabajo Logo"
            width={100}
            height={100}
            className="h-30 w-30"
          />
        </Link>
      </div>

      {/* Vinculos a posibles nuevas paginas */}
      <div className="text-[var(--uaq-terniary)] font-futura flex flex-col font-[400] pt-5 items-center pl-2">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <SidebarNavButtonAdmin key={href} href={href} label={label} icon={Icon} active={pathname === href} />
        ))}
      </div>
    </nav>
  );
}
