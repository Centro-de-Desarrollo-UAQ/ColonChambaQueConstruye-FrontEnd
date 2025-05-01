import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UploadMinimalistic } from "@solar-icons/react";

interface InfoCardProps {
  avatar: string;
  name: string;
  email: string;
  cellphone: string | null;
}

export const InfoCard = ({ avatar, name, email, cellphone }: InfoCardProps) => {
  return (
    <Card className="flex w-80 h-32 flex-row p-4">
      <Avatar className="w-24 h-24 transition-all duration-200">
        <AvatarImage src={avatar} />
        <AvatarFallback>CN</AvatarFallback>

        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div className="absolute inset-0 flex items-center justify-center opacity-50 bg-black transition-opacity duration-200">
        </div>
        <UploadMinimalistic
          size={52}
          weight="Bold"
          mirrored
          color="white"
          className="absolute opacity-100"
        />
        </div>
        
      </Avatar>

      <div className="flex flex-col justify-center">
        <p className="font-bold text-xl text-uaq-default-800">{name}</p>
        <p className="text-uaq-default-800 italic">{email}</p>
        {cellphone ?? (
          <p className="text-uaq-default-800 italic">{cellphone}</p>
        )}
      </div>
    </Card>
  );
};
