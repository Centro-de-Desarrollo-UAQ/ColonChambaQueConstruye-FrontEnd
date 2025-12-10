'use client';

import { Letter, Phone } from '@solar-icons/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CompanyUser } from '@/interfaces/user';
import { Avatar, AvatarFallback } from '../ui/avatar';

export interface ApplicantCardProps {
  user: CompanyUser;
}

export default function ApplicantCard({ user }: ApplicantCardProps) {

  return (
    <Card className="rounded-lg border border-zinc-300 my-4 p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-5">
        <div>
            <div className="flex flex-row items-center gap-5 justify-between">
            <div className="flex-shrink-0">
              <Avatar className="h-16 w-16 object-contain">
                <AvatarFallback className="bg-uaq-terniary text-white text-2xl font-semibold">
                  {user.firstName && user.lastName
                    ? user.firstName.charAt(0) + user.lastName.charAt(0)
                    : 'NA'}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-xl font-normal text-zinc-800">
                {user.firstName} {user.lastName}
                </h3>
            </div>
            <div className='max-w-[250px]'>
                <div className="flex items-center gap-2">
                    <Letter />
                    <p className="text-sm text-zinc-800">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone />
                  <p className="text-sm text-zinc-800">{user.cellPhone}</p>                
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center py-3'>
            <p className="text-base text-zinc-800 flex-1 mr-5">{user.jobExperience}</p>
            <div className="flex flex-col gap-2">
              {/** Esto es una prueba idealmente el hredf debe de ser el link de el cv del usuario */}
              <a target="_blank" href={user?.curriculumURL  } rel="noopener noreferrer">
              <Button variant='primary' color='brand'>
                Ver CV
              </Button>
              </a>
            
          </div>
        </div>
        {/* Columna derecha: contacto + botón */}
        </div>
      </CardContent>
    </Card>
  );
}
