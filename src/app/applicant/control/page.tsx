'use client';
import UserTabs from '@/components/userTabs';
import TitleSection from '@/components/titleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { ShieldKeyholeMinimalistic } from '@solar-icons/react';

export default function Control() {
  const sectionConfig = {
    profile: {
      icon: <ShieldKeyholeMinimalistic size={24} weight="Bold" />,
      title: 'ACCESO Y SEGURIDAD',
      description: 'Administra la información de acceso a su cuenta'
    }
  };
  return (
    <div className="flex w-full flex-col gap-1 md:flex-row">
      {/* Columna izquierda - Tabs */}
      <div className="w-xl shrink-0 px-6">
        <UserTabs />
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
              editInput={false}
            />
          </div>
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
    </div>
  );
}
