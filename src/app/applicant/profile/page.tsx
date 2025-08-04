'use client';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { UserCircle } from '@solar-icons/react';

export default function Profile() {
  const sectionConfig = {
    profile: {
      icon: <UserCircle size={24} weight="Bold" />,
      title: 'INFORMACIÓN DE CONTACTO',
      description: 'Consulte y actualice su información personal'
    }
  };
  
  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection 
        sections={sectionConfig} 
        currentSection="profile" 
      />     
      
      {/* Sección de Experiencia */}
      <div className="border-zinc-300 rounded-lg border shadow-sm">
        <ConfigRow
          title="Perfil"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={true}
        />

        {/* Fila 1 - Carrera */}
        <div className="px-6">
          <ConfigRow
            title="Expediente"
            valueinput="307024"
            isTitle={false}
            placeholder="Contenido"
            isEditable={false}
            editInput={false}
          />
        </div>
        <div className="px-6">
          <ConfigRow
            title="Nombre"
            valueinput="Jane Daw"
            isTitle={false}
            placeholder="Contenido"
            isEditable={false}
            editInput={false}
          />
        </div>
        <div className="px-6">
          <ConfigRow
            title="Dirección"
            valueinput="88605 Shanelle Viaduct"
            isTitle={false}
            placeholder="Contenido"
            isEditable={false}
            editInput={false}
          />
        </div>
        <div className="px-6">
          <ConfigRow
            title="Fecha de nacimiento"
            valueinput="27/10/2002"
            isTitle={false}
            placeholder="Contenido"
            isEditable={false}
            editInput={false}
          />
        </div>
      </div>
    </div>
  );
}