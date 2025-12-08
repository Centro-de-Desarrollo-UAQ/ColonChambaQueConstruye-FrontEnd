'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// 1️⃣ Paso 1: responsable de vacantes (componente que ya tenías)
import SignUpEmployer from '@/components/employer/SignUpEmployer';

// 2️⃣ Paso 2: validación por código (versión company que ya armamos)
import EmailVerificationCodeCompany from '@/components/ui/email-verification-code-company';

// 3️⃣ Paso 3: datos de la empresa (el form grande de CompanyDetails)
import SignUpEmployerCompanySection from '@/components/employer/SignUpEmployerCompanySection';

// Si los tipos de estos componentes no aceptan props como onSuccess, los
// casteamos a "any" para no pelear con TypeScript:
const SignUpEmployerAny = SignUpEmployer as React.ComponentType<any>;
const EmailVerificationCodeCompanyAny =
  EmailVerificationCodeCompany as React.ComponentType<any>;
const SignUpEmployerCompanySectionAny =
  SignUpEmployerCompanySection as React.ComponentType<any>;

export default function CompanySignup() {
  // 1: responsable, 2: validación, 3: empresa
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <main className="flex h-fit flex-col items-center justify-center gap-10">
      {/* Contenedor general – solo para steps 2 y 3 */}
      {step === 1 ? (
        // STEP 1 → usamos TU página de responsable tal cual
        <SignUpEmployerAny
          // si luego quieres controlar el flujo desde aquí,
          // puedes hacer que dentro de SignUpEmployer llames a props.onSuccess()
          // después de un registro exitoso:
          // onSuccess={() => setStep(2)}
        />
      ) : (
        // STEPS 2 y 3 → layout tipo tarjeta
        <div className="h-full w-full max-w-[900px] space-y-8 rounded-md border border-gray-300 bg-white px-12 py-6 shadow-sm">
          {/* Barra superior solo para steps 2 y 3 */}
          <div className="mb-4 flex items-center gap-4">
            <Button
              variant="ghost"
              className="scale-150"
              type="button"
              onClick={goBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex-1 text-sm text-gray-500">
              Paso {step} de {totalSteps}
            </div>
          </div>

          {/* Títulos por step */}
          <div className="mb-6 text-center">
            {step === 2 && (
              <>
                <h1 className="text-2xl font-semibold">
                  Verifica el correo de tu empresa
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Ingresa el código que enviamos al correo registrado para
                  continuar con el registro.
                </p>
              </>
            )}

            {step === 3 && (
              <>
                <h1 className="text-2xl font-semibold">
                  Completa el registro de la empresa
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Proporciona los datos generales, fiscales y de ubicación de la
                  empresa para finalizar el registro.
                </p>
              </>
            )}
          </div>

          {/* Contenido de cada paso */}
          <div className="space-y-6">
            {step === 2 && (
              <EmailVerificationCodeCompanyAny
                onSuccess={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <SignUpEmployerCompanySectionAny
                // si quieres, puedes pasar un onSuccess para redirigir al final
                // onSuccess={() => router.push('/login/waiting')}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
