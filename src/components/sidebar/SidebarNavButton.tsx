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
          ? 'bg-[var(--uaq-selected-hover)] text-white px-2.5 hover:px-5 group-hover/sidebar:bg-[var(--uaq-selected-hover-sidebar)]'
          : 'hover:text-white hover:bg-[var(--uaq-selected-hover)] px-0 hover:px-2.5'
      )}
    >
        <Icon 
        weight="Bold"
        className={cn(
            "h-5 w-5",  
            active ? "text-white" : "group-hover/sidebar","mx-auto group-hover/sidebar:mx-0"
          )} />
      <span className="hidden group-hover/sidebar:inline transition-opacity duration-300 whitespace-nowrap">
      {/*<span className="transition-all duration-300 overflow-hidden max-w-0 group-hover/sidebar:max-w-[200px]">*/}
        {label}
      </span>
    </a>
  );
}