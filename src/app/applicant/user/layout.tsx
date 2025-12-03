'use client'
import ApplicantNavBar from '@/components/applicant/ApplicantNavBar';
import ApplicantTabs from '@/components/applicant/ApplicantTabs';
import HeaderProfile from '@/components/ui/header-profile';
import { useEffect } from 'react';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { useUserStore } from '@/app/store/useUserInfoStore';

export default function ApplicantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {token, id : userId} = useApplicantStore();
  const {fetchUserData, user} = useUserStore();

  useEffect(() => {
    
    if (token && userId && !user) {
        fetchUserData(userId, token);
    }
  }, [token, userId, user, fetchUserData]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <HeaderProfile/>
      </header>

      <main className="flex flex-grow">
        {/* Columna izquierda - Tabs */}
        <div className="w-120 py-12">
          <ApplicantTabs />
        </div>

        {/* Columna derecha - Contenido */}
        <div className="flex-1 py-10">{children}</div>
      </main>
    </div>
  );
}
