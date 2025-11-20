  'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarNavButton } from './SidebarNavButton';
import { Case,AddSquare,CaseRoundMinimalistic,Settings  } from '@solar-icons/react'


export default function EmployerSideBar() {
  const pathname = usePathname();

  // Aqui tienen que cambiar el href a la ruta definida de su pantalla pueden tomar de ejemplo el de cartera de usuario
  const navLinks = [
    { href: '/employer/home/vacancies', label: 'Vacantes', icon:Case},
    { href: '/employer/home/post', label: 'Publicar vacantes', icon:AddSquare },
    { href: '/employer/home/users', label: 'Cartera de usuarios' , icon: CaseRoundMinimalistic },
    { href: '/employer/profileconfig', label: 'Ajustes',icon: Settings  },
  ];

  return (
    <nav className="group/sidebar bg-white h-screen w-15 hover:w-64 transition-all duration-300 ease-in-out flex flex-col justify-start pt-5 pl-2 pr-2 overflow-hidden stroke-3 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.3)] ">
    

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
      <div className="text-[var(--uaq-selected-hover)] font-futura flex flex-col font-[400] pt-5 items-center group-hover/sidebar:items-stretch">
        {navLinks.map(({ href, label, icon:Icon }) => (
          <SidebarNavButton key={href} href={href} label={label} icon={Icon} active={pathname.startsWith(href)} />
        ))}
      </div>
    </nav>
  );
}
