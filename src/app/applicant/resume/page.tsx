'use client';
import { ResumeElement } from '@/components/common/ResumeElement';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { Documents } from '@solar-icons/react';

export default function Curriculum() {
  const sectionConfig = {
    profile: {
      icon: <Documents size={24} weight="Bold" />,
      title: 'CURRICULUM',
      description: 'Crre, suba y administre sus CV para postular empleos',
    },
  };

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de CV actual */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="CVs Subidos"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={true}
        />

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <ResumeElement displayName="CV_Principal_Bryan_Bonilla.pdf" action="edit" />
        </div>

        {/* Sección de CVs generados */}
        <ConfigRow
          title="CVs Subidos"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={true}
        />

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          <ResumeElement displayName="CV_Ingeniero_Software.pdf" action="edit" />
          <ResumeElement displayName="CV_Desarrollador_FullStack.pdf" action="edit" />
          <ResumeElement displayName="CV_Bryan_Bonilla_2024.pdf" action="edit" />
          <ResumeElement displayName="CV_Resumido.pdf" action="edit" />
          <ResumeElement displayName="CV_Inglés.pdf" action="edit" />
          <ResumeElement displayName="CV_Ejecutivo.pdf" action="edit" />
        </div>
      </div>
    </div>
  );
}
