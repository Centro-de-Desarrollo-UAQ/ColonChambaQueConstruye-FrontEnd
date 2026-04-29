'use client'
import ApplicantTabs from '@/components/applicant/ApplicantTabs';
import HeaderProfile from '@/components/ui/header-profile';
import { useEffect, useRef } from 'react';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { useUserStore } from '@/app/store/useUserInfoStore';
import HeaderLinker from '@/components/ui/headerLinker';
import { useRouter } from 'next/navigation';
import RequestReviewButton from '@/components/common/RequestReviewButton'; 

export default function ApplicantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const router = useRouter();
  const { token, id: userId, status, logoutAplicant } = useApplicantStore();
  const { fetchUserData, user } = useUserStore();

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!token || !userId) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchUserData(userId, token);
  }, [token, userId, fetchUserData]);

  const isRejected = status === 'RECHAZADO';

  return (
    <div className="flex min-h-screen flex-col relative">

      {!isRejected && (
        <header className="border-b">
          <HeaderProfile />
        </header>
      )}
      
      {isRejected && (
        <header className="border-b">
          <HeaderLinker/>
        </header>
      )}

      <main className="flex flex-grow">
        {/* Restaurado: Sin flex-col, con shrink-0 para que las tabs no se encojan */}
        <div className="w-120 py-12 shrink-0">
          <ApplicantTabs />

          {isRejected && (
            <div className="mt-8 px-4">
              
              {/* 1. EL BOTÓN ARRIBA */}
              <div className="mb-4">
                <RequestReviewButton 
                  endpoint={`/api/v1/users/${userId}/status`}
                  token={token || ''}
                  onSuccess={() => {
                    if (logoutAplicant) logoutAplicant();
                    router.replace('/login/waiting');
                  }}
                />
                <p className="text-xs text-center text-gray-500 mt-2">
                  Asegúrate de haber corregido los datos indicados antes de volver a enviar tu perfil.
                </p>
              </div>

              {/* 2. EL MOTIVO DE RECHAZO ABAJO */}
              <div className="bg-red-50 shadow-sm border border-red-200 rounded-lg overflow-hidden">
                <div className="px-6 py-6 flex flex-col items-start gap-3">
                  <h3 className="text-base font-bold text-red-700 shrink-0">
                    Motivo de rechazo
                  </h3>
                  <div className="w-full min-w-0">
                    <p className="text-red-800 font-medium whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base">
                      {user?.comment || 'El administrador no especificó un motivo en el sistema.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
          
        </div>

        <div className="flex-1 py-10">{children}</div>
      </main>
    </div>
  );
}