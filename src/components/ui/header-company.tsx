'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { User,Logout2} from '@solar-icons/react';
import { Button } from "@/components/ui/button"; // si usas shadcn/ui
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

interface HeaderProps{
    userIcon?: React.ReactNode;
    logOut?: React.ReactNode;
    companyImageUrl?: string; //URL del logo de la compañía
    companyTitle?: string; //Nombre de la compañía
}

export default function Headercompany({ 
    companyTitle='Deloitte Qro', //Obtener el nombre de la compañía
    companyImageUrl='/Deloitte.svg', //Obtener el logo de la compañía
    userIcon = <User className="h-5 w-5"/> , 
    logOut = <Logout2 className='h-5 w-5'/> }: HeaderProps) {
  return (
    <>
        <header className='bg-accent !z-50 flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
            <div className='flex items-center gap-4 py-4'>
                <Link href="/" className="text-lg font-bold">
                    <img src="/UCQC.png" alt="Colon"  className="h-10 w-28 scale-100"/>
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
                        <Link href={"user/profile"}>
                
                            <DropdownMenuItem onClick={() => console.log("Página de perfil")}>
                            
                                    {userIcon}
                                    Perfil {//Acceder a la página de perfil del empleador
                                    }
                            
                                
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem  onClick={() => console.log("Cerrar sesión")} variant="destructive">
                            {logOut}
                            Cerrar sesión {//Procedimiento de cierre de sesión del empleador
                            }
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
        </header>
        
    </>
  );
}
