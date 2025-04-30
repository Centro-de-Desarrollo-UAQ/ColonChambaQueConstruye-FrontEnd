'use client'
import { useState, useRef } from 'react';
import { UploadMinimalistic } from '@solar-icons/react';
import TabOptions from "@/components/tabOptions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function UserTabs() {
  const [avatarSrc, setAvatarSrc] = useState("https://github.com/shadcn.png");
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
    <div className="max-w-md mx-auto bg-white">
      <div className="flex flex-col items-center justify-center py-6 px-4 mb-3"> {/* Añadido px-4 para padding lateral */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full px-10 max-w-xs sm:max-w-none"> {/* Limitamos el ancho máximo en móviles */}
          {/* Avatar (se mantiene igual) */}
          <div className="relative group">
            <Avatar 
              className="h-32 w-32 group-hover:opacity-80 transition-opacity cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <AvatarImage src={avatarSrc} alt="User avatar" />
              <AvatarFallback>BB</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity bg-black bg-opacity-40 rounded-full pointer-events-none">
              <UploadMinimalistic className='text-white' size={40} weight='Bold'/>
            </div>
          </div>
          
          {/* Contenedor de información del usuario con mejor manejo de texto */}
          <div className="w-full min-w-0"> {/* min-w-0 es clave para el text-overflow */}
            <h1 className="text-[700] font-semibold truncate">Bryan Bonilla</h1>
            <div className="space-y-2 mt-2">
              <p className="truncate">bryanbona0406@gmail.com</p>
              <p className="truncate">+52 442 346 4978</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pb-8 w-full px-4"> {/* Añadido px-4 para consistencia */}
        <TabOptions/>
      </div>
    </div>
  )
}