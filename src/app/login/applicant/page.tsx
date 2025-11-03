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
    console.log('Iniciaste sesión');
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


          <div className="h-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white p-12 gap-8 w-[696px] shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-normal leading-none tracking-normal text-center text-[#FF7F40]">
                Inicio de sesión
              </h1>

            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                <div className="space-y-10">
                  <div>
                    
                    <FormInput
                      control={control}
                      name="email"
                      label="Correo"
                      type="email"
                      maxChars={244}
                    />
                    <p className="mt-2 text-xs text-zinc-700">
                      Ingresa tu correo electrónico registrado.
                    </p>

                  </div>


                  <div>
                    <FormInput
                      control={control}
                      name="password"
                      label="Contraseña"
                      type="password"
                      maxChars={50}
                    />
                    <p className="mt-2 text-xs text-zinc-700">
                      Escribe tu contraseña de acceso.
                    </p>
                  </div>

                </div>

                <div >
                  <Link
                    href="/login/recovery"
                    className="block text-right font-medium no-underline hover:no-underline focus:no-underline"
                    onClick={() => console.log("Le diste click a 'olvidaste contraseña' ")}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1 text-sm">
                    ¿No tienes cuenta?
                    <Link href="../signup/applicant/" className="font-medium no-underline text-[#FF7F40]"
                    onClick={() => console.log("Le diste click a Registrate")}>
                      Regístrate
                    </Link>
                  </p>

                  <Link href={"../applicant/jobs"}>
                    <Button variant="primary" 
                            color="brand" 
                            type="submit"
                            >
                      Iniciar sesión
                    </Button>
                  </Link>
                  
                </div>
              </form>
            </FormProvider>

            <div className="space-y-2 text-center text-sm text-gray-600">
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
