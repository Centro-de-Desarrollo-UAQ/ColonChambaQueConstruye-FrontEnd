'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { User, Logout2 } from '@solar-icons/react';
import { Button } from "@/components/ui/button"; 
import { useRouter } from 'next/navigation'; // Importamos useRouter para la redirección

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import LogoutModal from './modal/LogoutModal';

interface HeaderProps {
    userIcon?: React.ReactNode;
    logOut?: React.ReactNode;
    companyImageUrl?: string; 
    companyTitle?: string; 
    // NUEVAS PROPS
    showProfileButton?: boolean; // Controla la visibilidad del botón de Perfil (Opcional)
    logoutRedirectPath?: string; // Ruta de redirección al cerrar sesión (Necesaria)
}

export default function Header({ 
    companyTitle = 'Deloitte Qro', 
    companyImageUrl = '/Deloitte.svg', 
    userIcon = <User className="h-5 w-5"/>, 
    logOut = <Logout2 className='h-5 w-5'/>,
    // Asignamos el valor por defecto a las nuevas props
    showProfileButton = true, // Por defecto, el botón de Perfil es visible
    logoutRedirectPath = '/' // Ruta de redirección por defecto
}: HeaderProps) {

    const [showLogout, setShowLogout] = useState(false);
    
    const router = useRouter(); // Inicializamos el hook de redirección

    // Función que manejará el cierre de sesión y la redirección
    const handleLogout = () => {
        // Aquí iría tu lógica real de cerrar sesión (limpiar tokens, etc.)
        console.log("Cerrar sesión y redirigir a:", logoutRedirectPath);
        
        // Redirección real usando Next.js Router
        router.push(logoutRedirectPath); 
    };

    const openLogoutModal = () => setShowLogout(true);
    const closeLogoutModal = () => setShowLogout(false);

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
                                <Image src={companyImageUrl} alt={companyTitle} width={32} height={32} className="h-8 w-8 rounded-full" />
                                {companyTitle}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            
                            {/* Renderizado condicional del botón de Perfil */}
                            {showProfileButton && (
                                <Link href={"user/profile"}>
                                    <DropdownMenuItem onClick={() => console.log("Página de perfil")}>
                                        {userIcon}
                                        Perfil 
                                    </DropdownMenuItem>
                                </Link>
                            )}
                            
                            {/* El botón de Cerrar Sesión siempre está visible */}
                            <DropdownMenuItem onClick={openLogoutModal} variant="destructive">
                                {logOut}
                                Cerrar sesión
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="mb-6 space-y-4">
                {showLogout && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <LogoutModal onConfirm={handleLogout} onClose={closeLogoutModal} />
                    </div>
                )}
            </div>
        </>
    );
}