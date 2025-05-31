'use client';

import router from 'next/router';
import { Button } from '../ui/button';

export function CompanyService() {
  return (
    <div className="flex flex-col items-center gap-12 px-6 py-10 sm:px-12 sm:py-16 lg:px-48 lg:py-20">
      <h3 className="text-center text-2xl font-bold sm:text-3xl lg:text-3xl">
        ¿Eres una empresa que desea publicar vacantes?
      </h3>
      <p className="max-w-prose text-center text-base leading-relaxed sm:text-lg lg:text-xl">
        Si estás buscando candidatos motivados, bien formados y listos para contribuir al éxito de
        tu empresa, has llegado al lugar adecuado.
      </p>
      <Button
        variant="ghost"
        className="w-fit"
        size="default"
        onClick={() => router.push('/registro', '_blank')}
      >
        Regístrate como empresa
      </Button>
    </div>
  );
}
