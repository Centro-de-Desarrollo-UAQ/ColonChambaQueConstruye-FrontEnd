'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Headersimple from '@/components/ui/header-simple';
// Eliminamos las importaciones de react-hook-form y zod

// Asegúrate de que el nombre del componente sea "NotFound" 
// si este archivo es 'app/not-found.tsx'
export default function NotFound() {
  
  // Eliminamos toda la lógica de useForm
  
  return (
    <>
      <Headersimple />
      <div
        className="flex min-h-screen flex-col items-center justify-center py-15"
        style={{
          backgroundImage: 'url("/backgroundSignUp.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <main className="flex h-fit flex-col items-center justify-center gap-10">
          
          {/* Agregamos 'flex flex-col items-center' al contenedor 
            para centrar todo su contenido.
          */}
          <div className="h-full max-w-2xl flex flex-col items-center space-y-8 rounded-md border border-gray-300 bg-white p-12 gap-8 w-[696px] shadow-sm">
            
            {/* --- CONTENIDO DE TEXTO MEJORADO --- */}
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold text-[#FF7F40]">
                Error 404
              </h1>
              <h2 className="text-xl font-normal leading-none tracking-normal text-zinc-800">
                ¿Estás seguro de que esta era la dirección?
              </h2>
              <p className="text-md text-gray-600 mt-2">
                Buscamos esta página por todos lados y no la encontramos. Mejor volvamos a la página principal.
              </p>
            </div>
            
            {/* --- BOTÓN CENTRADO Y CORREGIDO --- */}
            <Link href="/">
              <Button 
                variant="primary" 
                color="brand" 
                type="button" // Cambiado de 'submit' a 'button'
              >
                Volver al inicio
              </Button>
            </Link>
            
            {/* El div vacío al final no es necesario */}
          </div>
        </main>
      </div>
    </>
  );
}