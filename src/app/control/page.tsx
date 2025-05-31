'use client';
import ApplicantTabs from '@/components/toreview/ApplicantTabs';
import { useState } from 'react';
import TitleSection from '@/components/toreview/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';

export default function Control() {
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-1 md:flex-row">
      {/* Columna izquierda - Tabs */}
      <div className="w-xl shrink-0 px-6">
        <ApplicantTabs />
      </div>

      {/* Columna derecha - Contenido principal */}
      <div className="mr-20 flex-1 space-y-6 p-4 md:p-6">
        {/* Encabezado */}
        <TitleSection variant="seguridad" />

        {/* Sección de Experiencia */}
        <div className="border-uaq-default-300 rounded-lg border shadow-sm">
          <ConfigRow
            title="Acceso"
            valueinput=""
            isTitle={true}
            placeholder=""
            isEditable={false}
            editInput={true}
          />

          {/* Fila 1 - Carrera */}
          <div className="px-6">
            <ConfigRow
              title="Correo electrónico"
              valueinput="bryanbona0406@gmail.com"
              isTitle={false}
              placeholder="Contenido"
              isEditable={true}
              editInput={true}
            />
          </div>
          <div className="px-6">
            <ConfigRow
              title="Número teléfonico"
              valueinput="4423464978"
              isTitle={false}
              placeholder="Contenido"
              isEditable={true}
              editInput={true}
            />
          </div>
          <div className="px-6">
            <ConfigRow
              title="Contraseña"
              valueinput="*************"
              isTitle={false}
              placeholder="Contenido"
              isEditable={true}
              editInput={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
