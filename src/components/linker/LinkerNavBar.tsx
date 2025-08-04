'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ButtonNavBar } from '@/components/navbar/ButtonNavBar';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function LinkerNavBar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/servicios', label: 'Servicios UAQ' },
    { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
    { href: '/publicar-empleos', label: 'Publicar empleos' },
  ];

  return (
    <nav className="bg-uaq-accent flex items-center justify-between px-20">
      {/* Logos alineados */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image src="/UAQ logo.svg" alt="UAQ Logo" width={120} height={120} className="h-7 w-6" />
        </Link>
        <Link href="/">
          <Image
            src="/BTWhite.svg"
            alt="Bolsa de Trabajo Logo"
            width={120}
            height={120}
            className="h-8 w-30"
          />
        </Link>
      </div>

      {/* Categorías */}
      <div className="text-zinc-50 font-futura flex font-[400]">
        {navLinks.map(({ href, label }) => (
          <ButtonNavBar
            key={href}
            asChild
            variant="default"
            size="default"
            className={`hover:text-uaq-primary relative ${
              pathname === href ? 'text-uaq-primary' : ''
            }`}
          >
            <a href={href}>
              {label}
              {pathname === href && (
                <span className="bg-uaq-primary absolute bottom-[-4px] left-0 h-[2px] w-full"></span>
              )}
            </a>
          </ButtonNavBar>
        ))}
      </div>

      {/* Ingresar */}
      <Button
        onClick={() => (window.location.href = '/publicar-empleos')}
        variant="ghost"
        size="default"
      >
        Ingresar
      </Button>
    </nav>
  );
}
