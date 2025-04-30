'use client'
import UserTabs from "@/components/userTabs"
import { Button } from "@/components/ui/button"
import { ShieldKeyholeMinimalistic } from "@solar-icons/react"
import { FormField } from "@/components/input"
import { vacancyOptions } from "@/data/selectOptions"
import { useState } from "react"
import CustomSelect from "@/components/select"

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
        <div className="flex items-center gap-3 bg-uaq-default-100 p-3 border-l-2 border-black">
          <ShieldKeyholeMinimalistic size={24} weight="Bold"/>
          <span>ACCESO Y SEGURIDAD</span>
        </div>
        <p className="py-1">Administre la información de acceso a su cuenta</p>
        
        {/* Sección de Experiencia */}
        <div className="border border-uaq-default-300 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-uaq-default-50">
            <h2 className="text-400 font-[700] p-2">Acceso</h2>
          </div>
          
          {/* Fila 1 - Carrera */}
          <div className="gap-6 px-6 pt-6">
            <div className="flex items-center border-b border-uaq-default-200 pb-6">
              <label className="w-48 shrink-0">Correo electronico</label>
              <div className="flex-1">bryanbona0406@gmail.com</div>
              <Button variant="outline" className="gap-2">
              Editar
            </Button>
            </div>
          </div>
          <div className="gap-6 px-6 pt-6">
            <div className="flex items-center border-b border-uaq-default-200 pb-6">
              <label className="w-48 shrink-0">Numero telefonico</label>
              <div className="flex-1">+52 442 346 4978</div>
              <Button variant="outline" className="gap-2">
              Editar
            </Button>
            </div>
          </div>
          <div className="gap-6 px-6 pt-6">
            <div className="flex items-center pb-6">
              <label className="w-48 shrink-0">Contraseña</label>
              <div className="flex-1">***********</div>
              <Button variant="outline" className="gap-2">
              Editar
            </Button>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}