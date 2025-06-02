'use client';

import { Separator } from '@/components/ui/separator';
import { UploadFile } from '../common/UploadFile';
import { UploadedFile } from '../common/UploadedFile';
import { useCallback, useState } from 'react';

const COMMON_TEXTS = {
  dropText: 'Arrastra y suelta tu archivo aquí ó',
  buttonText: 'Selecciona un archivo',
};

export default function ProfilePhotoStep() {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const onDropPhoto = useCallback((acceptedFiles: File[]) => {
    setProfilePhoto(acceptedFiles[0]);
  }, []);

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Foto de perfil</h3>
        <div className="flex items-center">
          <span className="text-uaq-default-400 text-sm">
            <span className="text-300 text-uaq-danger mr-1">*</span>Campos obligatorios
          </span>
        </div>
      </div>

      <p className="mb-4">
        Añade una foto a tu perfil. Si no cuentas con una ahora, podrás hacerlo más adelante
      </p>
      <Separator className="my-4" />

      <div className="mt-6">
        {profilePhoto ? (
          <UploadedFile
            file={profilePhoto}
            defaultFileName="foto_perfil.jpg"
            action="upload"
            onView={() => window.open(URL.createObjectURL(profilePhoto), '_blank')}
            onRemove={handleRemovePhoto}
          />
        ) : (
          <UploadFile
            language="spanish"
            onDrop={onDropPhoto}
            dropText={COMMON_TEXTS.dropText}
            buttonText={COMMON_TEXTS.buttonText}
          />
        )}
      </div>
    </div>
  );
}