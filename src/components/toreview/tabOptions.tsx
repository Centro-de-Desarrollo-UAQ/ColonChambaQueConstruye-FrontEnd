//TODO: Make this component reusable. Remove the hardcoded values and use props to pass the values.
//? Whats the point of using tabs if we are changing the URL?
'use client';
import { VerticalTabs, VerticalTabsList, VerticalTabsTrigger } from '../ui/tabs';
import { Documents, Diploma, UserCircle, ShieldKeyholeMinimalistic } from '@solar-icons/react';
import { usePathname, useRouter } from 'next/navigation';

export default function TabOptions() {
  const pathname = usePathname();
  const router = useRouter();

  // Mapeo de valores a rutas
  const valueToRoute = {
    profile: '/profile',
    professional: '/professionalProfile',
    curriculum: '/curriculum',
    control: '/control',
  };

  // Determinar el valor activo basado en la URL
  const activeValue =
    Object.entries(valueToRoute).find(([_, route]) => pathname.startsWith(route))?.[0] || 'profile';

  // Manejador de clic para redirección
  const handleTabClick = (value: string) => {
    router.push(valueToRoute[value as keyof typeof valueToRoute]);
  };

  return (
    <VerticalTabs defaultValue={activeValue} value={activeValue}>
      <VerticalTabsList>
        <VerticalTabsTrigger value="profile" onClick={() => handleTabClick('profile')}>
          <div className="flex items-center gap-3">
            <UserCircle size={24} weight="Bold" />
            <span>Información de contacto</span>
          </div>
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="professional" onClick={() => handleTabClick('professional')}>
          <div className="flex items-center gap-3">
            <Diploma size={24} weight="Bold" />
            <span>Perfil profesional</span>
          </div>
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="curriculum" onClick={() => handleTabClick('curriculum')}>
          <div className="flex items-center gap-3">
            <Documents size={24} weight="Bold" />
            <span>Curriculum</span>
          </div>
        </VerticalTabsTrigger>
        <VerticalTabsTrigger value="control" onClick={() => handleTabClick('control')}>
          <div className="flex items-center gap-3">
            <ShieldKeyholeMinimalistic size={24} weight="Bold" />
            <span>Acceso de seguridad</span>
          </div>
        </VerticalTabsTrigger>
      </VerticalTabsList>
    </VerticalTabs>
  );
}
