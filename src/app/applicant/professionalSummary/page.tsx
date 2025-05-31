'use client';
import ApplicantTabs from '@/components/toreview/ApplicantTabs';
import { useState } from 'react';
import TitleSection from '@/components/toreview/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { Diploma } from '@solar-icons/react';

export default function professionalSummary() {
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);
  const sectionConfig = {
    profile: {
      icon: <Diploma size={24} weight="Bold" />,
      title: 'PERFIL PROFESIONAL',
      description: 'Edita los detalles de su experiencia profesional y habilidades destacadas, además de sus preferencias laborales'
    }
  };
  return (
    <div className="flex w-full flex-col gap-1 md:flex-row">
      {/* Columna izquierda - Tabs */}
      <div className="w-xl shrink-0 px-6">
        <ApplicantTabs />
      </div>

      {/* Columna derecha - Contenido principal */}
      <div className="mr-20 flex-1 space-y-6 p-4 md:p-6">
        {/* Encabezado */}
        <TitleSection 
                  sections={sectionConfig} 
                  currentSection="profile" 
                />  

        {/* Sección de Experiencia */}
        <div className="border-uaq-default-300 rounded-lg border shadow-sm">
          <ConfigRow
            title="Experiencia"
            valueinput=""
            isTitle={true}
            placeholder=""
            isEditable={true}
            editInput={true}
          />

          {/* Fila 1 - Carrera */}
          <div className="px-6">
            <ConfigRow
              title="Carrera"
              valueinput=""
              isTitle={false}
              placeholder="Ingeniería en Software"
              isEditable={false}
              editInput={false}
            />
          </div>

          {/* Fila 2 - Resumen personal */}
          <div className="px-6">
            <ConfigRow
              title="Resumen personal"
              valueinput=""
              isTitle={false}
              placeholder="Describa su perfil profesional en una pequeña oración"
              isEditable={false}
              editInput={false}
            />
          </div>

          {/* Sección de Preferencias */}
          <ConfigRow
            title="Preferencias"
            valueinput=""
            isTitle={true}
            placeholder=""
            isEditable={true}
            editInput={true}
          />

          {/* Fila 1 - Ubicación laboral */}
          <div className="px-6">
            <ConfigRow
              title="Preferencia de ubicación laboral"
              valueinput=""
              isTitle={false}
              placeholder="¿En qué ubicación preferiría explorar ofertas de trabajo?"
              isEditable={false}
              editInput={false}
            />
          </div>

          {/* Fila 2 - Horas preferentes */}
          <div className="px-6">
            <ConfigRow
              title="Horas preferentes"
              valueinput=""
              isTitle={false}
              placeholder="¿Qué horario laboral prefiere?"
              isEditable={false}
              editInput={false}
            />
          </div>

          {/* Fila 3 - Modalidad de empleo */}
          <div className="px-6">
            <ConfigRow
              title="Modalidad de empleo preferente"
              valueinput=""
              isTitle={false}
              placeholder="Seleccione una opción"
              isEditable={false}
              editInput={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
