'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Form & Validation
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recoverySchema, RecoveryFormType } from '@/validations/recoverySchema';

// State Management
import { useRecoveryStore } from '@/app/store/recoveryPasswordStore';

// UI Components
import HeaderSimple from '@/components/ui/header-simple';
import { Button } from '@/components/ui/button';
import Stepper from '@/components/common/Stepper';
import FormInput from '@/components/forms/FormInput';

// Steps Components
import { EmailCodeValidationStep } from '@/components/auth/EmailCodeValidationStep';
import { RecoverySetPasswordStep } from '@/components/recovey/RecoverySetPasswordStep';
import { RecoverySuccessStep } from '@/components/recovey/RecoverySuccessStep';

// Definición de la respuesta esperada de la API
interface VerifyUserResponse {
  statusCode: number;
  message: string;
  data: {
    ok: boolean;
    verificationId: string;
  };
}

export default function RecoveryPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Store de Zustand
  const { setRecoveryData } = useRecoveryStore();

  const [stepValid, setStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeIsLoading, setCodeIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);

  const methods = useForm<RecoveryFormType>({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const { control, trigger, watch, getValues } = methods;

  // Validación dinámica
  useEffect(() => {
    const sub = watch((value) => {
      if (step === 1) {
        setStepValid(!!value.email);
      } else if (step === 3) {
        setStepValid(
          !!value.password &&
            !!value.confirmPassword &&
            value.password === value.confirmPassword
        );
      } else {
        setStepValid(true);
      }
    });

    return () => sub.unsubscribe();
  }, [step, watch]);

  const handleNextStep = async () => {
    setError(null);
    setCodeError(null);

    if (step === 1) {
      const ok = await trigger('email');
      if (!ok) return;

      setIsSubmitting(true);
      try {
        const { email } = getValues();
        
        const response = await fetch(`/api/v1/verifications/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const result: VerifyUserResponse = await response.json();

        if (!response.ok || result.statusCode !== 201 || !result.data?.ok) {
          throw new Error(result.message || 'El correo no se encuentra registrado o hubo un error.');
        }

        console.log('Usuario verificado, ID:', result.data.verificationId);
        setRecoveryData(email, result.data.verificationId);

        setStep(2);
        setStepValid(true);

      } catch (err) {
        console.error('Error enviando código de recuperación:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Ocurrió un error al verificar el correo. Intenta de nuevo.'
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (step === 3) {
      const ok = await trigger(['password', 'confirmPassword']);
      if (!ok) return;

      setIsSubmitting(true);
      try {
        const { email, password } = getValues();
        console.log('Restablecer contraseña para:', email);
        
        
        setStep(4);
        setStepValid(true);
      } catch (err) {
        console.error('Error al cambiar contraseña:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'No se pudo cambiar la contraseña. Intenta nuevamente.'
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
  };

  const handleCodeVerified = async (code: string) => {
    setCodeError(null);
    setCodeIsLoading(true);
    try {
      const { email } = getValues();
      console.log('Código verificado:', { email, code });
      setStep(3);
    } catch (err) {
      console.error('Error al validar código:', err);
      setCodeError(
        err instanceof Error
          ? err.message
          : 'El código no es válido o ha expirado.'
      );
    } finally {
      setCodeIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setCodeError(null);
    setCodeIsLoading(true);
    try {
      const { email } = getValues();
      console.log('Reenviando código a:', email);
    } catch (err) {
      console.error('Error al reenviar:', err);
      setCodeError('No se pudo reenviar el código.');
    } finally {
      setCodeIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) {
      if (step === 1) return 'Verificando correo...';
      if (step === 3) return 'Actualizando contraseña...';
    }
    if (step === 1) return 'Enviar código';
    if (step === 3) return 'Cambiar contraseña';
    return 'Continuar';
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
            {/* Barra superior */}
            <div className="mb-4 flex items-center gap-4">
              {step === 1 ? (
                <Link href="/">
                  <Button variant="ghost" className="scale-150">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="scale-150"
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}

              <div className="flex-1">
                <Stepper currentStep={step} totalSteps={totalSteps} />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <FormProvider {...methods}>
              <div className="space-y-6">
                {/* STEP 1 – Email */}
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src="/ADMON24-27-1-03.png"
                        alt="Recuperación"
                        className="scale-50"
                      />
                      <h1 className="text-3xl font-medium -space-y-28">
                        ¿Olvidaste tu contraseña?
                      </h1>
                      <p className="text-center">
                        Sigue las instrucciones para restablecer tu contraseña.
                      </p>
                    </div>

                    <div className="space-y-10 mt-8">
                      <FormInput
                        name="email"
                        label="Correo electrónico"
                        type="email"
                        placeholder="Ingresa tu correo"
                        control={control}
                        maxChars={244}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <EmailCodeValidationStep
                      email={getValues('email') || 'Tu correo'}
                      onVerified={handleCodeVerified}
                      onBack={() => setStep(1)}
                      onResend={handleResendCode}
                    />
                    {codeError && (
                      <p className="text-sm text-center text-red-600">{codeError}</p>
                    )}
                    {codeIsLoading && (
                      <p className="text-xs text-center text-muted-foreground">Procesando...</p>
                    )}
                  </div>
                )}

                {step === 3 && <RecoverySetPasswordStep />}

                {step === 4 && <RecoverySuccessStep />}

                {(step === 1 || step === 3) && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!stepValid || isSubmitting}
                    >
                      {getButtonText()}
                    </Button>
                  </div>
                )}
              </div>
            </FormProvider>
          </div>
        </main>
      </div>
    </>
  );
}