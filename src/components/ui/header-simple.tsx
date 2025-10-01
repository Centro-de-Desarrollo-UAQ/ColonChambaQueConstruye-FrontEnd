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
    companyImageUrl?: string;
    companyTitle?: string;
}

export default function Headersimple({ 
    companyTitle='Deloitte Qro', //Obtener el nombre de la compañía
    companyImageUrl='/Deloitte.svg', //Obtener el logo de la compañía
    userIcon = <User className="h-5 w-5"/> , 
    logOut = <Logout2 className='h-5 w-5'/> }: HeaderProps) {
  return (
    <>
        <header className='bg--accent flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
            <div className='flex items-center gap-4 py-4'>
                <Link href="/" className="text-lg font-bold">
                    <Image src="/UCQC.png" alt="Colon" width={120} height={120} className="h-10 w-28" />
                </Link>
                <Link href="/" className="text-lg font-bold">
                    <Image src="/ADMON24-27-1-03.png" alt="Colon" width={120} height={120} className="h-10 w-28" />
                </Link>
            </div>
            
            
        </header>
        
    </>
  );
}
