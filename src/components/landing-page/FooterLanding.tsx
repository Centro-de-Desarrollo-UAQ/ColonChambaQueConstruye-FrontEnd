'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FooterLanding() {
  return (
    <div className="bg-zinc-50 pt-20 pb-10">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Columna 1: Logo */}
          <div>
            <Link href="/">
              <Image
                src="/BTBlack.svg"
                alt="Bolsa de Trabajo Logo"
                width={120}
                height={120}
                className="h-8 w-30"
              />
            </Link>
          </div>

          {/* Columna 2: Institucional */}
          <div className="p-4">
            <h3 className="text-zinc-800 mb-4 text-lg font-bold">Institucional</h3>
            <p className="mt-8">
              <Link href="/oferta-educativa" className="text-uaq-primary hover:underline">
                Oferta educativa
              </Link>
            </p>
            <p className="mt-8">
              <Link href="/servicios" className="text-uaq-primary hover:underline">
                Servicios
              </Link>
            </p>
            <p className="mt-8">
              <Link href="/aviso-legal" className="text-uaq-primary hover:underline">
                Aviso legal y privacidad
              </Link>
            </p>
          </div>

          {/* Columna 3: Empresas */}
          <div className="p-4">
            <h3 className="text-zinc-800 mb-4 text-lg font-bold">Empresas</h3>
            <p className="mt-8">
              <Link href="/registro-empresas" className="text-uaq-primary hover:underline">
                Registro de empresas
              </Link>
            </p>
            <p className="mt-8">
              <Link href="/inicio-sesion-empresas" className="text-uaq-primary hover:underline">
                Inicio de sesión de empresas
              </Link>
            </p>
            <p className="mt-8">
              <Link href="/preguntas-empresas" className="text-uaq-primary hover:underline">
                Preguntas y respuestas de empresas
              </Link>
            </p>
          </div>

          {/* Columna 4: Candidatos */}
          <div className="p-4">
            <h3 className="text-zinc-800 mb-4 text-lg font-bold">Candidatos</h3>
            <p className="mt-8">
              <Link href="/registro-candidatos" className="text-uaq-primary hover:underline">
                Registro de candidatos
              </Link>
            </p>
            <p className="mt-8">
              <Link href="/inicio-sesion-candidatos" className="text-uaq-primary hover:underline">
                Inicio de sesión de candidatos
              </Link>
            </p>
            <p className="mt-8">
              <Link href="/preguntas-candidatos" className="text-uaq-primary hover:underline">
                Preguntas y respuestas de candidatos
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
