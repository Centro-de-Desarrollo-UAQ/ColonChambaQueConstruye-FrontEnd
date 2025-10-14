'use client';

import FormInput from '@/components/forms/FormInput';
import HeaderSimple from '@/components/ui/header-simple';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {useForm,FormProvider} from 'react-hook-form';


export default function Page() {

    const methods = useForm<{ password: string; confirmPassword: string }>({
        defaultValues: {
          password: '',
          confirmPassword: '',
        },
        mode: 'onSubmit',
      });

      const { control,handleSubmit,setError,clearErrors,watch } = methods;

      // Reglas de validación de contraseña
      const getPasswordErrors = (pw: string) => {
        const errors: string[] = [];
        if (!pw || pw.length < 8) errors.push('Mínimo 8 caracteres');
        if (!/[A-Z]/.test(pw)) errors.push('Requiere mayúscula');
        if (!/[a-z]/.test(pw)) errors.push('Requiere minúscula');
        if (!/[0-9]/.test(pw)) errors.push('Requiere número');
        return errors;
      };

      // Ver la contraseña y confirmación en tiempo real
      React.useEffect(() => {
        const subscription = watch((value) => {
          const pw = value.password ?? '';
          const cpw = value.confirmPassword ?? '';

          const pwErrors = getPasswordErrors(pw);
          if (pwErrors.length > 0) {
            setError('password' as any, { type: 'manual', message: pwErrors.join('. ') });
          } else {
            clearErrors('password');
          }

          // Confirmar que coinciden las contraseñas
          if (cpw && pw !== cpw) {
            setError('confirmPassword' as any, { type: 'manual', message: 'Las contraseñas no coinciden' });
          } else {
            const confirmErrors = getPasswordErrors(cpw);
            if (cpw && confirmErrors.length > 0) {
              setError('confirmPassword' as any, { type: 'manual', message: confirmErrors.join('. ') });
            } else {
              if (!cpw || pw === cpw) clearErrors('confirmPassword');
            }
          }
        });

        return () => subscription.unsubscribe();
      }, [watch, setError, clearErrors]);

      // Al enviar el formulario se ve si hay errores
      const onSubmit = (data: { password: string; confirmPassword: string }) => {
          const pwErrors = getPasswordErrors(data.password);
          if (pwErrors.length > 0) {
            setError('password' as any, { type: 'manual', message: pwErrors.join('. ') });
            return;
          }

          if (data.password !== data.confirmPassword) {
            setError('confirmPassword' as any, { type: 'manual', message: 'Las contraseñas no coinciden' });
            return;
          }

          //Se envía a la página redirección
          console.log('Las contraseñas coinciden, pasar a redirection');
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
            <div className="flex flex-col items-center gap-4">
               <img src="/ADMON24-27-1-03.png" alt="Recuperación de contraseña" className="scale-50"/>
              <h1 className="text-3xl font-medium -space-y-28">RESTABLECE TU CONTRASEÑA</h1>
              <p className="text-center">Elige una nueva contraseña para tu cuenta</p>
            </div>

              <FormProvider {...methods}> 
                  <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 space-y-4">
                    <div className="space-y-10 ">
                      <FormInput
                        control={control}
                        name="password"
                        label="Contraseña"
                        type="password"
                        maxChars={50}
                      />
                      <FormInput
                        control={control}
                        name="confirmPassword"
                        label="Confirma tu contraseña"
                        type="password"
                        maxChars={50}
                      />
                    </div>
                    <div className="items-center text-center mt-8">
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
