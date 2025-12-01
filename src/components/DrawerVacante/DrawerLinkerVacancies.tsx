import Image from 'next/image';
import { Balloon, Buildings, Calendar, ClockCircle, Dollar, Gps, MapPoint, User, Letter, PhoneCalling, AddCircle, InboxIn } from '@solar-icons/react';
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
import { workShiftLabelMap } from '@/app/linker/home/vacancies/rejected/page';
import { Separator } from '../ui/separator';
import { DataVacancies } from '../../data/testDataVacancies';
import AllowVacancyModal from '../ui/modal/AllowVacancy';
import { useState, useRef, useEffect } from 'react';

interface DrawerLinkerVacanciesProps {
  job: JobCardProps;
  sideDrawer: 'right' | 'left';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  company?: string;
  logoUrl?: string;
}

export default function DrawerLinkerVacancies({
  job,
  sideDrawer,
}: DrawerLinkerVacanciesProps) {


  if (!job) return null;

  return (
    //Job Card Container
    <div className="hover:border-uaq-brand-800 group flex flex-col rounded-lg border border-zinc-300 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      {/* Fila 1 - Trigger del Drawer */}
      <Drawer direction={sideDrawer === "left" ? "left" : "right"}>
        <DrawerTrigger asChild>
          <Button
            variant="primary"
            color='accent'
          >
            Revisar
          </Button>
        </DrawerTrigger>

        {/* Drawer Content */}
        <DrawerContent className="flex overflow-y-auto overflow-x-hidden bg-gray-50 pt-5">
          <DrawerHeader className="px-10">
            <div className="flex w-full items-center justify-between">
              {/* TÍTULO */}
              <DrawerTitle className="text-2xl font-[800]">
                VACANTE:{' '}
                <span className="font-[800] tracking-wide">
                  {job.title?.toUpperCase()}
                </span>
              </DrawerTitle>

              {/* BOTONES */}
              <div className="flex flex-row gap-4">
                <Button variant="primary" color="danger" className="px-6">
                  Rechazar
                </Button>
                <Button variant="primary" color="success" className="px-6">
                  Aprobar
                </Button>
              </div>
            </div>
          </DrawerHeader>

          <div className="w-10/12 bg-white justify-center mx-auto my-5 my-5shadow-md border border-gray-200 rounded-lg">
            {/* Número de plazas */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Número de plazas</h3>
              <div className="w-2/3">
                <span>{job.numberOfPositions ?? '-'}</span>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Descripción */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Descripción</h3>
              <div className="w-2/3">
                <p className="leading-relaxed text-gray-800">
                  {job.description ?? '-'}
                </p>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Sueldo mensual */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Sueldo mensual</h3>
              <div className="w-2/3">
                <span>{job.salaryRange ?? '-'}</span>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Prestaciones */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Prestaciones</h3>
              <div className="w-2/3">
                <span>{job.BenefitsSection ?? '-'}</span>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Escolaridad */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Escolaridad requerida</h3>
              <div className="w-2/3">
                <span>{job.degree ? String(job.degree).toLowerCase() : '-'}</span>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Horarios */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Horarios</h3>
              <div className="w-2/3">
                {workShiftLabelMap[job.schedule] ?? job.schedule ?? '-'}
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Género */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Género</h3>
              <div className="w-2/3">
                <span>{job.gender ?? 'Indistinto'}</span>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Rango de edad */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Rango de edad</h3>
              <div className="w-2/3">
                <span>{job.ageRange?.min ?? '-'} - {job.ageRange?.max ?? '-'}</span>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />

            {/* Datos adicionales */}
            <div className="px-10 py-6 flex justify-between">
              <h3 className="text-base font-medium w-1/3">Datos adicionales</h3>
              <div className="w-2/3">
                <span>{job.AdditionalInformation ?? '-'}</span>
              </div>
            </div>
            <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
          </div>

          <DrawerClose className='text-base font-bold hover:bg-zinc-200 border-0 text-uaq-danger px-4 py-3 rounded-md mx-auto mb-7'>
            Cancelar
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </div>
  );
}