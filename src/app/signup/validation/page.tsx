'use client';

import Headersimple from '@/components/ui/header-simple';
import { useState } from 'react';
import EmailVerificationCode from '@/components/ui/email-verification-code';
import { Button } from '@/components/ui/button';
import { AdminNavbarMenu } from '@/components/navigation/AdminNavbarMenu';


export default function SignUpDos() {
    const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Código ingresado:', otp);
    // Aquí podrías validar el código con tu backend
  };

  return (
    <div className="flex min-h-screen flex-col">
        <Headersimple />
        <div
            className="flex min-h-screen flex-col items-center justify-center py-15"
            style={{
                backgroundImage: 'url("/backgroundSignUp.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
            }}
        >
            <main className="flex h-fit flex-col items-center justify-center gap-10">
                <div className="container mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-12 shadow-sm">
                    <div className="mb-4 space-y-8 text-center">
                        <h1 className="text-3xl font-light text-[20px] text-[var(--uaq-selected-hover)]">Validación</h1>
                        <p className="mx-auto max-w-2xl mb-4 ">
                            Enviamos un código de validación al correo que registraste. Favor de ingresarlo para continuar tu registro.
                        </p>    
                    </div>
                    <div className='justify-items-center'>
                        <EmailVerificationCode onChange={(code) => setOtp(code)} />
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
};

