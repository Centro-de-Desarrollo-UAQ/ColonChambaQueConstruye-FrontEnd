'use client';
import UserTabs from '@/components/userTabs';
import { ResumeElement } from '@/components/toreview/ResumeElement';
import TitleSection from '@/components/titleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';

export default function Curriculum() {
  return (
    <div className="flex w-full flex-col gap-1 md:flex-row">
      {/* Columna izquierda - Tabs */}
      <div className="w-xl shrink-0 px-6">
        <UserTabs />
      </div>

      {/* Columna derecha - Contenido principal */}
      <div className="mr-20 flex-1 space-y-6 p-10 md:p-6">
        <TitleSection variant="curriculum" />

        {/* Sección de CV actual */}
        <div className="border-uaq-default-300 rounded-lg border shadow-sm">
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
    </div>
  );
}
