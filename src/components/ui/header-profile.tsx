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
    userName?: string; 
    jobIcon?: React.ReactNode;
}
    
export default function HeaderProfile({userName = "Pedro Sola", userIcon = <User className="h-5 w-5"/>, jobIcon = <Briefcase className="h-5 w-5"/>, logOut = <Logout2 className='h-5 w-5'/>}:HeaderUserProps) {
  return (
    <>
        <header className='bg--accent flex items-center justify-between px-10 border-b border-zinc-200 drop-shadow-md'>
             <div className='flex items-center gap-4 py-4'>
                <img src="/UCQC.png" alt="Colon"  className="h-10 w-28 scale-100"/>
                <img src="/ADMON24-27-1-03.png" alt="Colon" className="h-10 w-28 scale-100"/>
             </div>
            <div className="flex items-center justify-center">
                <Link href={"../jobs"}>
                    <Button variant="mono" >
                        {jobIcon}
                        Vacantes {
                        }
                        
                    </Button>
                </Link>
                
            </div>
        </header>
    </>
  )
}