'use client';

import Link from 'next/link';
import { useState } from 'react'; // Importación simplificada
import Image from 'next/image';
import { User, Logout2 } from '@solar-icons/react';
import { Button } from "@/components/ui/button"; 
import { useRouter } from 'next/navigation';

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

    // 1. Usamos un solo estado para el modal
    const [showLogout, setShowLogout] = useState(false);
    
    const router = useRouter(); 

    // 2. Funciones para abrir y cerrar
    const openLogoutModal = () => setShowLogout(true);
    const closeLogoutModal = () => setShowLogout(false);

    // 3. Función lógica de cerrar sesión
    const handleLogoutConfirm = () => {
        closeLogoutModal(); 
        console.log("Cerrar sesión y redirigir a:", logoutRedirectPath);
        router.push(logoutRedirectPath); 
    };

    return (
        <>
            <header className='bg-accent !z-50 flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
                <div className='flex items-center gap-4 py-4'>
                    <Link href="/" className="text-lg font-bold">
                        <img src="/UCQC.png" alt="Colon" className="h-10 w-28 scale-100"/>
                    </Link>
                    <Link href="/" className="text-lg font-bold">
                        <img src="/ADMON24-27-1-03.png" alt="Colon" className="h-10 w-28 scale-100"/>
                    </Link>
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
                            
                            {/* Abre el modal al hacer click */}
                            <DropdownMenuItem onClick={openLogoutModal} variant="destructive">
                                {logOut}
                                Cerrar sesión
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Renderizado condicional del Modal fuera del header pero dentro del fragmento */}
            {showLogout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    {/* 4. Corregimos la prop onConfirm para usar handleLogoutConfirm */}
                    <LogoutModal 
                        onConfirm={handleLogoutConfirm} 
                        onClose={closeLogoutModal} 
                    />
                </div>
            )}
        </>
    );
}