<<<<<<< HEAD:src/components/titleSection.tsx
import { ReactElement } from 'react';
=======
//TODO: Instead of using variants, pass through props the icon, title and description
import { Diploma, Documents, ShieldKeyholeMinimalistic } from '@solar-icons/react';
>>>>>>> c508517c5640d3fb9871a3cebe102db9c5a8ac08:src/components/toreview/TitleSection.tsx

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
    description: 'No hay no existe'
  };

  return (
    <>
      <div className="bg-uaq-default-100 flex items-center gap-3 border-l-2 border-black p-3">
        {icon}
        <span>{title}</span>
      </div>
      <p className="py-1 text-uaq-default-700">{description}</p>
    </>
  );
}