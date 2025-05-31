//TODO: Make this component reusable. Remove the hardcoded values and use props to pass the values.
//? Whats the point of using tabs if we are changing the URL?
'use client';
import { VerticalTabs, VerticalTabsList, VerticalTabsTrigger } from '../ui/tabs';
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

  // Manejador de clic para redirección
  const handleTabClick = (route: string) => {
    router.push(route);
  };

  return (
    <VerticalTabs defaultValue={activeValue} value={activeValue}>
      <VerticalTabsList>
        {tabs.map((tab) => (
          <VerticalTabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => handleTabClick(tab.route)}
          >
            <div className="flex items-center gap-3">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </VerticalTabsTrigger>
        ))}
      </VerticalTabsList>
    </VerticalTabs>
  );
}