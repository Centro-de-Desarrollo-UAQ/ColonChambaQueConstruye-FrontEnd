'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';


type CodeFormValues = {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
};

interface EmailCodeValidationStepProps {
  email?: string; // correo a mostrar en el texto
  onVerified?: (code: string) => void; // callback cuando el código esté completo
  onBack?: () => void; // para botón atrás (opcional)
  onResend?: () => void; // para "Reenviar código" (opcional)
}

export function EmailCodeValidationStep({
  email,
  onVerified,
  onBack,
  onResend,
}: EmailCodeValidationStepProps) {
  const methods = useForm<CodeFormValues>({
    defaultValues: {
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
    },
  });

  const { control } = methods;

  const onSubmit = (data: CodeFormValues) => {
    const code = `${data.code0 || ''}${data.code1 || ''}${data.code2 || ''}${
      data.code3 || ''
    }${data.code4 || ''}${data.code5 || ''}`;

    // Aquí más adelante vas a pegar la llamada al backend
    if (onVerified) {
      onVerified(code);
    } else {
      console.log('Código capturado:', code);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/ADMON24-27-1-03.png"
            alt="Recuperación de contraseña"
            className="scale-50"
          />
          <h1 className="text-3xl font-medium">Revisa tu correo</h1>
          <p className="text-center">
            Hemos enviado un código de verificación a tu correo registrado
          </p>
          {email && <p className="font-medium">{email}</p>}
          <p>Ingresa el código enviado para continuar</p>
        </div>

        <div className="mt-6 flex flex-row justify-center gap-4">
          {['code0', 'code1', 'code2', 'code3', 'code4', 'code5'].map((name) => (
            <FormInput
              key={name}
              name={name}
              control={control}
              maxChars={1}
              className="w-15 [&_input]:w-15 [&_input]:h-15 [&_input]:text-center [&_input]:text-2xl [&_input]:border [&_input]:rounded-md"
            />
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <div className="flex items-center gap-1 text-sm">
            <p>¿No lo recibiste?</p>
            <button
              type="button"
              className="font-medium text-[#FF7F40]"
              onClick={() => {
                if (onResend) onResend();
                else console.log('Reenviar código (TODO implementar)');
              }}
            >
              Reenviar código
            </button>
          </div>

          <div className="flex gap-2">
            {onBack && (
              <Button
                type="button"
                variant="primary"
                onClick={onBack}
              >
                Volver
              </Button>
            )}
            <Button type="submit">Continuar</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
