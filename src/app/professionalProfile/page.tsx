'use client'
import UserTabs from "@/components/userTabs"
import { useState } from "react"
import TitleSection from "@/components/titleSection"
import { ConfigRow } from "@/components/ConfigRow/ConfigRow"

export default function ProfessionalProfile() {
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null)
    
  return (
    <div className="flex flex-col md:flex-row gap-1 w-full">
      {/* Columna izquierda - Tabs */}
      <div className="w-xl px-6 shrink-0">
        <UserTabs/>
      </div>
      
      {/* Columna derecha - Contenido principal */}
      <div className="flex-1 p-4 md:p-6 space-y-6 mr-20">
        {/* Encabezado */}
      <TitleSection variant="seguridad"/>
    
        
        {/* Sección de Experiencia */}
        <div className="border border-uaq-default-300 rounded-lg shadow-sm">
        <ConfigRow title="Experiencia" valueinput="" isTitle={true} placeholder=""  isEditable={true} editInput={true}/>

          
          {/* Fila 1 - Carrera */}
          <div className="px-6">
            <ConfigRow title="Carrera" valueinput="" isTitle={false} placeholder="Ingeniería en Software"  isEditable={false} editInput={false}/>
          </div>
          
          {/* Fila 2 - Resumen personal */}
          <div className="px-6">
            
            <ConfigRow title="Resumen personal" valueinput="" isTitle={false} placeholder="Describa su perfil profesional en una pequeña oración"  isEditable={false} editInput={false}/>

          </div>
        
        {/* Sección de Preferencias */}
        <ConfigRow title="Preferencias" valueinput="" isTitle={true} placeholder=""  isEditable={true} editInput={true}/>

          
          {/* Fila 1 - Ubicación laboral */}
          <div className="px-6">
            <ConfigRow title="Preferencia de ubicación laboral" valueinput="" isTitle={false} placeholder="¿En qué ubicación preferiría explorar ofertas de trabajo?"  isEditable={false} editInput={false}/>
          </div>
          
          {/* Fila 2 - Horas preferentes */}
          <div className="px-6">
            <ConfigRow title="Horas preferentes" valueinput="" isTitle={false} placeholder="¿Qué horario laboral prefiere?"  isEditable={false} editInput={false}/>
          </div>
          
          {/* Fila 3 - Modalidad de empleo */}
          <div className="px-6">
            <ConfigRow title="Modalidad de empleo preferente" valueinput="" isTitle={false} placeholder="Seleccione una opción"  isEditable={false} editInput={false}/>
          </div>
        </div>
      </div>
    </div>
  )
}