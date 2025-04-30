'use client'
import UserTabs from "@/components/userTabs"
import { Button } from "@/components/ui/button"
import { Diploma } from "@solar-icons/react"
import { FormField } from "@/components/input"
import { vacancyOptions } from "@/data/selectOptions"
import { useState } from "react"
import CustomSelect from "@/components/select"

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
        <div className="flex items-center gap-3 bg-uaq-default-100 p-3 border-l-2 border-black">
          <Diploma size={24} weight="Bold"/>
          <span>PERFIL PROFESIONAL</span>
        </div>
        <p className="py-1">Edite los detalles de su experiencia profesional y habilidades destacadas, además de sus preferencias laborales</p>
        
        {/* Sección de Experiencia */}
        <div className="border border-uaq-default-300 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-uaq-default-50">
            <h2 className="text-400 font-[700] p-2">Experiencia</h2>
            <Button variant="outline" className="gap-2">
              Editar
            </Button>
          </div>
          
          {/* Fila 1 - Carrera */}
          <div className="gap-6 p-6">
            <div className="flex items-center gap-6 border-b border-uaq-default-200 pb-6">
              <label className="w-48 shrink-0">Carrera</label>
              <div className="flex-1">Ingeniería en Software</div>
            </div>
          </div>
          
          {/* Fila 2 - Resumen personal */}
          <div className="gap-6 p-6">
            <div className="flex items-center gap-6">
              <label className="w-48 shrink-0">Resumen personal</label>
              <FormField
                type="text"
                htmlFor="resume"
                placeholder="Describa su perfil profesional en una pequeña oración"
                className="flex-1"
              />
            </div>
          </div>
        
        {/* Sección de Preferencias */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-uaq-default-50">
            <h2 className="text-400 font-[700] p-2">Preferencias</h2>
            <Button variant="outline" className="gap-2">
              Editar
            </Button>
          </div>
          
          {/* Fila 1 - Ubicación laboral */}
          <div className="gap-6 px-6 pt-6">
            <div className="flex items-center gap-6 border-b border-uaq-default-200 pb-6">
              <label className="w-48 shrink-0">Preferencia de ubicación laboral</label>
              <FormField
                type="text"
                htmlFor="location"
                placeholder="¿En qué ubicación preferiría explorar ofertas de trabajo?"
                className="flex-1"
              />
            </div>
          </div>
          
          {/* Fila 2 - Horas preferentes */}
          <div className="gap-6 px-6 pt-6">
            <div className="flex items-center gap-6 border-b border-uaq-default-200 pb-6">
                <label className="w-48 shrink-0">Horas preferentes</label>
                <FormField
                    type="text"
                htmlFor="hours"
                placeholder="¿Qué horario laboral prefiere?"
                className="flex-1"
              />
            </div>
          </div>
          
          {/* Fila 3 - Modalidad de empleo */}
          <div className="gap-6 px-6 pt-6">
            <div className="flex items-center gap-6 pb-6">
              <label className="w-48 shrink-0">Modalidad de empleo preferente</label>
              <div className="flex-1">
                <CustomSelect 
                  placeholder="Seleccione una opción" 
                  options={vacancyOptions} 
                  onChange={setSelectedVacancy}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}