import Image from 'next/image';
import { AddCircle, Balloon, Buildings, Calendar, ClockCircle, Dollar, Gps, Letter, MapPoint, Phone, PhoneCalling, User } from '@solar-icons/react';
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
import { CompanyData } from '@/interfaces';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { UserCandidate, listAcademicLevelOptions } from '@/interfaces/usercandidates';
import { dateToLocaleDateString } from '@/lib/utils';

interface LinkerUserCardProps {
  user: UserCandidate;
  sideDrawer?: "left" | "right"
}

function daysSince(date: string): number {
  if (!date) return 0;
  const today = new Date();
  const registeredDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  registeredDate.setHours(0, 0, 0, 0);

  const diffMs = today.getTime() - registeredDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export default function UserLinkerCard({
  user, sideDrawer
}: LinkerUserCardProps) {

  const UserName = (
    (user?.firstName ?? '') +
    ' ' +
    (user?.lastName ?? '')
  ).trim();

  const getAcademicLabel = (value?: string) => {
    if (!value) return '-';
    const found = listAcademicLevelOptions.find(opt => opt.value === value);
    return found ? found.label : value;
  };

  const isRejected = String(user.status ?? '').toUpperCase() === 'RECHAZADO';

  return (
    <div className="hover:border-uaq-brand-800 group flex flex-col rounded-lg border border-zinc-300 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      <Drawer direction={sideDrawer === "left" ? "left" : "right"}>
        <div className="flex w-full gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          
          <div className="flex-shrink-0">
            <Avatar className="h-18 w-18 object-contain">
              <AvatarFallback className="bg-uaq-terniary text-white text-2xl font-semibold">
                {UserName
                  ? UserName.split(' ').slice(0, 2).map((word: any) => word.charAt(0))
                  : 'NA'}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col flex-grow gap-2">
            <h3 className="text-lg font-[800]">
              {UserName}
            </h3>
            
            <div className="flex-1 space-y-1 text-start">
              <div className="text-start font-[400] text-gray-600">
                {user.jobExperience || '-'} 
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[260px] flex-shrink-0 justify-between items-end border-l border-gray-100 pl-4">
            
            <div className="flex flex-col justify-center gap-2 self-center rounded-r-lg p-4 transition-colors duration-300 ">
              
              <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                <Letter className="h-4 w-4" weight="Linear"/>
                <span className="truncate max-w-[180px]" title={user.email}>
                  {user.email || '-'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                <PhoneCalling className="h-4 w-4" weight="Linear" />
                <span className="truncate max-w-[180px]">
                   {user.cellPhone || '-'}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col self-center px-4 transition-colors duration-300 items-end">
                <DrawerTrigger className="text-start font-[400] text-brand group-hover:hover:text-uaq-brand active:text-uaq-terniary-hover cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-3 rounded-2xl flex items-center gap-2 text-l transition-colors duration-200 mx-3">
                    <AddCircle weight='Bold' className="h-4 w-4" />
                    Información
                </DrawerTrigger>
            </div>
          </div>
        </div>
            
        <DrawerContent className="flex flex-col bg-gray-50 h-full max-h-[100dvh]">
          <DrawerHeader className="px-6 sm:px-10 shrink-0 border-b bg-white">
            <div className="flex w-full items-center justify-between gap-4">
              <DrawerTitle className="text-xl sm:text-2xl font-[800] break-words min-w-0 flex-1">
                USUARIO:{' '}
                <span className="font-[800] tracking-wide">
                  {UserName.toUpperCase() || 'N/A'}
                </span>
              </DrawerTitle>
  
              <div className={`text-white text-xs sm:text-lg font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg shrink-0 ${
                isRejected ? 'bg-uaq-danger' : 'bg-success'
              }`}>
                {isRejected ? 'RECHAZADO' : (user.status || 'ACTIVO')}
              </div>
            </div>
          </DrawerHeader>
  
          <div className="flex-1 overflow-y-auto px-4 sm:px-10 pb-10 custom-scrollbar mt-5">
            
            {isRejected && (
              <div className="w-full max-w-4xl bg-red-50 mx-auto mb-5 shadow-sm border border-red-200 rounded-lg overflow-hidden">
                <div className="px-6 py-6 flex flex-col items-start gap-3">
                  <h3 className="text-base font-bold text-red-700 shrink-0">
                    Motivo de rechazo
                  </h3>
                  <div className="w-full min-w-0">
                    <p className="text-red-800 font-medium whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base">
                      {user.comment || 'El administrador no especificó un motivo en el sistema.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full max-w-4xl bg-white justify-center mx-auto mb-5 shadow-md border border-gray-200 rounded-lg">
              
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Fecha de nacimiento</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{user.birthDate ? dateToLocaleDateString(user.birthDate) : '-'}</span>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Correo electrónico */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Correo electrónico</h3>
                <div className="w-2/3">
                  <p className="leading-relaxed text-gray-700">
                    {user.email ?? '-'}
                  </p>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Dirección */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Dirección</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{user.address ?? '-'}</span>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Teléfono celular */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Teléfono celular</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{user.cellPhone ?? '-'}</span>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Grado de estudios */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Grado de estudios</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{getAcademicLabel(user.academicLevel)}</span>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Carrera (opcional) */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Carrera (opcional)</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{user.degree ?? '-'}</span>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Experiencia */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Experiencia</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{user.jobExperience ?? '-'}</span>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Posición deseada */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Posición deseada</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{user.desiredPosition ?? '-'}</span>
                </div>
              </div>
              <Separator className='w-11/12 justify-center mx-auto opacity-50' />
  
              {/* Fecha de registro */}
              <div className="px-10 py-6 flex justify-between">
                <h3 className="text-base font-medium w-1/3 text-gray-900">Fecha de registro</h3>
                <div className="w-2/3">
                  <span className="text-gray-700">{user.registeredAt ? dateToLocaleDateString(user.registeredAt) : '-'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <DrawerClose className="w-full max-w-xs text-base font-bold hover:bg-zinc-200 border border-zinc-300 text-uaq-danger px-8 py-4 rounded-xl transition-colors shadow-sm bg-white">
                Cerrar Detalle
              </DrawerClose>
            </div>

          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}