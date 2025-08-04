'use client';

import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { LoginFormType, loginSchema } from '@/validations/loginSchema';

export default function PublicLogin() {
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
    // Lógica de envío del formulario aquí
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Contenido principal */}
      <main className="flex flex-grow flex-col items-center justify-center py-20">
        <div className="flex gap-10 p-15">
          <Image
            src="/UAQBlack.svg"
            alt="UAQ Logo"
            width={100}
            height={100}
            className="h-18 w-auto"
          />
          <Image
            src="/BTBlack.svg"
            alt="UAQ Logo"
            width={100}
            height={100}
            className="h-18 w-auto"
          />
        </div>

        <div className="w-full max-w-2xl space-y-8 rounded-md border border-gray-300 p-12 shadow-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Inicio de sesión</h1>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
              <div className="space-y-10">
                <FormInput
                  control={control}
                  name="email"
                  label="Correo electrónico"
                  type="email"
                  maxChars={244}
                />
                <FormInput
                  control={control}
                  name="password"
                  label="Contraseña"
                  type="password"
                  maxChars={50}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1 text-sm">
                  ¿No tienes cuenta?
                  <Link href="#" className="font-medium underline">
                    Regístrate
                  </Link>
                </p>
                <Button variant="primary" color="brand" type="submit">
                  Iniciar sesión
                </Button>
              </div>
            </form>
          </FormProvider>

          <div className="space-y-2 text-center text-sm text-gray-600">
            <Link href="#" className="font-medium text-[color:var(--color-uaq-brand)] underline">
              ¿Eres una empresa que desea publicar vacante?
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-300 bg-zinc-100 py-6 text-center text-sm">
        <span>Centro de Desarrollo © 2025</span>
      </footer>
    </div>
  );
}
