import Image from "next/image";
import { FolderOpen, Letter } from "@solar-icons/react";

interface CompanyCardProps {
  title: string;
  description: string;
  email: string;
  activeVacancies: number;
  logoUrl: string;
}

export default function CompanyCard({
  title,
  description,
  email,
  activeVacancies,
  logoUrl,
}: CompanyCardProps) {
  return (
    <div className="w-[800px] border border-uaq-default-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-uaq-brand-800 hover:translate-y-[-2px] group cursor-pointer">
      <div className="flex flex-row items-center">
        <div className="flex-shrink-0 p-4 w-[100px] rounded-l-lg transition-colors duration-300">
          <Image
            src={logoUrl}
            alt={`${title} Logo`}
            width={60}
            height={60}
            className="w-15 h-15 object-contain mx-auto" 
          />
        </div>

        {/* Segunda columna - Contenido principal */}
        <div className="flex-1 flex flex-col py-4 self-center px-4 transition-colors duration-300"> 
          <div className="flex-1 space-y-1 text-start">
            <div className="font-[800] text-lg">
              {title}
            </div>
            <div className="font-[400] text-start text-gray-600">
              {description}
            </div>
          </div>
        </div>

        {/* Tercera columna - Información */}
        <div className="flex flex-col justify-center gap-2 p-4 self-center w-[250px] rounded-r-lg transition-colors duration-300"> 
          <div className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
            <Letter className="h-4 w-4" weight="Linear" />
            <span className="whitespace-nowrap">{email}</span> 
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
            <FolderOpen className="h-4 w-4" weight="Linear"/>
            <span>{activeVacancies} vacantes activas</span>
          </div>
        </div>
      </div>
    </div>
  );
}