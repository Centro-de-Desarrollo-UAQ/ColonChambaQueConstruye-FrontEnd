import Image from 'next/image';
import { Balloon, Buildings, Calendar, ClockCircle, Dollar, Gps, MapPoint, User,Letter,PhoneCalling,AddCircle } from '@solar-icons/react';
import { JobCardProps } from '@/interfaces';
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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CompanyAvatar from '../common/AvatarTrasnform';

interface jobCardApplicationProps {
  job: JobCardProps
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
//Hola aqui generare el tomar las iniciales:


export default function DrawerApplicantVacant({
  job, sideDrawer
}: jobCardApplicationProps) {
  return (
    //Job Card Container
    <div className="hover:border-uaq-brand-800 group flex flex-col w-12/12 rounded-lg border border-zinc-300 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      {/* Fila 1 - Logo de la empresa, nombre del trabajo, nobmre de la empresa, jornada y modalidad */}
        <Drawer direction={sideDrawer === "left" ? "left" : "right"}>
          <div className="flex flex-row max-w-full items-center ">
            <div className="w-[100px] flex-shrink-0 rounded-l-lg p-4 transition-colors duration-300">
              <CompanyAvatar 
                companyName={job.company} 
                logoUrl={job.logoUrl} 
                size="md" // O el tamaño que necesites
              />
            </div>

            <div className="flex flex-1 flex-col self-center px-4 py-4 transition-colors duration-300">
              <div className="flex-1 space-y-1 text-start">
                <div className="text-lg font-[800]">{job.title /* Nombre del trabajo */}</div>
                <div className="text-l">{job.company /* Nombre de la empresa */}</div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 self-center rounded-r-lg p-4 transition-colors duration-300 ">
              <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                <ClockCircle className="h-4 w-4" weight="Linear" />
                <span className="whitespace-nowrap">{job.schedule /* Horario de trabajo */}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                <Gps className="h-4 w-4" weight="Linear" />
                <span>{job.modality /* Modalidad de empleo (híbrido, remoto, presencial) */}</span>
              </div>
            </div>

          </div>

          {/* Fila 2 - Descripción del trabajo y direccion de la empresa */}
          <div className="flex flex-col px-2">
            <div className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-500 mx-3">
              <MapPoint className="h-4 w-4" weight="Linear" />
              <span className="whitespace-nowrap">{job.location /* Dirección de la empresa */}</span>
            </div>

            <div className="flex flex-1 flex-col self-center px-4 py-4 transition-colors duration-300">
              <div className="flex-1 space-y-1 text-start">
                <div className="text-start font-[400] text-gray-600">{job.description /* Descripción del trabajo */}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row px-5 mb-5">
            <div className="flex items-center gap-2 text-l font-[600] text-uaq-terniary transition-colors duration-200 group-hover:text-uaq-brand-hover mx-3">
              <span className="text-start">{job.salaryRange /* Rango salarial */}</span>
            </div>

            <div className="flex flex-1 flex-col self-center px-4 py-4 transition-colors duration-300 items-end">
              <DrawerTrigger className="text-start font-[400] text-uaq-terniary group-hover:text-uaq-terniary-hover hover:text-uaq-brand active:text-uaq-terniary-hover cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-3 rounded-2xl flex items-center gap-2 text-l transition-colors duration-200 mx-3">
                <AddCircle weight='Bold' className="h-4 w-4" />
                Información
              </DrawerTrigger>
            </div>
          </div>
        
          {/* Drawer Content */}
          <DrawerContent className="overflow-y-auto overflow-x-hidden">
            <DrawerHeader className='px-10 items-start'>
              <DrawerTitle className='text-2xl font-[800]'>
                {job.title /* Nombre del trabajo */}
              </DrawerTitle>
              <div className="flex flex-row items-center w-full">
                <div className="w-[100px] flex-shrink-0 rounded-l-lg p-4">
                  <CompanyAvatar 
                    companyName={job.company} 
                    logoUrl={job.logoUrl} 
                    size="md" // O el tamaño que necesites
                  />
                </div>

                <div className="flex flex-1 flex-col self-center text-start px-4 py-4">
                  <div className="text-xl font-bold">{job.company /* Nombre de la empresa */}</div>
                </div>
                <div className="flex flex-col self-center px-4 py-4 items-end text-end">
                  <div className="text-base">{"Hace "+daysSince(job.createdAt )+" dias" /* Tiempo desde la publicación */}</div>
                </div>
              </div>

              <div className="flex  w-[250px] flex-col gap-2 rounded-r-lg py-4">
                <div className="flex items-center gap-2">
                  <MapPoint className="h-4 w-4" weight="Linear" />
                  <h5>Dirección: </h5>
                  <span className="whitespace-nowrap">{job.location /* Dirección de la empresa */}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gps className="h-4 w-4" weight="Linear" />
                  <h5>Modalidad: </h5>
                  <span >{job.modality /* Modalidad de empleo (híbrido, remoto, presencial) */}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockCircle className="h-4 w-4" weight="Linear" />
                  <h5>Jornada: </h5>
                  <span className="whitespace-nowrap">{job.schedule /* Jornada laboral */}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" weight="Linear" />
                  <h5 className='whitespace-nowrap'>Dias Laborables: </h5>
                  <span className="whitespace-nowrap">{job.modality /* Modalidad de empleo (híbrido, remoto, presencial) */}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dollar className="h-4 w-4" weight="Linear" />
                  <h5>Salario: </h5>
                  <span className="whitespace-nowrap">{job.salaryRange /* Rango salarial */}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" weight="Linear" />
                  <h5>Género: </h5>
                  <span className="whitespace-nowrap">{job.description /* Género */}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Balloon className="h-4 w-4" weight="Linear" />
                  <h5>Edad: </h5>
                  <span className="whitespace-nowrap">{job.description /* Edad */}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Buildings className="h-4 w-4" weight="Linear" />
                  <h5>Sector: </h5>
                  <span className="whitespace-nowrap">{job.description /* Sector */}</span>
                </div>
              </div>

              <hr className='w-full'/>
              <h2 className='text-xl font-[800] text-uaq-brand'>ACERCA DEL EMPLEO</h2>
              <h3 className='text-lg font-[600]'>Descripción</h3>
              <DrawerDescription className='text-left text-gray-600 text-base'>{job.description /** Descripción del trabajo */}</DrawerDescription>
              <h3 className='text-lg font-[600]'>Perfil requerido</h3>
              <DrawerDescription className='text-left text-gray-600 text-base'>{job.title /** Título del trabajo */}</DrawerDescription>
              <h3 className='text-lg font-[600]'>Carreras afines</h3>
              <DrawerDescription className='text-left text-gray-600 text-base'>{job.title /** Carreras afines */}</DrawerDescription>
              <h3 className='text-lg font-[600]'>Beneficios</h3>
              <DrawerDescription className='text-left text-gray-600 text-base'>{job.title /** Beneficios ofrecidos por el empleador */}</DrawerDescription>
              <h3 className='text-lg font-[600]'>Prestaciones ofrecidas</h3>
              <DrawerDescription className='text-left text-gray-600 text-base'>{job.title /** Prestaciones ofrecidas */}</DrawerDescription>
              <h3 className='text-lg font-[600]'>Experiencia requerida</h3>
              <DrawerDescription className='text-left text-gray-600 text-base'>{job.title /** Experiencia requerida */}</DrawerDescription>
            </DrawerHeader>


            <div className='flex flex-row mx-10 px-10 gap-5 mb-5 border-2 rounded-xl justify-between bg-uaq-white'>
              <div className='flex flex-col'>
                <h3 className='text-lg py-5 font-[600]'>Información de contacto</h3>
                <span className="whitespace-nowrap pb-5">{job.company}</span>
              </div>
              
              <div className='flex flex-col items-start'>
                <div className='flex flex-row items-center gap-2 py-5'>
                  <PhoneCalling className="h-4 w-4 mr-2" weight="Linear" />
                  <span className='whitespace-nowrap'>{job.cellPhone}{/*Número de teléfono */}</span>
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <Letter className="h-4 w-4 mr-2" weight="Linear" />
                  <span className="whitespace-nowrap">{job.email}{ /*Correo electrónico */}</span>
                </div>
              </div>
            </div>
          </DrawerContent>
      </Drawer>
    </div>
  );
}
