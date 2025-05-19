'use client';
import { useState, useRef } from 'react';
import { UploadMinimalistic } from '@solar-icons/react';
import TabOptions from '@/components/tabOptions';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { InfoCard } from './settings/InfoCard';

export default function UserTabs() {
  const [avatarSrc, setAvatarSrc] = useState('https://github.com/shadcn.png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto max-w-md bg-white">
      <InfoCard
        avatar="https://github.com/shadcn.png"
        name="Jane Daw"
        email="Hosea28@yahoo.com"
        cellphone="+52 441 441 22 22"
      />

      <div className="w-full px-4 pb-8">
        <TabOptions />
      </div>
    </div>
  );
}
