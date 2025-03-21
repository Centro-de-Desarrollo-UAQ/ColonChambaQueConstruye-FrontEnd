import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarButtonProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

export const SidebarButton = ({
  icon,
  label,
  href,
  active,
  collapsed,
}: SidebarButtonProps) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition",
          active
            ? "bg-[#FAFAFA] text-[#1A2D4D]"
            : "text-[#FAFAFA] hover:bg-[#365285]",
          collapsed && "justify-center"
        )}
      >
        {icon}
        {!collapsed && <span className="truncate">{label}</span>}
      </div>
    </Link>
  );
};
