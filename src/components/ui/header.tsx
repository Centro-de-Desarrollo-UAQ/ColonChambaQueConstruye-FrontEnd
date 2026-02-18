'use client';

import React, { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { User, Logout2 } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useApplicantStore } from '@/app/store/authApplicantStore';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import LogoutModal from './modal/LogoutModal';
import CompanyAvatar from '../common/AvatarTrasnform';

interface HeaderProps {
  companyTitle: string;
  companyImageUrl?: string;
  userIcon?: ReactNode;
  logOut?: ReactNode;
  showProfileButton?: boolean;
  logoutRedirectPath?: string;

  /** ✅ Nuevo: modo linker */
  variant?: 'default' | 'linker';
}

export default function Header({
  companyTitle,
  companyImageUrl = '/Deloitte.svg',
  userIcon = <User className="h-5 w-5" />,
  logOut = <Logout2 className="h-5 w-5" />,
  showProfileButton = true,
  logoutRedirectPath = '/',
  variant = 'default',
}: HeaderProps) {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const { logout } = useApplicantStore();

  const openLogoutModal = () => setShowLogout(true);
  const closeLogoutModal = () => setShowLogout(false);

  const handleLogoutConfirm = () => {
    closeLogoutModal();

    // ✅ Limpia store + localStorage (tu store ya lo hace)
    logout();

    console.log('Cerrar sesión y redirigir a:', logoutRedirectPath);
    router.push(logoutRedirectPath);
  };

  // ✅ En linker, no queremos avatar ni perfil
  const isLinker = variant === 'linker';

  return (
    <>
      <header className="bg-accent !z-50 flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md">
        <div className="flex items-center gap-4 py-4">
          <Link href="/" className="text-lg font-bold">
            <img src="/UCQC.png" alt="Colon" className="h-10 w-28 scale-100" />
          </Link>
          <Link href="/" className="text-lg font-bold">
            <img
              src="/ADMON24-27-1-03.png"
              alt="Colon"
              className="h-10 w-28 scale-100"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="mono" className="flex items-center gap-2">
                {/* ❌ Linker: NO avatar (adiós ??) */}
                {!isLinker && (
                  <CompanyAvatar companyName={companyTitle} size="sm" />
                )}

                {/* ✅ Linker: puedes dejar el texto o cambiarlo a algo fijo */}
                <span className="truncate max-w-[200px] text-left">
                  {isLinker ? 'Menú' : companyTitle}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {/* ❌ Linker: NO Perfil */}
              {!isLinker && showProfileButton && (
                <Link href="user/profile">
                  <DropdownMenuItem onClick={() => console.log('Página de perfil')}>
                    {userIcon}
                    <span className="ml-2">Perfil</span>
                  </DropdownMenuItem>
                </Link>
              )}

              {/* ✅ Solo Cerrar sesión */}
              <DropdownMenuItem
                onClick={openLogoutModal}
                className="text-red-600 cursor-pointer"
              >
                {logOut}
                <span className="ml-2">Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <LogoutModal onConfirm={handleLogoutConfirm} onClose={closeLogoutModal} />
        </div>
      )}
    </>
  );
}
