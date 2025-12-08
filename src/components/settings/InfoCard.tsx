// TODO add upload image functionality
import React from 'react';
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

       
      </Avatar>

      <div className="flex flex-col justify-center pl-6">
        <p className="text-xl font-bold text-zinc-800">{name}</p>
        <p className="text-zinc-800 italic">{email}</p>
        {cellphone ?? <p className="text-zinc-800 italic">{cellphone}</p>}
      </div>
    </div>
  );
};
