'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { User, Logout2 } from '@solar-icons/react';
import { Button } from "@/components/ui/button"; 
import { useRouter } from 'next/navigation';
import { useApplicantStore } from '@/app/store/authApplicantStore';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

import LogoutModal from './modal/LogoutModal';

interface HeaderProps {
    userIcon?: React.ReactNode;
    logOut?: React.ReactNode;
    companyImageUrl?: string; 
    companyTitle?: string; 
    showProfileButton?: boolean;
    logoutRedirectPath?: string; 
}

export default function Header({ 
    companyTitle = 'Deloitte Qro', 
    companyImageUrl = '/Deloitte.svg', 
    userIcon = <User className="h-5 w-5"/>, 
    logOut = <Logout2 className='h-5 w-5'/>,
    showProfileButton = true, 
    logoutRedirectPath = '/' 
}: HeaderProps) {

    const [showLogout, setShowLogout] = useState(false);
    const router = useRouter(); 
    
    // 1. Obtenemos la función logout del store de Zustand
    const logout = useApplicantStore((state) => state.logout);

    const openLogoutModal = () => setShowLogout(true);
    const closeLogoutModal = () => setShowLogout(false);

    const handleLogoutConfirm = () => {
        // 2. Ejecutamos la limpieza del store y localStorage
        logout();
        
        closeLogoutModal(); 
        console.log("Sesión cerrada. Datos eliminados. Redirigiendo a:", logoutRedirectPath);
        
        // 3. Redirigimos al usuario
        router.push(logoutRedirectPath); 
    };

    return (
        <>
            <header className='bg-accent !z-50 flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
                <div className='flex items-center gap-4 py-4'>
                    {/* Asegúrate de que estas imágenes existan en tu carpeta public */}
                    <img src="/UCQC.png" alt="Colon" className="h-10 w-28 scale-100"/>
                    <img src="/ADMON24-27-1-03.png" alt="Colon" className="h-10 w-28 scale-100"/>
                </div>
                
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="mono">
                                <Image 
                                    src={companyImageUrl} 
                                    alt={companyTitle} 
                                    width={32} 
                                    height={32} 
                                    className="h-8 w-8 rounded-full" 
                                />
                                {companyTitle}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            {showProfileButton && (
                                <Link href={"user/profile"}>
                                    <DropdownMenuItem onClick={() => console.log("Página de perfil")}>
                                        {userIcon}
                                        Perfil 
                                    </DropdownMenuItem>
                                </Link>
                            )}
                            
                            <DropdownMenuItem onClick={openLogoutModal} variant="destructive">
                                {logOut}
                                Cerrar sesión
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {showLogout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <LogoutModal 
                        onConfirm={handleLogoutConfirm} 
                        onClose={closeLogoutModal} 
                    />
                </div>
            )}
        </>
    );
}