'use client';

import React, { useState } from 'react';
import Headersimple from '@/components/ui/header-simple';
import { Button } from '@/components/ui/button';
import Stepper from '@/components/common/Stepper';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from '@/components/ui/sonner';

import SignUpEmployerCompanySection from '@/components/employer/SignUpEmployerCompanySection';
import EmailVerificationCodeCompany from '@/components/ui/email-verification-code-company';

const AnyStepper = Stepper as React.ComponentType<any>;

export default function SignupEmployerCompanyPage() {
  // 1: registro empresa, 2: código, 3: éxito
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [error, setError] = useState<string | null>(null);

  // STEP 1 → cuando se registra la empresa correctamente
  const handleCompanyRegistered = () => {
    setError(null);
    setStep(2);
  };

  // STEP 2 → cuando el código de verificación es correcto
  const handleCodeVerified = () => {
    setError(null);
    setStep(3);
  };

  return (
    <>
      <Headersimple />

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
                  <Button variant="ghost" className="scale-150" type="button">
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
                <AnyStepper currentStep={step} totalSteps={totalSteps} />
            </div>
            </div>

            {/* Error global opcional */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* STEP 1 – Registro de empresa */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-semibold">
                      Registra tu empresa
                    </h1>
                    <p className="text-sm text-gray-600">
                      Completa la información general, fiscal y de ubicación de
                      tu empresa para continuar con el registro.
                    </p>
                  </div>

                  {/* 👇 Asegúrate de que este componente reciba onSuccess y lo llame */}
                  <SignUpEmployerCompanySection onSuccess={handleCompanyRegistered} />
                </div>
              )}

              {/* STEP 2 – Código de verificación (empresa) */}
              {step === 2 && (
                <div className="space-y-4">
                  <EmailVerificationCodeCompany onSuccess={handleCodeVerified} />
                </div>
              )}

              {/* STEP 3 – Éxito */}
              {step === 3 && (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <h2 className="text-2xl font-semibold text-emerald-600">
                    ¡Registro completado! 
                  </h2>
                  <p className="max-w-md text-sm text-gray-600">
                    Tu cuenta de empresa ha sido registrada y verificada
                    correctamente. Ahora puedes iniciar sesión y comenzar a
                    publicar vacantes.
                  </p>

                  <Link href="/login/employer">
                    <Button type="button" className="mt-4">
                      Ir a iniciar sesión
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>

        <Toaster />
      </div>
    </>
  );
}
