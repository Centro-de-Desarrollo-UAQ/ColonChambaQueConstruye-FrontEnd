// TODO add upload image functionality
import React from 'react';
import CompanyAvatar from '../common/AvatarTrasnform';


interface InfoCardProps {
  name: string;
  email: string;
  cellphone: string | null;

}

export const InfoCard = ({ name, email, cellphone }: InfoCardProps) => {
  return (
    <div className="ml-12 flex h-32 w-25 flex-row p-4">
      <CompanyAvatar
        companyName={name}
        size="lg"
        
      />

      <div className="flex flex-col justify-center pl-6">
        <p className="text-xl font-bold text-zinc-800">{name}</p>
        <p className="text-zinc-800 italic">{email}</p>
        {cellphone ?? <p className="text-zinc-800 italic">{cellphone}</p>}
      </div>
    </div>
  );
};
