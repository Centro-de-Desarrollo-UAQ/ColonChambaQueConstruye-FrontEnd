import { cn } from '@/lib/utils';

interface SidebarNavButtonProps {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
}

export function SidebarNavButton({ icon: Icon, label, href, active }: SidebarNavButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'flex items-center gap-3 my-1 py-3 rounded-md transition-all duration-300 w-full',
        active
          ? 'bg-uaq-default-50 text-uaq-accent font-bold px-2.5 hover:px-5'
          : 'hover:text-uaq-accent hover:bg-uaq-default-50/90 px-0 hover:px-2.5'
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="hidden group-hover/sidebar:inline transition-opacity duration-300 whitespace-nowrap">
      {/*<span className="transition-all duration-300 overflow-hidden max-w-0 group-hover/sidebar:max-w-[200px]">*/}
        {label}
      </span>
    </a>
  );
}