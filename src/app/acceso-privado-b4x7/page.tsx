// app/acceso-privado-b4x7/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import Headersimple from '@/components/ui/header-simple';
import { Button } from '@/components/ui/button';

// Credenciales
const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = 'testpass123';

// Evitar indexación
export const metadata: Metadata = {
  title: 'Acceso privado',
  robots: {
    index: false,
    follow: false,
  },
};

async function adminLogin(formData: FormData) {
  'use server';

  const email = formData.get('email');
  const password = formData.get('password');

  // Comparar
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    
    const cookieStore = await cookies();

    cookieStore.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 día
    });

    redirect('/linker/home/companies');
  }

  // Si es incorrecto
  console.error('Intento de acceso admin fallido', { email });

  // Redirigir a tu landing
  redirect('/');
}

export default function AdminHiddenLoginPage() {
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
          <div className="h-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white p-12 gap-8 w-[696px] shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-normal leading-none tracking-normal text-center text-[#FF7F40]">
                Acceso administrador
              </h1>
            </div>

            
            <form action={adminLogin} className="mt-8 space-y-4">
              <div className="space-y-10">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-900 mb-1"
                  >
                    Correo
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={244}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF7F40]"
                    placeholder="admin@test.com"
                  />
                  <p className="mt-2 text-xs text-zinc-700">
                    Ingresa el correo electrónico registrado.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-900 mb-1"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    maxLength={50}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF7F40]"
                    placeholder="••••••••••"
                  />
                  <p className="mt-2 text-xs text-zinc-700">
                    Escribe tu contraseña de acceso.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                {/* OJO: SIN Link, este botón dispara la Server Action */}
                <Button
                  variant="primary"
                  color="brand"
                  type="submit"
                >
                  Iniciar sesión
                </Button>
              </div>
            </form>

            <div className="space-y-2 text-center text-sm text-gray-600" />
          </div>
        </main>
      </div>
    </>
  );
}
