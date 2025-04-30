'use client'
import UserTabs from "@/components/userTabs"
import { Button } from "@/components/ui/button"
import { FileDisplay } from "@/components/fileDisplay"
import { Documents } from "@solar-icons/react"

export default function Curriculum() {
  return (
    <div className="flex flex-col md:flex-row gap-1 w-full">
      {/* Columna izquierda - Tabs */}
      <div className="w-xl px-6 shrink-0">
        <UserTabs/>
      </div>
      
      {/* Columna derecha - Contenido principal */}
      <div className="flex-1 p-4 md:p-6 space-y-6 mr-20">
          <div className="flex items-center gap-3 bg-uaq-default-100 p-3 border-l-2 border-black">
            <Documents size={24} weight="Bold"/>
            <span>CURRICULUM</span>
          </div>
          <p className="py-1">Cree, suba y administre sus CV para postular empleos</p>
        
        {/* Sección de CV actual */}
        <div className="border border-uaq-default-300 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-uaq-default-50">
            <h2 className="text-400 font-[700] p-2">CVs Subidos</h2>
            <Button variant="outline" className="gap-2">
              Subir nuevo CV
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <FileDisplay 
              displayName="CV_Principal_Bryan_Bonilla.pdf"
              action="edit"
            />
          </div>
        
        {/* Sección de CVs generados */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-uaq-default-50">
            <h2 className="text-400 font-[700] p-2">CVs Subidos</h2>
            <Button variant="outline" className="gap-2">
              Generar nuevo CV
            </Button>
          </div>
          
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