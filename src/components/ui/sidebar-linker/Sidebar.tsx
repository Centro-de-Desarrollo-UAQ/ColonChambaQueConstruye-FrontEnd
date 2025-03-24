import { cn } from "@/lib/utils";
import { SidebarButton } from "./SidebarButton";
import { Chart, Buildings2, Case } from "@solar-icons/react";
import Image from "next/image";

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar = ({ collapsed = false }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-[#1A2D4D] h-screen p-4 flex flex-col gap-2 transition-all",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo and Header */}
      <div className="flex items-center gap-x-2 text-[#FAFAFA] m-2">
        <Image
          src="/whiteUAQ_Logo.svg"
          alt="Logo"
          width={24}
          height={24}
          className="ml-1"
        />
        {!collapsed && (
          <div className="flex">
            <span className="text-base font-normal ml-1 mr-2 leading-none">
              Bolsa de<br />
              Trabajo
            </span>
            <div className="flex justify-center items-center">
              <span className="text-2xl font-bold">UAQ</span>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Elements*/}
      <SidebarButton
        icon={<Chart size={24} weight="Bold"/>}
        label="Estadísticas"
        href="#"
        active={true}
        collapsed={collapsed}
      />
      <SidebarButton
        icon={<Buildings2 size={24} weight="Bold"/>}
        label="Empresas"
        href="#"
        collapsed={collapsed}
      />
      <SidebarButton
        icon={<Case size={24} weight="Bold"/>}
        label="Vacantes"
        href="#"
        collapsed={collapsed}
      />
    </aside>
  );
};
