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
import { UserCandidate } from '@/interfaces/usercandidates';
import { dateToLocaleDateString } from '@/lib/utils';


interface LinkerUserCardProps {
  user: UserCandidate;
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

export default function UserLinkerCard({
  user, sideDrawer
}: LinkerUserCardProps) {

        // nombre completo seguro (first + last)
  const UserName = (
    (user?.firstName ?? '') +
    ' ' +
    (user?.lastName ?? '')
  ).trim();


  return (
    <div className="hover:border-uaq-brand-800 group flex flex-col rounded-lg border border-zinc-300 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      {/* Fila 1 - Logo de la empresa, nombre del trabajo, nobmre de la empresa, jornada y modalidad */}
      <Drawer direction={sideDrawer === "left" ? "left" : "right"}>
      <div className="flex w-full gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
  
  {/* --- COLUMNA 1: IMAGEN (Totalmente separada) --- */}
  <div className="flex-shrink-0">
    <Avatar className="h-18 w-18 object-contain">
      <AvatarFallback className="bg-uaq-terniary text-white text-2xl font-semibold">
        {UserName
          ? UserName.split(' ').slice(0, 2).map((word: any) => word.charAt(0))
          : 'NA'}
      </AvatarFallback>
    </Avatar>
  </div>

  {/* --- COLUMNA 2: CONTENIDO CENTRAL (Nombre + Descripción juntos) --- */}
  <div className="flex flex-col flex-grow gap-2">
    {/* Nombre de la empresa */}
    <h3 className="text-lg font-[800]">
      {UserName}
    </h3>
    
    {/* Descripción */}
    <div className="flex-1 space-y-1 text-start">
        <div className="text-start font-[400] text-gray-600">{user.experience /* Descripción del trabajo */}</div>
      </div>
  </div>

  {/* --- COLUMNA 3: LATERAL DERECHO (Contactos + Botón) --- */}
  <div className="flex flex-col w-[260px] flex-shrink-0 justify-between items-end border-l border-gray-100 pl-4">
    
    {/* Datos de contacto (Arriba) */}
    <div className="flex flex-col justify-center gap-2 self-center rounded-r-lg p-4 transition-colors duration-300 ">
      
      {/* Email */}
      <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
        <Letter className="h-4 w-4" weight="Linear"/>
        <span className="truncate max-w-[180px]" title={user.email}>
          {user.email}
        </span>
      </div>

      {/* Nombre Responsable */}
      <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
        <PhoneCalling className="h-4 w-4" weight="Linear" />
        <span className="truncate max-w-[180px]">
           {user.phone || '-'}
        </span>
      </div>
    </div>

    {/* Botón (Abajo) */}
    <div className="flex flex-1 flex-col self-center px-4 transition-colors duration-300 items-end">
        <DrawerTrigger className="text-start font-[400] text-brand group-hover:hover:text-uaq-brand active:text-uaq-terniary-hover cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-3 rounded-2xl flex items-center gap-2 text-l transition-colors duration-200 mx-3">
            <AddCircle weight='Bold' className="h-4 w-4" />
            Información
        </DrawerTrigger>
    </div>

  </div>

</div>

    
      
      {/* Drawer Content */}
       {/* Drawer Content */}
               <DrawerContent className="flex overflow-y-auto overflow-x-hidden bg-gray-50 pt-5">
                 <DrawerHeader className="px-10">
                   <div className="flex w-full items-center justify-between">
                     {/* TÍTULO */}
                     <DrawerTitle className="text-2xl font-[800]">
                       USUARIO:{' '}
                       <span className="font-[800] tracking-wide">
                         {UserName.toUpperCase() || 'N/A'}
                       </span>
                     </DrawerTitle>
       
                     {/* BOTONES */}
                     <div className={`text-white text-lg font-semibold px-4 py-2 rounded-lg ${
                    (String(user.status ?? '').toUpperCase() === 'RECHAZADO') ? 'bg-uaq-danger' : 'bg-success'
                  }`}>
                    {String(user.status ?? '').toUpperCase() === 'RECHAZADO' ? (
                      <div>
                        RECHAZADO
                      </div>
                    ) :  (
                      <div>
                        {user.status}
                      </div>
                    )}
                  </div>
            </div>
                   
                 </DrawerHeader>
       
                 <div className="w-10/12 bg-white justify-center mx-auto my-5 my-5shadow-md border border-gray-200 rounded-lg">
                   {/* RAZON SOCIAL */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Fecha de nacimiento</h3>
                     <div className="w-2/3">
                       <span>{dateToLocaleDateString(user.birthDate)}</span>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* RFC */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Correo electrónico</h3>
                     <div className="w-2/3">
                       <p className="leading-relaxed text-gray-800">
                         {user.email ?? '-'}
                       </p>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* Dirección */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Dirección</h3>
                     <div className="w-2/3">
                       <span>{user.address ?? '-'}</span>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* País de inversión */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Teléfono celular</h3>
                     <div className="w-2/3">
                       <span>{user.phone ?? '-'}</span>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* Giro de la empresa */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Grado de estudios</h3>
                     <div className="w-2/3">
                       <span>{user.educationLevel ?? '-'}</span>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* Total de empleados */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Carrera (opcional)</h3>
                     <div className="w-2/3">
                       <span>{user.career ?? '-'}</span>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* Correo electrónico */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Experiencia</h3>
                     <div className="w-2/3">
                       <span>{user.experience ?? '-'}</span>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* Descripción */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Posición deseada</h3>
                     <div className="w-2/3">
                       <span>{user.desiredPosition ?? '-'}</span>
                     </div>
                   </div>
                   <Separator className='w-11/12 justify-center mx-auto shadow-md rounded-lg' />
       
                   {/* Descripción */}
                   <div className="px-10 py-6 flex justify-between">
                     <h3 className="text-base font-medium w-1/3">Fecha de registro</h3>
                     <div className="w-2/3">
                       <span>{dateToLocaleDateString(user.registrationDate)}</span>
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
