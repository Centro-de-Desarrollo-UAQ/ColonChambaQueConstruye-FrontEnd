//TODO: Add the new profile button
'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Case, Document, HomeAngle } from '@solar-icons/react';
import { ButtonNavBar } from '../navbar/ButtonNavBar';

export default function ApplicantNavBar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/inicio', label: 'INICIO', icon: <HomeAngle weight="Bold" size={24} /> },
    { href: '/empleos', label: 'EMPLEOS', icon: <Case weight="Bold" size={24} /> },
    { href: '/curriculums', label: 'CURRICULUMS', icon: <Document weight="Bold" size={24} /> },
    { href: '/alertas', label: 'ALERTAS', icon: <Bell weight="Bold" size={24} /> },
  ];

  return (
    <nav className="bg-uaq-accent flex h-[3rem] items-center justify-between px-20">
      {/* Logo de "Bolsa de Trabajo" alineado a la izquierda */}
      <div className="flex items-center">
        <Link href="/">
          <Image src="/UAQ logo.svg" alt="UAQ Logo" width={120} height={120} className="h-6 w-6" />
        </Link>
        <Link href="/">
          <Image
            src="/BTWhite.svg"
            alt="Bolsa de Trabajo Logo"
            width={120}
            height={120}
            className="h-5 w-25"
          />
        </Link>
      </div>

      {/* Categorías y avatar alineados a la derecha */}
      <div className="ml-auto flex h-full items-center gap-6">
        {/* Categorías */}
        <div className="text-uaq-default-50 font-futura flex h-full font-[400]">
          {navLinks.map(({ href, label, icon }) => (
            <Link key={href} href={href} className="h-full">
              <ButtonNavBar
                variant={pathname === href ? 'active' : 'hover'}
                size="sm"
                className="flex h-full items-center gap-2 px-6"
              >
                {icon}
                {label}
              </ButtonNavBar>
            </Link>
          ))}
        </div>

        {/* Avatar */}
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
