'use client'
import ApplicantTabs from '@/components/applicant/ApplicantTabs';
import HeaderProfile from '@/components/ui/header-profile';
import { useEffect, useRef } from 'react';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import { useUserStore } from '@/app/store/useUserInfoStore';

export default function ApplicantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const { token, id: userId } = useApplicantStore();
  const { fetchUserData } = useUserStore();

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!token || !userId) return;
    if (fetchedRef.current) return;
    
    fetchedRef.current = true;
    fetchUserData(userId, token);
    console.log('[LAYOUT USER] token?', !!token, 'userId:', userId);
  }, [token, userId, fetchUserData]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <HeaderProfile />
      </header>

      <main className="flex flex-grow">
        <div className="w-120 py-12">
          <ApplicantTabs />
        </div>

        <div className="flex-1 py-10">{children}</div>
      </main>
    </div>
  );
}
