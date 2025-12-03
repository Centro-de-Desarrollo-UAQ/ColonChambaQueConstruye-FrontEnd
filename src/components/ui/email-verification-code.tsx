'use client';

import { useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormOTPValidation } from '../forms/FormOTPValidation';
import { Button } from '@/components/ui/button';
import { useApplicantStore } from '@/app/store/authApplicantStore';

interface OtpInputProps { 
  length?: number;
  onChange?: (code: string) => void;
  onSuccess?: () => void; // Callback vital para avanzar al siguiente paso
}

export default function EmailVerificationCode({ length = 6, onChange, onSuccess }: OtpInputProps) {
  const { id: userId, token } = useApplicantStore(); // Obtenemos credenciales del store
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm({ defaultValues: { otp: Array(length).fill('') } });
  const { control, watch, handleSubmit } = methods;
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Observamos los cambios para concatenar el código
  const otpValues = watch('otp');
  const otpCode = (otpValues || []).join('');

  const onSubmit = async () => {
    // Validaciones previas
    if (!userId) {
      setError("No se encontró el ID del usuario. Por favor intenta registrarte de nuevo.");
      return;
    }

    if (otpCode.length < length) {
      setError("Por favor completa el código de verificación.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(` ${userId}: ${otpCode}`);

      // Petición al endpoint de validación
      const response = await fetch(`/api/v1/validation-email/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token obtenido del store
        },
        // CORRECCIÓN: Convertimos el código a número entero (Integer)
        body: JSON.stringify({ code: parseInt(otpCode, 10) }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Manejo de errores que vienen como array de mensajes
        const errorMsg = Array.isArray(result.message) ? result.message[0] : result.message;
        throw new Error(errorMsg || 'Código incorrecto o expirado.');
      }


      
      // Notificamos al componente padre (ApplicantSignUp) para que avance al paso 3
      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error al validar el código');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full mx-auto my-8 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500'>
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-brand">Revisa tu correo</h3>
          <p className="text-sm text-gray-500">
            Hemos enviado un código de verificación a tu correo registrado.
            Ingrésalo para continuar.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md w-full text-center border border-red-100">
          </div>
        )}

        <FormProvider {...methods}>
          <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center w-full"
          >
              <div className="flex gap-2 sm:gap-3 justify-center w-full">
                {Array.from({ length }).map((_, i) => (
                    <FormOTPValidation
                      key={i}
                      control={control}
                      name={`otp.${i}`}
                      index={i}
                      total={length}
                      inputsRef={refs}
                    />
                ))}
              </div>

              <Button 
                variant="primary" 
                color="brand" 
                type="submit" 
                className='mt-8 w-full max-w-xs'
                disabled={isLoading}
              >
                {isLoading ? 'Verificando...' : 'Validar Código'}
              </Button>
              
              <div className="mt-4 text-center">
                <button 
                  type="button" 
                  className="text-sm text-gray-400 hover:text-brand underline"
                  onClick={() => alert("Funcionalidad de reenvío pendiente")}
                >
                  ¿No recibiste el código? Reenviar
                </button>
              </div>
          </form>
        </FormProvider>
    </div>
  );
}