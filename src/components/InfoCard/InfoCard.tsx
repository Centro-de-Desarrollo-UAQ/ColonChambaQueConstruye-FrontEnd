import React from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UploadMinimalistic } from '@solar-icons/react';

interface InfoCardProps {
  avatar: string;
  name: string;
  email: string;
  cellphone: string | null;
}

export const InfoCard = ({ avatar, name, email, cellphone }: InfoCardProps) => {
  return (
    <div className="ml-12 flex h-32 w-full flex-row p-4">
      <Avatar className="h-24 w-24 transition-all duration-200">
        <AvatarImage src={avatar} />
        <AvatarFallback>CN</AvatarFallback>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center bg-black opacity-50 transition-opacity duration-200"></div>
          <UploadMinimalistic
            size={52}
            weight="Bold"
            mirrored
            color="white"
            className="absolute opacity-100"
          />
        </div>
      </Avatar>

      <div className="flex flex-col justify-center pl-6">
        <p className="text-uaq-default-800 text-xl font-bold">{name}</p>
        <p className="text-uaq-default-800 italic">{email}</p>
        {cellphone ?? <p className="text-uaq-default-800 italic">{cellphone}</p>}
      </div>
    </div>
  );
};
