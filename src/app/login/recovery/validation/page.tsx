'use client';

import FormInput from '@/components/forms/FormInput';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import HeaderSimple from '@/components/ui/header-simple';
import Link from 'next/link';
import {useForm,FormProvider} from 'react-hook-form';
import { ArrowBigLeft, ArrowLeft, MoveLeft } from 'lucide-react';

export default function Page() {
  //Almacenar los valores del código 
  const methods = useForm<Record<string, string>>({
    defaultValues: {
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
    },
  });

  const { control,handleSubmit } = methods;

  const onSubmit = (data: Record<string, string>) => {
      // Combinar los inputs individuales
      const code = `${data.code0 || ''}${data.code1 || ''}${data.code2 || ''}${data.code3 || ''}${data.code4 || ''}${data.code5 || ''}`;
      // Método para verificar que el código ingresado y el código enviado sean correctos
    };

    
  return (
    <>
      <HeaderSimple />
      <div className="flex min-h-screen flex-col items-center justify-center py-1"
        style={{
          backgroundImage: 'url("/backgroundSignUp.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}>
       <main className="flex h-fit flex-col items-center justify-center gap-10">

        <div className='h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white px-12 py-6 shadow-sm'>
            <Link href="/login/recovery">
              <Button variant="ghost" className='scale-150'>
                <ArrowLeft className="h-50 w-50" />
              </Button>
            </Link>
            <div className="flex flex-col items-center gap-4">
               <img src="/ADMON24-27-1-03.png" alt="Recuperación de contraseña" className="scale-50"/>
              <h1 className="text-3xl font-medium -space-y-28">Revisa tu correo</h1>
              <p className="text-center">Hemos enviado un código de verificación a tu correo registrado</p>
              <p>
                {//Correo del usuario
                }
              </p>
              <p>
                  Ingresa el código a enviado para continuar
              </p>
            </div>

              <FormProvider {...methods}> 
                  <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 space-y-4">
                    <div className="space-y-10 flex flex-row gap-10 justify-center">
            <div>
              <FormInput
                name="code0"
                control={control}
                maxChars={1}
                className='w-15 [&_input]:w-15 [&_input]:h-15 [&_input]:text-center [&_input]:text-2xl [&_input]:border [&_input]:rounded-md'
              />
            </div>
            <div>
              <FormInput
                name="code1"
                control={control}
                maxChars={1}
                className='w-15 [&_input]:w-15 [&_input]:h-15 [&_input]:text-center [&_input]:text-2xl [&_input]:border [&_input]:rounded-md'
              />
            </div>
            <div>
              <FormInput
                name="code2"
                control={control}
                maxChars={1}
                className='w-15 [&_input]:w-15 [&_input]:h-15 [&_input]:text-center [&_input]:text-2xl [&_input]:border [&_input]:rounded-md'
              />
            </div>
            <div>
              <FormInput
                name="code3"
                control={control}
                maxChars={1}
                className='w-15 [&_input]:w-15 [&_input]:h-15 [&_input]:text-center [&_input]:text-2xl [&_input]:border [&_input]:rounded-md'
              />
            </div>
            <div>
              <FormInput
                name="code4"
                control={control}
                maxChars={1}
                className='w-15 [&_input]:w-15 [&_input]:h-15 [&_input]:text-center [&_input]:text-2xl [&_input]:border [&_input]:rounded-md'
              />
            </div>
            <div>
              <FormInput
                name="code5"
                control={control}
                maxChars={1}
                className='w-15 [&_input]:w-15 [&_input]:h-15 [&_input]:text-center [&_input]:text-2xl [&_input]:border [&_input]:rounded-md'
              />
            </div>
                       
                    </div>

                    <div className="flex justify-between mt-8">
                      <div className='flex'>
                        <p>¿No lo recibiste?   </p>
                        <Link href="#" className="font-medium no-underline text-[#FF7F40]"
                          onClick={() => console.log("Le diste click a Reenviar código")}>
                          Reenviar código {
                            //Reenviar el código de verificación al email del usuario
                          }
                        </Link>
                      </div>
                      <Button type="submit">
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
