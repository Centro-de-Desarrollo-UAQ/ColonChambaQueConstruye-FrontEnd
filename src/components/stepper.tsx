'use client'
import { useState } from 'react'
import { Button } from './ui/button'

interface Step {
  title: string
  content: React.ReactNode
}

interface StepperProps {
  steps: Step[]
  activeColor?: string
  inactiveColor?: string
  textColor?: string
  lineColor?: string
}

export function Stepper({ 
  steps, 
  activeColor = 'bg-uaq-brand', 
  inactiveColor = 'bg-uaq-default-200', 
  textColor = 'text-white',
  lineColor = 'bg-uaq-default-200'
}: StepperProps) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Contenedor principal que incluye barra de progreso y contenido */}
      <div className="bg-white rounded-lg shadow-md p-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Completa tu registro</h2>
        <h3 className="text-gray-600 mt-2 px-8">
          Rellena los campos para completar tu registro y acceder a todas las funciones que ofrece la plataforma
        </h3>
      </div>
        {/* Barra de progreso mejorada */}
        <div className="relative mb-8 w-3/4 mx-auto"> {/* 75% del ancho y centrado */}
        {/* Línea de fondo completa */}
          <div className={`absolute top-1/4 left-2 right-2 h-1 ${lineColor} -translate-y-1/4 z-0`}></div>
          
          {/* Línea de progreso activa (se llena según el paso actual) */}
          <div 
            className={`absolute top-1/4 left-2 h-1 ${activeColor} -translate-y-1/4 z-0 transition-all duration-300`}
            style={{ 
              width: `${(activeStep / (steps.length - 1)) * 100}%`,
              maxWidth: 'calc(100% - 42px)' // Ajuste para no sobrepasar el último punto
            }}
          ></div>
          
          {/* Contenedor de puntos/pasos */}
          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Punto del paso */}
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    index <= activeStep ? activeColor : inactiveColor
                  } ${textColor} font-bold mb-2`}
                >
                  {index + 1}
                </button>
                {/* Título del paso */}
                <span className={`text-sm ${
                  index === activeStep ? 'font-bold text-uaq-brand' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido del paso activo */}
        <div className="min-h-[300px] transition-all duration-300">
          {steps[activeStep].content}
        </div>

        {/* Controles de navegación */}
        <div className="flex justify-between">
          <Button
            onClick={() => setActiveStep(prev => Math.max(prev - 1, 0))}
            disabled={activeStep === 0}
            variant="outline"
            className="px-6 py-2"
          >
            Anterior
          </Button>
          
          <Button
            onClick={() => setActiveStep(prev => Math.min(prev + 1, steps.length - 1))}
            variant="default"
            className="px-6 py-2 bg-uaq-brand hover:bg-uaq-brand-dark"
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </div>
  )
}