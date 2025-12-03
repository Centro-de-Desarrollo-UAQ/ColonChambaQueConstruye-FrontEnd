'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { User, Logout2 } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import LogoutModal from '@/components/ui/modal/LogoutModal';

// IMPORTA EL STORE REAL
import { useApplicantStore } from '@/app/store/authApplicantStore';

export default function Header() {
  const [showLogout, setShowLogout] = useState(false);

  // LEES EL USUARIO Y TOKEN REALES DESDE ZUSTAND
  const user = useApplicantStore((state) => state.user);
  const token = useApplicantStore((state) => state.token);

  const router = useRouter();

  // -------------------------------
  // 1. Iniciales del avatar
  // -------------------------------
  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : '';

  // -------------------------------
  // 2. Logout
  // -------------------------------
  const openLogoutModal = () => setShowLogout(true);
  const closeLogoutModal = () => setShowLogout(false);

  const handleLogoutConfirm = () => {
    closeLogoutModal();
    router.push('/');
  };

  return (
    <>
      <header className="bg-accent !z-50 flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md">

        {/* LOGOS */}
        <div className="flex items-center gap-4 py-4">
          <img src="/UCQC.png" className="h-10 w-28" />
          <img src="/ADMON24-27-1-03.png" className="h-10 w-28" />
        </div>

        {/* MENÚ DEL USUARIO */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="mono" className="gap-2">
                
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl ?? undefined} />
                  <AvatarFallback>
                    {initials || <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>

                {/* NOMBRE REAL */}
                <span>
                  {user ? `${user.firstName} ${user.lastName}` : 'Invitado'}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Link href={'/user/profile'}>
                <DropdownMenuItem>
                  <User className="h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                onClick={openLogoutModal}
                variant="destructive"
              >
                <Logout2 className="h-4 w-4" />
                Cerrar sesión
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
