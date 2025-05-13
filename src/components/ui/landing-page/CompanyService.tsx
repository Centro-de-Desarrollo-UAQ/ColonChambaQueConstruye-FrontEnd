'use client';

import router from "next/router";
import { Button } from "../button";

export function CompanyService() {
  return (
    <div className="flex flex-col gap-12 px-6 sm:px-12 lg:px-48 items-center py-10 sm:py-16 lg:py-20">
      <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-center">
        ¿Eres una empresa que desea publicar vacantes?
      </h3>
      <p className="text-center text-base sm:text-lg lg:text-xl leading-relaxed max-w-prose">
        Si estás buscando candidatos motivados, bien formados y listos para contribuir al éxito de tu empresa,
        has llegado al lugar adecuado.
      </p>
      <Button
        variant="ghost"
        className="w-fit"
        size="default"
        onClick={() => router.push("/registro", "_blank")}
      >
        Regístrate como empresa
      </Button>
    </div>
  );
}