'use client';
import { useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { Diploma } from '@solar-icons/react';

export default function ProfessionalSummary() {
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);
  const sectionConfig = {
    profile: {
      icon: <Diploma size={24} weight="Bold" />,
      title: 'PERFIL PROFESIONAL',
      description:
        'Edite los detalles de su experiencia profesional y habilidades destacadas, además de sus preferencias laborales',
    },
  };

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de Experiencia */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Mi perfil"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={true}
        />

        {/* Fila 1 - Carrera */}
        <div className="px-6">
          <ConfigRow
            title="Escolaridad"
            valueinput=""
            isTitle={false}
            placeholder="Licenciatura"
            isEditable={false}
            editInput={false}
          />
        </div>

        {/* Fila 2 - Resumen personal */}
        <div className="px-6">
          <ConfigRow
            title="Carrera"
            valueinput=""
            isTitle={false}
            placeholder="Ingeniería de Software"
            isEditable={false}
            editInput={false}
          />
        </div>

        {/* Fila 1 - Ubicación laboral */}
        <div className="px-6">
          <ConfigRow
            title="Experiencia Previa"
            valueinput=""
            isTitle={false}
            placeholder="Describa su experiencia profesional"
            isEditable={false}
            editInput={false}
          />
        </div>

        {/* Fila 2 - Horas preferentes */}
        <div className="px-6">
          <ConfigRow
            title="Puesto de interés"
            valueinput=""
            isTitle={false}
            placeholder="¿Qué puesto le interesa para trabajar?"
            isEditable={false}
            editInput={true}
          />
        </div>

         <ConfigRow
          title="Curriculum"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={true}
        />
         <div className="px-6">
          <ConfigRow
            title=""
            valueinput=""
            isTitle={false}
            placeholder="Seleccione una opción" //Archivo del Curriculum del usuario
            isEditable={false}
            editInput={true}
          />
        </div>
      </div>
    </div>
  );
}
