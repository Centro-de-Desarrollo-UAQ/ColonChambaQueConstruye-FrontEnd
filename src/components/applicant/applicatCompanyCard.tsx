import Image from 'next/image';
import { Balloon, Buildings, Calendar, ClockCircle, Dollar, Gps, Letter, MapPoint, User } from '@solar-icons/react';
import { PlusCircle } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button';
import { ApplicantCompanyCardProps } from '@/interfaces/applicantCompanyCard';


interface applicantComanieCardApplicationProps {
  job: ApplicantCompanyCardProps
  sideDrawer?: "left" | "right"
}

function daysSince(date: string): number {
  const today = new Date();
  const registeredDate = new Date(date);
  // Se trata de normalizar ambas fechas a medianoche local
  today.setHours(0, 0, 0, 0);
  registeredDate.setHours(0, 0, 0, 0);

  //Se obtiene los dias de diferencia en milisegundos por lo que se regresa convertido a dias truncandolo
  const diffMs = today.getTime() - registeredDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export default function ApplicantCompanyCard({
  job, sideDrawer
}: applicantComanieCardApplicationProps) {
  return (
    <div className="hover:border-uaq-brand-800 group flex flex-col w-8/12 rounded-lg border border-zinc-300 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      {/* Fila 1 - Logo de la empresa, nombre del trabajo, nobmre de la empresa, jornada y modalidad */}
      <Drawer direction={sideDrawer === "left" ? "left" : "right"}>
      <div className="flex flex-row items-center">
        <div className="w-[100px] flex-shrink-0 rounded-l-lg p-4 transition-colors duration-300">
          <Image
            src={job.logoUrl ?? "/Deloitte.svg"}
            alt={`${job.company} Logo`}
            width={60}
            height={60}
            className="mx-auto h-15 w-15 object-contain"
          />
        </div>

        <div className="flex flex-1 flex-col self-center px-4 py-4 transition-colors duration-300">
          <div className="flex-1 space-y-1 text-start">
            <div className="text-lg font-[800]">{job.company }</div>
           
          </div>
        </div>

        <div className="flex w-[250px] flex-col justify-center gap-2 self-center rounded-r-lg p-4 transition-colors duration-300">
          <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
            <User className="h-4 w-4" weight="Linear" />
            <span className="whitespace-nowrap">{job.contact}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
            <Letter className="h-4 w-4" weight="Linear" />
            <span>{job.correo}</span>
          </div>
        </div>
      </div>
      {/* Fila 2 - Descripción del trabajo y direccion de la empresa */}
      <div className="flex flex-col px-2">
        <div className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-500 mx-3">
          
        </div>

      <div className="flex justify-between items-end px-4 py-4 transition-colors duration-300">
        {/* Descripción */}
        <div className="font-[400] text-gray-600 w-9/12">
              {job.description}
          </div>
                  
        {/* Botón de información */}
  
        <DrawerTrigger className="font-[400] text-gray-600 group-hover:text-gray-800 hover:text-uaq-brand active:text-uaq-brand-hover cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-3 rounded-2xl flex items-center gap-2 text-l transition-colors duration-200 ml-3">
            <PlusCircle className="h-4 w-4 text-purple-700" />
            <div className='text-purple-700'>
              Información
            </div>
            
        </DrawerTrigger>
          
      </div>
      </div>
    
      
      <DrawerContent className="overflow-y-auto overflow-x-hidden">
        <DrawerHeader className='px-10 items-start'>
          <DrawerTitle className='text-2xl font-[800]'>{job.title}</DrawerTitle>
          <div className="flex flex-row items-center w-full">
            <div className="w-[100px] flex-shrink-0 rounded-l-lg p-4">
              <Image
                src={job.logoUrl ?? "/Deloitte.svg"}
                alt={`${job.company} Logo`}
                width={60}
                height={60}
                className="mx-auto h-15 w-15 object-contain"
              />
            </div>

            <div className="flex flex-1 flex-col self-center text-start px-4 py-4">
              <div className="text-xl font-bold">{job.company}</div>
            </div>
            <div className="flex flex-col self-center px-4 py-4 items-end text-end">
              <div className="text-base">{"Hace "+daysSince(job.description ?? "2025-09-23")+" dias"}</div>
            </div>
          </div>

          <div className="flex w-[250px] flex-col gap-2 rounded-r-lg py-4">
            <div className="flex items-center gap-2">
              <MapPoint className="h-4 w-4" weight="Linear" />
              <h5>Dirección: </h5>
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gps className="h-4 w-4" weight="Linear" />
              <h5>Modalidad: </h5>
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockCircle className="h-4 w-4" weight="Linear" />
              <h5>Jornada: </h5>
              <span className="whitespace-nowrap">{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" weight="Linear" />
              <h5 className='whitespace-nowrap'>Dias Laborables: </h5>
              <span className="whitespace-nowrap">{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Dollar className="h-4 w-4" weight="Linear" />
              <h5>Salario: </h5>
              <span className="whitespace-nowrap">{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" weight="Linear" />
              <h5>Género: </h5>
              <span className="whitespace-nowrap">{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Balloon className="h-4 w-4" weight="Linear" />
              <h5>Edad: </h5>
              <span className="whitespace-nowrap">{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <Buildings className="h-4 w-4" weight="Linear" />
              <h5>Sector: </h5>
              <span className="whitespace-nowrap">{job.company}</span>
            </div>
          </div>

          <hr className='w-full'/>
          <h2 className='text-xl font-[800] text-uaq-brand'>ACERCA DEL EMPLEO</h2>
          <h3 className='text-lg font-[600]'>Descripción</h3>
          <DrawerDescription className='text-left text-gray-600 text-base'>{job.description}</DrawerDescription>
          <h3 className='text-lg font-[600]'>Perfil requerido</h3>
          <DrawerDescription className='text-left text-gray-600 text-base'>{job.title}</DrawerDescription>
          <h3 className='text-lg font-[600]'>Carreras afines</h3>
          <DrawerDescription className='text-left text-gray-600 text-base'>{job.title}</DrawerDescription>
          <h3 className='text-lg font-[600]'>Beneficios</h3>
          <DrawerDescription className='text-left text-gray-600 text-base'>{job.title}</DrawerDescription>
          <h3 className='text-lg font-[600]'>Prestaciones ofrecidas</h3>
          <DrawerDescription className='text-left text-gray-600 text-base'>{job.title}</DrawerDescription>
          <h3 className='text-lg font-[600]'>Experiencia requerida</h3>
          <DrawerDescription className='text-left text-gray-600 text-base'>{job.title}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="primary">Enviar Solicitud</Button>
          <DrawerClose className='text-uaq-brand rounded-xs bg-uaq-white hover:bg-gray-100 hover:text-uaq-brand-hover transition-all duration-200'> {/* Se eliminara? */}
            Cancelar
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    

    </div>
  );
}
