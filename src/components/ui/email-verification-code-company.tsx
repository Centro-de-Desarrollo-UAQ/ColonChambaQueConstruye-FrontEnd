'use client';

import { useState, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormOTPValidation } from '@/components/forms/FormOTPValidation';
import { Button } from '@/components/ui/button';
import { useCompanyStore } from '@/app/store/authCompanyStore';

interface OtpInputProps {
  length?: number;
  onChange?: (code: string) => void;
  onSuccess?: () => void;
}

export default function EmailVerificationCodeCompany({
  length = 6,
  onChange,
  onSuccess,
}: OtpInputProps) {
  // 👇 AQUÍ EL CAMBIO: usamos companyId, no id
  const { companyId, token } = useCompanyStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm({ defaultValues: { otp: Array(length).fill('') } });
  const { control, watch, handleSubmit } = methods;
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const otpValues = watch('otp');
  const otpCode = (otpValues || []).join('');

  const onSubmit = async () => {
    if (!companyId) {
      setError(
        'No se encontró el ID de la empresa. Por favor intenta registrarte de nuevo.'
      );
      return;
    }

    if (otpCode.length < length) {
      setError('Por favor completa el código de verificación.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Validando empresa ${companyId} con código: ${otpCode}`);

      const response = await fetch(
        `/api/v1/validation-email/company/${companyId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ code: parseInt(otpCode, 10) }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = Array.isArray(result.message)
          ? result.message[0]
          : result.message;
        throw new Error(errorMsg || 'Código incorrecto o expirado.');
      }

      onChange?.(otpCode);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : 'Error al validar el código'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto my-8 flex w-full max-w-md flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-xl font-semibold text-brand">
          Revisa tu correo
        </h3>
        <p className="text-sm text-gray-500">
          Hemos enviado un código de verificación al correo de tu empresa.
          Ingrésalo para continuar.
        </p>
      </div>

      {error && (
        <div className="mb-4 w-full rounded-md border border-red-100 bg-red-50 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center"
        >
          <div className="flex w-full justify-center gap-2 sm:gap-3">
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
            className="mt-8 w-full max-w-xs"
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Validar Código'}
          </Button>

          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-gray-400 underline hover:text-brand"
              onClick={() => alert('Funcionalidad de reenvío pendiente')}
            >
              ¿No recibiste el código? Reenviar
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
