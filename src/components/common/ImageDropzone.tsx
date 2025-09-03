'use client';

import DropzoneBase from './DropzoneBase';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { GalleryAdd } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ImageDropzoneProps } from '@/interfaces';

export default function ImageDropzone({ setSelectedImage }: ImageDropzoneProps) {
  return (
    <DropzoneBase
      accept={{
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
      }}
      maxSizeMB={2}
      onFileAccepted={(file) => {
        const url = URL.createObjectURL(file);
        setSelectedImage(url);
        toast.success('Imagen cargada correctamente');
      }}
      renderContent={({ isLoading, fileUrl, handleRemove }) => {
        if (isLoading) {
          return (
            <div className="mb-5 flex flex-col items-center">
              <div //loading spinner
                className="aspect-square w-[50px] animate-spin rounded-full"
                style={{
                  backgroundImage: 'radial-gradient(farthest-side, #4164A2 94%, transparent)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top',
                  backgroundSize: '8px 8px',
                  backgroundColor: '#0000',
                  WebkitMaskImage:
                    'radial-gradient(farthest-side, transparent calc(100% - 8px), black 0)',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  WebkitMaskSize: 'cover',
                  backgroundBlendMode: 'normal',
                  maskComposite: 'intersect',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box',
                  backgroundAttachment: 'scroll',
                  background: `
                        radial-gradient(farthest-side, #4164A2 94%, transparent) top/8px 8px no-repeat,
                        conic-gradient(transparent 30%, #4164A2)
                    `,
                }}
              />
              <p className="mt-2 text-sm text-zinc-500">Cargando...</p>
            </div>
          );
        }

        if (fileUrl) {
          return (
            <>
              <Avatar className="mb-4 size-55">
                <AvatarImage src={fileUrl} className="object-cover" />
                <AvatarFallback className="bg-zinc-100"></AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={handleRemove}>
                Borrar
              </Button>
            </>
          );
        }

        return (
          <>
            <GalleryAdd className="mb-4 h-24 w-24 text-zinc-400" />
            <p className="mb-4 text-sm text-zinc-500">Arrastra y suelta tu imagen aquí o</p>
            <Button variant="ghost">Selecciona un archivo</Button>
          </>
        );
      }}
    />
  );
}
