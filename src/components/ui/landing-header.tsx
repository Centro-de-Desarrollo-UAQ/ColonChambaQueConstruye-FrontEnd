'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
    const colorEmpresa = '#470A68';
    const colorLink = '#FF7F40';
    return(
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
                <div className="flex items-center gap-2 py-4 text-base leading-loose">
        
                    <span style={{ color: colorEmpresa }}>
                        ¿Eres Empresa?
                    </span>
                    
                    <Link 
                        href="{AQQUI VA LA SIOGUIENTE PAGINA    }" 
                        className="underline hover:no-underline" 
                        style={{ color: colorLink }}
                    >
                        Click aquí
                    </Link>
                </div>
                <div className="flex items-center gap-4 py-4">
                    <Link href={"/signup/applicant"}>
                        <Button variant = "edit" color='gray'  onClick={() => console.log("Página de inicio de sesión")}>
                            Registrate{
                                //Redireccionamiento a la página de inicio de sesión
                            }
                        </Button>
                    </Link>
                    
                    <Link href={"/login/applicant"}>
                        <Button variant="primary" className ="" onClick={() => console.log("Página de registro")}>
                            Iniciar Sesión {
                                //Redireccionamiento a la página de registro de usuarios
                            }
                        </Button>
                    </Link>
                    
                </div>
                
            </header>
        </>
    );
}
