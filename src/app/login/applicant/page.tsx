'use client';

import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { LoginFormType, loginSchema } from '@/validations/loginSchema';
import LinkerNavBar from '@/components/linker/LinkerNavBar';
import Header from '@/components/ui/header';
import Headersimple from '@/components/ui/header-simple';

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
         

          <div className="h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white/90 p-12 shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-3xl font-medium">Inicio de sesión</h1>
              <p>Aplicante</p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
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
              <Link href="#" className="text-uaq-brand font-medium underline">
                ¿Eres una empresa que desea publicar vacante?
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
