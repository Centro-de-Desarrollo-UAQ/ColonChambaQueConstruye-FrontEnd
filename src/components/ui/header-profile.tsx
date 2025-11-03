'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { User,Logout2} from '@solar-icons/react';
import {Button} from "@/components/ui/button";
import {} from '@/components/ui/dropdown-menu';
import {
  DropdownMenu, 
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Briefcase } from 'lucide-react';

interface HeaderUserProps{
    userIcon?: React.ReactNode;
    logOut?: React.ReactNode;
    userName?: string; //Obtener nombre del usuario
    jobIcon?: React.ReactNode;
}
    
export default function HeaderProfile({userName = "Pedro Sola", userIcon = <User className="h-5 w-5"/>, jobIcon = <Briefcase className="h-5 w-5"/>, logOut = <Logout2 className='h-5 w-5'/>}:HeaderUserProps) {
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
                <Link href={"../jobs"}>
                    <Button variant="mono" >
                        {jobIcon}
                        Vacantes {
                        //Navegar a la página de vacantes
                        }
                        
                    </Button>
                </Link>
                
            </div>
        </header>
    </>
  )
}