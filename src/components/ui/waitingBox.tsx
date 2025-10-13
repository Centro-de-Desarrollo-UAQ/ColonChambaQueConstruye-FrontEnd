'use client'

import Link from 'next/link';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const EmailVerificationCode = () => {


  return (
    <div className="container mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-12 shadow-sm">
        <div className="relative w-full h-full p-6">
      {/* Flecha atrás */}
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-700 transition"
        aria-label="Volver"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm">Volver</span>
      </Link>

      {/* Contenido centrado */}
      <div className="flex flex-col items-center justify-center min-h-[260px] w-full text-center gap-5">
        {/* Spinner moderno */}
        <div className="flex items-center justify-center">
          
          <AiOutlineLoading3Quarters className="text-zinc-500 animate-spin text-6xl" />
          
        </div>

        <h2 className="text-lg font-semibold text-zinc-800">
          Estamos evaluando tu perfil
        </h2>

        <p className="max-w-[36ch] text-sm text-zinc-600">
          Una vez que confirmemos que todo está en orden, tendrás acceso al sistema.  
          Intenta acceder más tarde ;)
        </p>
      </div>
    </div>
    </div>
  )
}