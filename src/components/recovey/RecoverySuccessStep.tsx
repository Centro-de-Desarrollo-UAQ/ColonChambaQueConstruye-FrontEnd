'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

interface RecoverySuccessStepProps {
  /** Segundos para redirigir al login. Por defecto 7 */
  initialSeconds?: number;
}

export function RecoverySuccessStep({ initialSeconds = 7 }: RecoverySuccessStepProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = React.useState<number>(initialSeconds);

  // Cuenta regresiva
  React.useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Cuando llega a 0 → redirigir al login
  React.useEffect(() => {
    if (secondsLeft <= 0) {
      router.push(`/login/applicant?timeLeft=${Math.max(0, secondsLeft)}`);
    }
  }, [secondsLeft, router]);

  return (
    <div className="h-full w-full max-w-2xl space-y-8 rounded-md border border-gray-300 bg-white px-12 py-6 shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/ADMON24-27-1-03.png"
          alt="Recuperación de contraseña"
          className="scale-50"
        />

        <h1 className="text-2xl font-medium -space-y-28">
          ¡Tu cuenta está lista para usarse!
        </h1>

        <p className="text-center">
          Serás redirigido al inicio de sesión en un momento
          {/* Si quieres mostrar el contador: */}
          {/* {` (${secondsLeft}s)`} */}
        </p>

        <img src="/reload.gif" className="h-20 w-20" />
      </div>
    </div>
  );
}
