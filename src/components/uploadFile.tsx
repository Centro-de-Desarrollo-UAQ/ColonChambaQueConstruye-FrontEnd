'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useDropzone, FileError } from 'react-dropzone';
import { useCallback } from 'react';

interface UploadFileProps {
  language: 'spanish' | 'english';
  onDrop: (acceptedFiles: File[]) => void;
  dropText: string;
  buttonText: string;
}

export function UploadFile({ language, onDrop, dropText, buttonText }: UploadFileProps) {
  const validator = useCallback((file: File): FileError | FileError[] | null => {
    const errors: FileError[] = [];

    // Validación síncrona de tamaño
    if (file.size > 2 * 1024 * 1024) {
      errors.push({
        code: 'file-too-large',
        message: 'El archivo es demasiado grande (máx. 2MB)',
      });
    }

    // Solo validamos dimensiones para imágenes
    if (file.type.startsWith('image/')) {
      // Prevalidación rápida antes de cargar la imagen
      if (file.size > 2 * 1024 * 1024) {
        return errors;
      }

      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      // Esta validación será asíncrona pero no podemos devolver una Promise
      // Así que hacemos una aproximación conservadora
      // En la práctica, dejamos que el backend haga la validación final
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
        // Aceptamos provisionalmente, el backend hará validación final
        return null;
      } else {
        errors.push({
          code: 'file-invalid-type',
          message: 'Formato de imagen no soportado',
        });
      }

      URL.revokeObjectURL(objectUrl);
    }

    return errors.length > 0 ? errors : null;
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024, // 2MB máximo
    validator,
  });

  return (
    <div
      {...getRootProps()}
      className="mb-6 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8"
    >
      <input {...getInputProps()} />
      <Image
        src="/UploadIcon.svg"
        alt="UploadIcon"
        width={96}
        height={96}
        className="text-muted-foreground"
        unoptimized
      />
      <p className="text-muted-foreground text-center">{dropText}</p>
      <Button variant="primary" color="accent" className="">
        {buttonText}
      </Button>
    </div>
  );
}
