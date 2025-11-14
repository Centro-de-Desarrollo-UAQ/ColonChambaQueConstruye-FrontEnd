'use client';

import { Letter, Phone } from '@solar-icons/react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/interfaces/user';

export interface ApplicantCardProps {
  user: User;
}

export default function ApplicantCard({ user }: ApplicantCardProps) {
  return (
    <Card className="rounded-lg border border-zinc-300 my-4 p-6 items-center">
        <CardContent className="p-5">
        <div>
            <div className="flex flex-row items-center gap-5 justify-between">
            <Image
                src={user.photoURL || '/default-user.png'}
                alt="Applicant Image"
                width={60}
                height={60}
                className="rounded-full shrink-0 "
            />

            {/* Columna central: nombre/puesto/resumen */}
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
                    <p className="text-sm text-zinc-800">{user.phoneNumber}</p>
                </div>
            </div>
        </div>
        <div className='flex justify-between items-center py-3'>
            <p className="text-base text-zinc-800 flex-1 mr-5">{user.careerSummary}</p>
            <div className="flex flex-col gap-2">
              {/** Esto es una prueba idealmente el hredf debe de ser el link de el cv del usuario */}
              <a target="_blank" href='https://google.com/' rel="noopener noreferrer">
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
