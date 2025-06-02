'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ReactElement } from 'react';

interface TabItem {
  value: string;
  route: string;
  icon: ReactElement;
  label: string;
}

interface TabOptionsProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export default function TabOptions({ tabs, defaultTab }: TabOptionsProps) {
  const pathname = usePathname();
  const router = useRouter();

  const activeValue =
    tabs.find((tab) => pathname.startsWith(tab.route))?.value || defaultTab || tabs[0]?.value;

  const handleTabClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col space-y-2 rounded-sm bg-transparent p-2">
      {tabs.map((tab) => (
        <div
          key={tab.value}
          onClick={() => handleTabClick(tab.route)}
          className={cn(
            'w-full rounded-sm px-4 py-3 text-left transition-all cursor-pointer',
            'focus-visible:ring-uaq-default-500 focus-visible:ring-2 focus-visible:outline-none',
            'disabled:pointer-events-none disabled:opacity-50',
            activeValue === tab.value
              ? 'bg-uaq-default-600 text-uaq-default-50' // Estilos para tab activo
              : 'text-foreground hover:bg-uaq-default-100 hover:text-uaq-default-700' // Estilos para tabs inactivos (incluye hover)
          )}
        >
          <div className="flex items-center gap-3">
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}