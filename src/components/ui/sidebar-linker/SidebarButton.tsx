import Link from "next/link";
import { ReactNode } from "react";

interface SidebarButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

export const SidebarButton = ({ icon, label, href, active, collapsed }: SidebarButtonProps) => {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
                      ${active ? "bg-[#FAFAFA] text-[#1A2D4D]" : "text-[#FAFAFA] hover:bg-[#365285]"}
                      transition`}>
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
    </Link>
  );
};