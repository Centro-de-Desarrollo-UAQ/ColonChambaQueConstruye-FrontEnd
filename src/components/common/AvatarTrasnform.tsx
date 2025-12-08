
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Asegúrate que la ruta sea correcta

interface CompanyAvatarProps {
  companyName: string;
  logoUrl?: string; 
  size?: 'sm' | 'md' | 'lg'; 
}


function getInitials(name: string): string {
  if (!name) return '??';
  
  const cleanName = name
    .replace(/[^a-zA-Z\s]/g, '') // Elimina caracteres no alfabéticos ni espacios
    .replace(/\b(?:SA|DE|CV|DEL|LA|EL)\b/gi, '') // Elimina palabras comunes
    .trim();
  
  const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
  
  let initials = '';

  if (parts.length === 1) {
    initials = cleanName.substring(0, 2).toUpperCase();
  } else if (parts.length >= 2) {
    initials = (parts[0][0] + parts[1][0]).toUpperCase();
  } else {
    return '??';
  }
  
  return initials;
}


const CompanyAvatar: React.FC<CompanyAvatarProps> = ({ companyName, logoUrl, size = 'md' }) => {
  const companyInitials = getInitials(companyName);
  
  const sizeClasses = {
    sm: 'h-10 w-10 text-base',
    md: 'h-[60px] w-[60px] text-xl',
    lg: 'h-20 w-20 text-2xl',
  };

  return (
    <Avatar className={`mx-auto object-contain ${sizeClasses[size]}`}>
      <AvatarImage 
        src={logoUrl} 
        alt={`${companyName} Logo`}
      />
      <AvatarFallback className={`font-bold bg-uaq-terniary text-white ${sizeClasses[size]}`}>
        {companyInitials}
      </AvatarFallback>
    </Avatar>
  );
};

export default CompanyAvatar;