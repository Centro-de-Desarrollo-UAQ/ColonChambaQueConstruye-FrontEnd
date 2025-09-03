//TODO: Add a click handler to open the drawer with the company details
import Image from 'next/image';
import { FolderOpen, Letter } from '@solar-icons/react';

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
    <div className="hover:border-uaq-brand-800 group w-[800px] cursor-pointer rounded-lg border border-zinc-300 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md">
      <div className="flex flex-row items-center">
        <div className="w-[100px] flex-shrink-0 rounded-l-lg p-4 transition-colors duration-300">
          <Image
            src={logoUrl}
            alt={`${title} Logo`}
            width={60}
            height={60}
            className="mx-auto h-15 w-15 object-contain"
          />
        </div>

        <div className="flex flex-1 flex-col self-center px-4 py-4 transition-colors duration-300">
          <div className="flex-1 space-y-1 text-start">
            <div className="text-lg font-[800]">{title}</div>
            <div className="text-start font-[400] text-gray-600">{description}</div>
          </div>
        </div>

        <div className="flex w-[250px] flex-col justify-center gap-2 self-center rounded-r-lg p-4 transition-colors duration-300">
          <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
            <Letter className="h-4 w-4" weight="Linear" />
            <span className="whitespace-nowrap">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900">
            <FolderOpen className="h-4 w-4" weight="Linear" />
            <span>{activeVacancies} vacantes activas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
