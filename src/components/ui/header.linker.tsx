'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { User,Logout2} from '@solar-icons/react';
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

interface HeaderLinkerProps{
    userIcon?: React.ReactNode;
    logOut?: React.ReactNode;
    linkermail?: string; //Obtener el mail del linker
}


export default function HeaderLinker({linkermail = "vinculadorx@gmail.com", userIcon = <User className="h-5 w-5"/> , 
    logOut = <Logout2 className='h-5 w-5'/>}:HeaderLinkerProps) {
  return (
    <>
        <header className='bg--accent flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
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
                            {linkermail}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => console.log("Página de perfil")}>
                            {userIcon}
                            Perfil {//Acceder a la página de perfil del linker
                            }
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log("Cerrar sesión")} variant="destructive">
                            {logOut}
                            Cerrar sesión {//Procedimiento de cierre de sesión del linker
                            }
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    </>
  )
}