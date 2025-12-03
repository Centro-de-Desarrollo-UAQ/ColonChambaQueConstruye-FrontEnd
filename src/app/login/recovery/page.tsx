'use client';

import React, { useEffect, useState } from 'react';
import HeaderSimple from '@/components/ui/header-simple';
import { Button } from '@/components/ui/button';
import Stepper from '@/components/common/Stepper';
import FormInput from '@/components/forms/FormInput';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { EmailCodeValidationStep } from '@/components/auth/EmailCodeValidationStep';
import { RecoverySetPasswordStep } from '@/components/recovey/RecoverySetPasswordStep';
import { RecoverySuccessStep } from '@/components/recovey/RecoverySuccessStep';

// import { authService } from '@/services/auth.service'; // cuando conectes el back

// ─────────────────────────────────────────────
// 1. Esquema del formulario global
// ─────────────────────────────────────────────
const recoverySchema = z
  .object({
    email: z
      .string()
      .min(1, 'El correo es obligatorio')
      .max(244, 'El correo es demasiado largo')
      .email('Ingresa un correo válido'),

    password: z
      .string()
      .optional(),

    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // si no estamos en el step de contraseña todavía, no forzamos nada
      if (!data.password && !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      path: ['confirmPassword'],
      message: 'Las contraseñas no coinciden',
    }
  );


type RecoveryFormType = z.infer<typeof recoverySchema>;

export default function RecoveryPage() {
  // 1: correo, 2: código, 3: nueva contraseña, 4: éxito/redirección
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [userId, setUserId] = useState<string | null>(null);

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

  const { control, handleSubmit, trigger, watch, getValues } = methods;

  
  // 2. Habilitar / deshabilitar botón por step
 
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


  // Lógica de avanzar de step (botón principal)
 
  const handleNextStep = async () => {
    setError(null);
    setCodeError(null);

    // STEP 1 → enviar código al correo
    if (step === 1) {
      const ok = await trigger('email');
      if (!ok) return;

      setIsSubmitting(true);
      try {
        const { email } = getValues();

        // 🚨llamada real para mandar el código de recuperación
        
        console.log('Enviar código de recuperación a:', email);
        setStep(2);
        setStepValid(true);
      } catch (err) {
        console.error('Error enviando código de recuperación:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'No se pudo enviar el código. Intenta de nuevo.'
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // STEP 3 → cambiar contraseña
    if (step === 3) {
      const ok = await trigger(['password', 'confirmPassword']);
      if (!ok) return;

      setIsSubmitting(true);
      try {
        const { email, password } = getValues();

        //  llamada real para actualizar la contraseña
    
        console.log('Restablecer contraseña de:', email, '->', password);
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

  // STEP 2 → handler para cuando EmailCodeValidationStep dice "onVerified"
  const handleCodeVerified = async (code: string) => {
    setCodeError(null);
    setCodeIsLoading(true);
    try {
      const { email } = getValues();

      //  llamada real para validar el código
  

      console.log('Código verificado (recovery):', { email, code });
      setStep(3);
    } catch (err) {
      console.error('Error al validar código de recuperación:', err);
      setCodeError(
        err instanceof Error
          ? err.message
          : 'El código no es válido o ha expirado.'
      );
    } finally {
      setCodeIsLoading(false);
    }
  };

  // STEP 2 → reenviar código
  const handleResendCode = async () => {
    setCodeError(null);
    setCodeIsLoading(true);
    try {
      const { email } = getValues();

      //  endpoint para reenviar el código
  

      console.log('Reenviar código (recovery) a:', email);
    } catch (err) {
      console.error('Error al reenviar código:', err);
      setCodeError(
        err instanceof Error
          ? err.message
          : 'No se pudo reenviar el código. Intenta nuevamente.'
      );
    } finally {
      setCodeIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) {
      if (step === 1) return 'Enviando código...';
      if (step === 3) return 'Actualizando contraseña...';
    }
    if (step === 1) return 'Enviar código';
    if (step === 3) return 'Cambiar contraseña';
    return 'Continuar';
  };

  const onSubmit = (data: RecoveryFormType) => {
    // El submit no se usa mucho porque manejamos todo por steps,
    // pero lo dejamos por si quieres debug:
    console.log('Submit global recovery:', data);
  };

  
  // 4. Render
  
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
            {/* Barra superior: back + stepper */}
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

            {/* Error global */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <FormProvider {...methods}>
              <div className="space-y-6">
                {/* STEP 1 – correo (basado en tu RecoveryEmailPageComponent) */}
                {step === 1 && (
                  <div className="space-y-8">
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
                        No te preocupes, si sucede solo sigue las instrucciones
                        para crear una nueva contraseña
                      </p>
                    </div>

                    <div className="space-y-10 mt-8">
                      <FormInput
                        name="email"
                        label="Correo electrónico"
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        control={control}
                        maxChars={244}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2 – código (usa tu EmailCodeValidationStep) */}
                {step === 2 && (
                  <div className="space-y-4">
                    <EmailCodeValidationStep
                      email={
                        getValues('email') || 'Tu correo registrado'
                      }
                      onVerified={handleCodeVerified}
                      onBack={() => setStep(1)}
                      onResend={handleResendCode}
                    />

                    {codeError && (
                      <p className="text-sm text-center text-red-600">
                        {codeError}
                      </p>
                    )}
                    {codeIsLoading && (
                      <p className="text-xs text-center text-muted-foreground">
                        Procesando...
                      </p>
                    )}
                  </div>
                )}

                {/* STEP 3 – nueva contraseña */}
                {step === 3 && <RecoverySetPasswordStep />}

                {/* STEP 4 – éxito / redirección */}
                {step === 4 && <RecoverySuccessStep />}

                {/* Botón principal solo en steps 1 y 3 */}
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
