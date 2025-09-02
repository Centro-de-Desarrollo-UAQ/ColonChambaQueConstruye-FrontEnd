'use client';

import { cn } from '@/lib/utils';
import { SidebarButton } from './SidebarButton';
import { Chart, Buildings2, Case } from '@solar-icons/react';
import Image from 'next/image';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = ({ collapsed = false }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'flex h-screen flex-col gap-2 bg-[#1A2D4D] p-4 transition-all',
        collapsed ? 'w-20' : 'w-64',
      )}
    >
      {/* Logo and Header */}
      <div className="m-2 flex items-center gap-x-2 text-[#FAFAFA]">
        <Image src="/whiteUAQ_Logo.svg" alt="Logo" width={24} height={24} className="ml-1" />
        {!collapsed && (
          <div className="flex">
            <span className="mr-2 ml-1 text-base leading-none font-normal">
              Bolsa de
              <br />
              Trabajo
            </span>
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold">UAQ</span>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Elements*/}
      <SidebarButton
        icon={<Chart size={24} weight="Bold" />}
        label="Estadísticas"
        href="#"
        active={true}
        collapsed={collapsed}
      />
      <SidebarButton
        icon={<Buildings2 size={24} weight="Bold" />}
        label="Empresas"
        href="#"
        collapsed={collapsed}
      />
      <SidebarButton
        icon={<Case size={24} weight="Bold" />}
        label="Vacantes"
        href="#"
        collapsed={collapsed}
      />
    </aside>
  );
};
