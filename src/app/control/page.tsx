'use client'
import UserTabs from "@/components/userTabs"
import { Button } from "@/components/ui/button"
import { ShieldKeyholeMinimalistic } from "@solar-icons/react"
import { FormField } from "@/components/input"
import { vacancyOptions } from "@/data/selectOptions"
import { useState } from "react"
import CustomSelect from "@/components/select"
import TitleSection from "@/components/titleSection"
import { ConfigRow } from "@/components/ConfigRow/ConfigRow"

export default function Control() {
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
          <ConfigRow title="Acceso" valueinput="" isTitle={true} placeholder=""  isEditable={false} editInput={true}/>
          
          
          {/* Fila 1 - Carrera */}
          <div className="gap-6 px-6 pt-6">
            <ConfigRow title="Correo electrónico" valueinput="bryanbona0406@gmail.com" isTitle={false} placeholder="Contenido"  isEditable={true} editInput={true}/>
          </div>
          <div className="gap-6 px-6 pt-6">
          <ConfigRow title="Número teléfonico" valueinput="4423464978" isTitle={false} placeholder="Contenido"  isEditable={true} editInput={true}/>
          </div>
          <div className="gap-6 px-6 pt-6">
            <ConfigRow title="Contraseña" valueinput="*************" isTitle={false} placeholder="Contenido"  isEditable={true} editInput={true}/>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}