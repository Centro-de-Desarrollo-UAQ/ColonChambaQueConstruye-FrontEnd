'use client';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { ShieldKeyholeMinimalistic } from '@solar-icons/react';

export default function Control() {
  const sectionConfig = {
    profile: {
      icon: <ShieldKeyholeMinimalistic size={24} weight="Bold" />,
      title: 'ACCESO Y SEGURIDAD',
      description: 'Administra la información de acceso a su cuenta',
    },
  };

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de Acceso */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Acceso"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={false}
          editInput={true}
        />

        {/* Fila 1 - Correo electrónico */}
        <div className="px-6">
          <ConfigRow
            title="Correo electrónico"
            valueinput="bryanbona0406@gmail.com"
            isTitle={false}
            placeholder="Contenido"
            isEditable={true}
            editInput={false}
          />
        </div>

        {/* Fila 2 - Número telefónico */}
        <div className="px-6">
          <ConfigRow
            title="Número teléfonico"
            valueinput="4423464978"
            isTitle={false}
            placeholder="Contenido"
            isEditable={true}
            editInput={false}
          />
        </div>

        {/* Fila 3 - Contraseña */}
        <div className="px-6">
          <ConfigRow
            title="Contraseña"
            valueinput="*************"
            isTitle={false}
            placeholder="Contenido"
            isEditable={true}
            editInput={false}
          />
        </div>
      </div>
    </div>
  );
}
