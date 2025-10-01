'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
    return(
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
                <div className="flex items-center gap-4 py-4">
                    <Button variant="third" onClick={() => console.log("Página para publicar empleos")}>
                        Publicar empleos{
                            //Redireccionamiento a la página de empleadores
                        }
                    </Button>
                </div>
                <div className="flex items-center gap-4 py-4">
                    <Button variant = "primary" onClick={() => console.log("Página de inicio de sesión")}>
                        Iniciar sesión{
                            //Redireccionamiento a la página de inicio de sesión
                        }
                    </Button>
                    <Button variant="primary" className ="" onClick={() => console.log("Página de registro")}>
                        Registrarse {
                            //Redireccionamiento a la página de registro de usuarios
                        }
                    </Button>
                </div>
                
            </header>
        </>
    );
}
