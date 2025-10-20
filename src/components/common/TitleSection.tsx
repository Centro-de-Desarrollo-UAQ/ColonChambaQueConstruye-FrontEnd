import { ReactElement } from 'react';

interface SectionConfig {
  icon: ReactElement;
  title: string;
  description: string;
}

interface TitleSectionProps {
  sections: Record<string, SectionConfig>;
  currentSection: string;
}

export default function TitleSection({ sections, currentSection }: TitleSectionProps) {
  const { icon, title, description } = sections[currentSection] || {
    icon: null,
    title: 'Sección no encontrada sin props',
    description: 'No hay no existe',
  };

  return (
    <>
      <div className="flex items-center justify-between border-l-2 border-black bg-zinc-100 p-3">
        <span className="font-medium tracking-wide">{title}</span>
        <span className="text-right">{icon}</span>
      </div>
      <p className="py-1 text-zinc-700">{description}</p>
    </>
  );
}
