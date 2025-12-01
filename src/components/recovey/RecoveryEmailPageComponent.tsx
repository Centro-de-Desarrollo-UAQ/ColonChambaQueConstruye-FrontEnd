'use client';

import FormInput from '@/components/forms/FormInput';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import HeaderSimple from '@/components/ui/header-simple';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { LoginFormType, loginSchema } from '@/validations/loginSchema';
import { ArrowLeft } from 'lucide-react';

export function RecoveryEmailPageComponent() {
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: LoginFormType) => {
    // Enviar el código de recuperación al correo
    console.log('Datos enviados:', data);

    // Llamada a la API
    // TODO: authService.requestRecoveryCode(data.email)
  };

  return (
    <>
      <HeaderSimple />

      <div
        className="flex min-h-screen flex-col items-center justify-center py-1"
        style={{
          backgroundImage: 'url("/backgroundSignUp.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <main className="flex h-fit flex-col items-center justify-center gap-10">
          <div className="h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white px-12 py-6 shadow-sm">

            {/* Botón regresar */}
            <Link href="/">
              <Button variant="ghost" className="scale-150">
                <ArrowLeft className="h-50 w-50" />
              </Button>
            </Link>

            {/* Encabezado */}
            <div className="flex flex-col items-center gap-4">
              <img
                src="/ADMON24-27-1-03.png"
                alt="Recuperación de contraseña"
                className="scale-50"
              />
              <h1 className="text-3xl font-medium -space-y-28">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="text-center">
                No te preocupes, si sucede solo sigue las instrucciones para crear una nueva contraseña
              </p>
            </div>

            {/* Formulario */}
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div className="space-y-10">
                  <FormInput
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    control={control}
                    maxChars={244}
                  />
                </div>

                <div className="items-center text-center mt-8">
                  <Button
                    type="submit"
                    onClick={() => console.log('Continuar a validation')}
                  >
                    Continuar
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </main>
      </div>
    </>
  );
}
