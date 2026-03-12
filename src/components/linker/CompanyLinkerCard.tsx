import { AddCircle, Letter, User } from '@solar-icons/react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { CompanyData } from '@/interfaces';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface LinkerCompanyCardProps {
  company: CompanyData
  sideDrawer?: "left" | "right"
}

export default function CompanyLinkerCard({
  company, sideDrawer
}: LinkerCompanyCardProps) {

  const recruiterName = (
    (company?.CompanyAccount?.firstName ?? '') +
    ' ' +
    (company?.CompanyAccount?.lastName ?? '')
  ).trim();

  const isRejected = String(company.Company.status ?? '').toUpperCase() === 'RECHAZADA';

  return (
    <div className="hover:border-uaq-brand-800 group flex flex-col rounded-lg border border-zinc-300 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      <Drawer direction={sideDrawer === "left" ? "left" : "right"}>
        {/* VISTA PREVIA DE LA TARJETA (MINIMIZADA) */}
        <div className="flex w-full gap-5 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
          
          <div className="flex-shrink-0">
            <Avatar className="h-18 w-18 object-contain">
              <AvatarFallback className="bg-uaq-terniary text-white text-2xl font-semibold">
                {company.Company.tradeName
                  ? company.Company.tradeName.split(' ').slice(0, 2).map((word) => word.charAt(0))
                  : 'NA'}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col flex-grow gap-2">
            <h3 className="text-lg font-[800]">
              {company.Company.tradeName}
            </h3>
            
            <div className="flex-1 space-y-1 text-start">
              <div className="text-start font-[400] text-gray-600 line-clamp-2">
                {company.Company.description}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[260px] flex-shrink-0 justify-between items-end border-l border-gray-100 pl-4">
            <div className="flex flex-col justify-center gap-2 self-center rounded-r-lg p-4 transition-colors duration-300 ">
              <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                <Letter className="h-4 w-4" weight="Linear"/>
                <span className="truncate max-w-[180px]" title={company.Company.companyEmail}>
                  {company.Company.companyEmail}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
                <User className="h-4 w-4" weight="Linear" />
                <span className="truncate max-w-[180px]">
                   {recruiterName || '-'}
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
                EMPRESA:{' '}
                <span className="font-[800] tracking-wide">
                  {company.Company.tradeName?.toUpperCase() || 'N/A'}
                </span>
              </DrawerTitle>

              <div className={`text-white text-xs sm:text-lg font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg shrink-0 ${
                isRejected ? 'bg-uaq-danger' : 'bg-success'
              }`}>
                {isRejected ? 'RECHAZADA' : (company.Company.status || 'ACTIVA')}
              </div>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 sm:px-10 pb-10 custom-scrollbar">
            
            {isRejected && (
              <div className="w-full max-w-4xl bg-red-50 mx-auto mt-6 mb-4 shadow-sm border border-red-200 rounded-lg overflow-hidden">
                <div className="px-6 py-6 flex flex-col items-start gap-3">
                  <h3 className="text-base font-bold text-red-700 shrink-0">
                    Motivo de rechazo
                  </h3>
                  <div className="w-full min-w-0">
                    <p className="text-red-800 font-medium whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base">
                      {company.Company.comment || 'El administrador no especificó un motivo en el sistema.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full max-w-4xl bg-white justify-center mx-auto mb-5 mt-3 shadow-md border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 sm:px-10 py-4 bg-zinc-50 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Detalles Corporativos</h2>
              </div>

              <DetailItem label="Razón Social" value={company.Company.legalName} />
              <DetailItem label="RFC" value={company.Company.rfc} />
              <DetailItem 
                label="Dirección" 
                value={`${company.Company.street} ${company.Company.streetNumber}, ${company.Company.district}, ${company.Company.municipality}, ${company.Company.state}, ${company.Company.zipCode}`} 
              />
              <DetailItem label="País de inversión" value={company.Company.investmentCountry} />
              <DetailItem label="Giro de la empresa" value={company.Company.workSector?.replace(/_/g, ' ')} capitalize />
              <DetailItem label="Total de empleados" value={company.Company.totalWorkers?.toString()} />
              <DetailItem label="Correo institucional" value={company.Company.companyEmail} />
              <DetailItem label="Descripción corporativa" value={company.Company.description} fullWidth />
            </div>

            <div className="w-full max-w-4xl bg-white justify-center mx-auto mb-5 shadow-md border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 sm:px-10 py-4 bg-zinc-50 border-b border-gray-200">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Datos del Reclutador</h2>
              </div>

              <DetailItem label="Nombre completo" value={recruiterName} />
              <DetailItem label="Cargo / Puesto" value={company.CompanyAccount?.jobTitle} />
              <DetailItem label="Teléfono fijo" value={company.CompanyAccount?.landlinePhone} />
              <DetailItem label="Teléfono celular" value={company.CompanyAccount?.cellPhone} />
              <DetailItem label="Correo de acceso" value={company.CompanyAccount?.email} />
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

function DetailItem({ 
  label, 
  value, 
  fullWidth = false, 
  capitalize = false 
}: { 
  label: string, 
  value?: string, 
  fullWidth?: boolean, 
  capitalize?: boolean 
}) {
  return (
    <>
      <div className={`px-6 sm:px-10 py-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 ${fullWidth ? 'items-start' : 'sm:items-start'}`}>
        <h3 className="text-base font-medium w-full sm:w-1/3 shrink-0 text-gray-900">{label}</h3>
        <div className="w-full sm:w-2/3 min-w-0 break-words text-gray-700">
          <p className={`${capitalize ? "capitalize" : ""} whitespace-pre-wrap leading-relaxed`}>
            {value ?? '-'}
          </p>
        </div>
      </div>
      <Separator className='w-11/12 justify-center mx-auto opacity-50' />
    </>
  );
}