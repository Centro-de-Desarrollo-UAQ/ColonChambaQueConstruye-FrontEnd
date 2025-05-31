'use client';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { InfoCard } from '@/components/settings/InfoCard';
import TabOptions from '@/components/tabOptions';
import TitleSection from '@/components/titleSection';
import { UserCircle, Buildings } from '@solar-icons/react';

export default function ProfileEmployer() {
  const sectionConfig = {
    employerProfile: {
      icon: <Buildings size={24} weight="Bold" />,
      title: 'INFORMACIÓN EMPRESARIAL',
      description: 'Consulte y actualice la información de su empresa',
    },
  };

  const tabsConfig = [
    {
      value: 'employerProfile',
      route: '/employer/profile',
      icon: <Buildings size={24} weight="Bold" />,
      label: 'Información empresarial',
    },
    {
      value: 'employerControl',
      route: '/employer/control',
      icon: <UserCircle size={24} weight="Bold" />,
      label: 'Cuenta y acceso',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-1 py-10 md:flex-row">
      {/* Columna izquierda - Perfil y tabs */}
      <div className="mx-auto max-w-md bg-white">
        <InfoCard
          avatar="https://github.com/shadcn.png"
          name="Deloitte QRO"
          email="contacto_qro@deloitte.com"
          cellphone="+52 441 441 22 22"
        />

        <div className="w-full px-4 pb-8">
          <TabOptions tabs={tabsConfig} defaultTab="employerProfile" />
        </div>
      </div>

      {/* Columna derecha - Contenido principal */}
      <div className="mr-20 flex-1 space-y-6 p-4 md:p-6">
        {/* Encabezado */}
        <TitleSection sections={sectionConfig} currentSection="employerProfile" />

        {/* Sección de Información */}
        <div className="border-uaq-default-300 rounded-lg border shadow-sm">
          <ConfigRow
            title="Información de la empresa"
            valueinput=""
            isTitle={true}
            placeholder=""
            isEditable={true}
            editInput={true}
          />

          {/* Fila 1 - Expediente */}
          <div className="px-6">
            <ConfigRow
              title="Nombre"
              valueinput="Deloitte QRO"
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
            />
          </div>

          {/* Fila 2 - Nombre */}
          <div className="px-6">
            <ConfigRow
              title="Descripción"
              valueinput="Lorem ipsum dolor sit amet consectetur adipiscing elit sodales id sem, fringilla non justo phasellus porttitor fames morbi senectus sollicitudin vivamus, integer condimentum montes dis risus pretium urna et tempus. Netus odio aptent maecenas auctor convallis torquent suspendisse nisi habitant felis nisl, lacinia cubilia hac mi placerat aliquam natoque habitasse ut proin vehicula neque, elementum libero per ad a dignissim pellentesque quis inceptos nibh. Litora tellus iaculis cursus pulvinar primis, ultrices dictumst eleifend penatibus metus euismod, dictum lectus imperdiet arcu."
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
              multiline={true}
            />
          </div>

          {/* Fila 3 - Dirección */}
          <div className="px-6">
            <ConfigRow
              title="Sector de trabajo"
              valueinput="Informática"
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
            />
          </div>

          {/* Fila 4 - Fecha */}
          <div className="px-6">
            <ConfigRow
              title="Correo electrónico de contacto"
              valueinput="contacto_qro@deloitte.com"
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
            />
          </div>
          <div>
            <ConfigRow
              title="Dirección"
              valueinput=""
              isTitle={true}
              placeholder=""
              isEditable={true}
              editInput={true}
            />
          </div>
          <div className='px-6'>
             <ConfigRow
              title="Código postal"
              valueinput="76100"
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false  }
            />
          </div>
          <div className='px-6'>
            <ConfigRow
              title="País"
              valueinput="México"
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
            />
          </div>
          <div className='px-6'>
            <ConfigRow
              title="Dirección"
              valueinput="Av. Antea 1090-Piso 7, Santiago de Querétaro, Qro."
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
            />
          </div>
          <div>
            <ConfigRow
              title="Datos fiscales"
              valueinput=""
              isTitle={true}
              placeholder=""
              isEditable={true}
              editInput={true}
            />
          </div>
          <div className='px-6'>
             <ConfigRow
              title="RFC"
              valueinput="ABC123456T78"
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
            />
          </div>
          <div className='px-6'>
             <ConfigRow
              title="Razón Social"
              valueinput="Deloitte"
              isTitle={false}
              placeholder="Contenido"
              isEditable={false}
              editInput={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
