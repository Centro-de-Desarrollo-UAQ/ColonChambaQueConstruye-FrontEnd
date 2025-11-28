'use client';

import { AdminNavbarMenu } from "@/components/navigation/AdminNavbarMenu";
import AdminSideBar from "@/components/sidebar/AdminSideBar";
import Header from "@/components/ui/header";
import React from "react";

export default function LinkerLayout({ children }: { children: React.ReactNode }) {
  // ✅ Tipamos correctamente las variables CSS
  const styleVars: React.CSSProperties & {
    '--sb-collapsed': string;
    '--sb-expanded': string;
  } = {
    '--sb-collapsed': '64px',  // w-16
    '--sb-expanded': '256px',  // w-64
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={styleVars}
    >
      <div
        className="
          flex min-h-screen flex-col
          ml-[var(--sb-collapsed)]
          peer-hover:ml-[var(--sb-expanded)]
          transition-all duration-300 ease-in-out
        "
      >

        {/* Subbarra / título de página */}
        <div>
          <AdminNavbarMenu NameTitle="Empresas" basePath="users"/>
        </div>

        {/* Contenido principal */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
