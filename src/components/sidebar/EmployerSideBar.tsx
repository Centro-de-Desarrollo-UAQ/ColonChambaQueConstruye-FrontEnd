'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseBusiness, Settings, SquarePlus } from 'lucide-react';
import { SidebarNavButton } from './SidebarNavButton';

export default function EmployerSideBar() {
  const pathname = usePathname();

  //Vinculos creados en base al figma
  const navLinks = [
    { href: '/vacantes', label: 'Vacantes', icon:BriefcaseBusiness },
    { href: '/publicar-vacantes', label: 'Publicar Vacantes', icon:SquarePlus },
    { href: '/ajustes', label: 'Ajustes' , icon:Settings},
  ];

  return (
    <nav className="group/sidebar bg-uaq-accent h-screen w-20 hover:w-64 transition-all duration-300 ease-in-out flex flex-col justify-start px-5 pt-5 overflow-hidden">
      {/* Logos alineados */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/UAQ logo.svg" alt="UAQ Logo" width={120} height={120} className="h-7 w-6" />
        </Link>
        <Link href="/" className="hidden group-hover/sidebar:flex items-center transition-opacity duration-300">
          <Image
            src="/BTWhite.svg"
            alt="Bolsa de Trabajo Logo"
            width={120}
            height={120}
            className="h-8 w-30"
          />
        </Link>
      </div>

      {/* Vinculos a posibles nuevas paginas */}
      <div className="text-uaq-default-50 font-futura flex flex-col font-[400] pt-5">
        {navLinks.map(({ href, label, icon:Icon }) => (
          <SidebarNavButton key={href} href={href} label={label} icon={Icon} active={pathname === href} />
        ))}
      </div>
    </nav>
  );
}
