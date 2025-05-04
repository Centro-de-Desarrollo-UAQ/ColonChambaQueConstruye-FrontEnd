'use client'
import UserTabs from "@/components/userTabs"
import { Button } from "@/components/ui/button"
import { FileDisplay } from "@/components/fileDisplay"
import TitleSection from "@/components/titleSection"
import { ConfigRow } from "@/components/ConfigRow/ConfigRow"

export default function Curriculum() {
  return (
    <div className="flex flex-col md:flex-row gap-1 w-full">
      {/* Columna izquierda - Tabs */}
      <div className="w-xl px-6 shrink-0">
        <UserTabs/>
      </div>
      
      {/* Columna derecha - Contenido principal */}
      <div className="flex-1 p-10 md:p-6 space-y-6 mr-20">
          <TitleSection variant="curriculum"/>
        
        {/* Sección de CV actual */}
        <div className="border border-uaq-default-300 rounded-lg shadow-sm">
          <ConfigRow title="CVs Subidos" valueinput="" isTitle={true} placeholder=""  isEditable={true} editInput={true}/>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <FileDisplay 
              displayName="CV_Principal_Bryan_Bonilla.pdf"
              action="edit"
            />
          </div>
        
        {/* Sección de CVs generados */}
        <ConfigRow title="CVs Subidos" valueinput="" isTitle={true} placeholder=""  isEditable={true} editInput={true}/>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <FileDisplay 
              displayName="CV_Ingeniero_Software.pdf"
              action="edit"
            />
            <FileDisplay 
              displayName="CV_Desarrollador_FullStack.pdf"
              action="edit"
            />
            <FileDisplay 
              displayName="CV_Bryan_Bonilla_2024.pdf"
              action="edit"
            />
            <FileDisplay 
              displayName="CV_Resumido.pdf"
              action="edit"
            />
            <FileDisplay 
              displayName="CV_Inglés.pdf"
              action="edit"
            />
            <FileDisplay 
              displayName="CV_Ejecutivo.pdf"
              action="edit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}