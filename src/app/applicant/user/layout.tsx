'use client'
import ApplicantTabs from '@/components/applicant/ApplicantTabs';
import HeaderProfile from '@/components/ui/header-profile';
import { useEffect, useRef } from 'react';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { useUserStore } from '@/app/store/useUserInfoStore';
import HeaderLinker from '@/components/ui/headerLinker';

export default function ApplicantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const { token, id: userId, status } = useApplicantStore();
  
  const { fetchUserData, user } = useUserStore();

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!token || !userId) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchUserData(userId, token);
    console.log('[LAYOUT USER] token?', !!token, 'userId:', userId);
  }, [token, userId, fetchUserData]);

  const isRejected = status === 'RECHAZADO';

  return (
    <div className="flex min-h-screen flex-col">
      
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
        <div className="w-120 py-12">
          <ApplicantTabs />


          {isRejected && (
            <div className="w-10/12 bg-red-50 mx-auto mt-5 mb-5 shadow-sm border border-red-200 rounded-lg overflow-hidden">
              <div className="px-6 py-6 flex flex-col items-start gap-3">
                <h3 className="text-base font-bold text-red-700 shrink-0">
                  Motivo de rechazo
                </h3>
                <div className="w-full min-w-0">
                  <p className="text-red-800 font-medium whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base">
                    {/* Leemos el comentario usando optional chaining por si el user aún no carga */}
                    {user?.comment || 'El administrador no especificó un motivo en el sistema.'}
                  </p>
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