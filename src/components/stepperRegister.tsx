'use client'
import { Button } from '@/components/ui/button'
import { Stepper } from '@/components/stepper'
import { Separator } from "@/components/ui/separator"
import { FormField } from '@/components/input'
import InputBirthDate from '@/components/inputBirthDate'
import PhoneInput from '@/components/phoneInput'
import CustomSelect from '@/components/select'
import { useCallback, useState } from 'react'
import { vacancyOptions } from '@/data/selectOptions'
import { Label } from '@/components/ui/label'
import { UploadFile } from '@/components/uploadFile'
import { UploadedFile } from '@/components/uploadedFile'
import { FileSmile, FileSend } from '@solar-icons/react'

const COMMON_TEXTS = {
  dropText: "Arrastra y suelta tu archivo aquí ó",
  buttonText: "Selecciona un archivo",
}

const LANGUAGE_SPECIFIC_TEXTS = {
  spanish: {
    fileName: "foto_perfil.jpg"
  },
  english: {
    fileName: "profile_photo.jpg"
  }
}

export default function StepperRegister() {
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)

  const onDropPhoto = useCallback((acceptedFiles: File[]) => {
    setProfilePhoto(acceptedFiles[0])
  }, [])

  const handleRemovePhoto = () => {
    setProfilePhoto(null)
  }

  const steps = [
    {
      title: "Paso 1",
      content: (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h3 className="text-xl font-bold">Información Personal</h3>
            <div className='flex items-center'>
              <span className="text-sm text-uaq-default-400">
                <span className="text-300 text-uaq-danger mr-1">*</span>Campos obligatorios
              </span>
            </div>
          </div>
          
          <Separator />
              
          <div className="space-y-4 mb-6">
            <FormField
              label="Nombre"
              type="text"
              htmlFor="name"
              placeholder="Bryan Gersain"
              disabled
              className='mt-6'
            />
            
            <FormField
              label="Apellido"
              type="text"
              htmlFor="lastname"
              disabled
              placeholder="Bonilla Nandayapa"
            />
            
            <FormField
              label="Dirección"
              description="Ingresa tu dirección..."
              type="text"
              htmlFor="address"
              placeholder="Av. De las ciencias"
            />
            
            <InputBirthDate/>
          </div>
          
          <h3 className="text-xl font-bold mb-4">Cuenta y acceso</h3>
          <Separator/>
          
          <div className="space-y-4 mt-6">
            <FormField
              label="Correo Electrónico"
              type="email"
              htmlFor="email"
              disabled
              placeholder='bryanbona0406@gmail.com'
            />
            
            <PhoneInput/>

            <FormField
              label="Contraseña"
              type="text"
              htmlFor="text"
              disabled
              placeholder='***********'
            />
          </div>
          
          <div className="my-6 text-sm text-gray-600">
            <p>
              Al continuar, confirmas que has leído y aceptas las Condiciones Legales y la Política de Privacidad de la Bolsa de Trabajo UAQ. Estos términos regulan el uso de la plataforma para gestionar tu perfil, aplicar a ofertas de empleo y contactar con empresas interesadas en tu perfil profesional.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Paso 2",
      content: (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h3 className="text-xl font-bold">Información Personal</h3>
            <div className='flex items-center'>
              <span className="text-sm text-uaq-default-400">
                <span className="text-300 text-uaq-danger mr-1">*</span>Campos obligatorios
              </span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4 py-6">
            <FormField
              label="Carrera"
              description="Ingresa la carrera o ámbito de estudio al que se dedique"
              type="text"
              htmlFor="career"
            />
            
            <FormField
              label="Resumen personal"
              description="Describa su perfil profesional en una pequeña oración"
              type="text"
              htmlFor="summary"
            />
            
            <h3 className="text-xl font-bold mb-4 mt-6">Preferencias</h3>
            <Separator/>
            
            <FormField
              label="Preferencia de ubicación laboral"
              description="¿En qué ubicación preferiría explorar ofertas de trabajo?"
              type="text"
              htmlFor="location"
              className='mt-6'
            />
            
            <div className='flex gap-4'>
              <div className="flex-1">
                <FormField
                  label="Horas preferentes"
                  description="¿Qué cantidad de horas prefiere trabajar a la semana?"
                  type="text"
                  htmlFor="hours"
                />
              </div>
              
              <div className="flex-1">
              <Label htmlFor="vacancy" className="mb-3">Modalidad de empleo preferente</Label>
                <CustomSelect 
                  placeholder="Seleccione una opción" 
                  options={vacancyOptions} 
                  onChange={setSelectedVacancy}
                />
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4 mt-8">Currículum</h3>
            <Separator />
            
            <div className='flex gap-4 mt-10'>
              <Button variant="primary" color="accent" className="flex-1"><FileSend weight='Bold'/>Sube tu CV</Button>
              <Button variant="secondary" color="brand" className="flex-1"><FileSmile weight='Bold'/>Crea tu CV</Button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Paso 3",
      content: (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h3 className="text-xl font-bold">Información Personal</h3>
            <div className='flex items-center'>
              <span className="text-sm text-uaq-default-400">
                <span className="text-300 text-uaq-danger mr-1">*</span>Campos obligatorios
              </span>
            </div>
          </div>
          
          <p className="mb-4">Añade una foto a tu perfil. Si no cuentas con una ahora, podrás hacerlo más adelante</p>
          <Separator className="my-4"/>
          
          <div className="mt-6">
          {profilePhoto ? (
            <UploadedFile
              file={profilePhoto} 
              defaultFileName={LANGUAGE_SPECIFIC_TEXTS.spanish.fileName}
              action="upload"
              onView={() => window.open(URL.createObjectURL(profilePhoto), '_blank')}
              onRemove={handleRemovePhoto}
            />
          ) : (
            <UploadFile
              language="spanish"
              onDrop={onDropPhoto}
              dropText={COMMON_TEXTS.dropText}
              buttonText={COMMON_TEXTS.buttonText}
            />
          )}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="container mx-auto py-8">
      <Stepper 
        steps={steps}
        activeColor="bg-uaq-brand"
        inactiveColor="bg-uaq-default-200"
        textColor="text-white"
      />
    </div>
  )
}