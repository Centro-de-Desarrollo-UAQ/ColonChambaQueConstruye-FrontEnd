'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseBusiness, Building2 } from 'lucide-react';
import { SidebarNavButton } from './SidebarNavButton';
import { UserPlusBroken } from 'solar-icons';


export default function EmployerSideBar() {
  const pathname = usePathname();

  //Vinculos creados en base al figma
  const navLinks = [
    { href: '/vacantes', label: 'Empresas', icon:Building2 },
    { href: '/publicar-vacantes', label: 'Vacantes', icon:BriefcaseBusiness},
    { href: '/ajustes', label: 'Usuarios' , icon: UserPlusBroken},
  ];

  return (
    <nav className="group/sidebar bg-uaq-accent h-screen w-15 hover:w-64 transition-all duration-300 ease-in-out flex flex-col justify-start pt-5 pl-4 overflow-hidden">
    

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
      <div className="text-[var(--uaq-selected-hover)] font-futura flex flex-col font-[400] pt-5 items-center pl-2">
        {navLinks.map(({ href, label, icon:Icon }) => (
          <SidebarNavButton key={href} href={href} label={label} icon={Icon} active={pathname === href} />
        ))}
      </div>
    </nav>
  );
}
