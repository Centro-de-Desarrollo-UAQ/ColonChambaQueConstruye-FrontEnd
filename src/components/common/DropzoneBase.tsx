'use client';

import { toast } from 'sonner';
import { useDropzone, FileError } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { DropzoneBaseProps } from '@/interfaces';

export default function DropzoneBase({
  accept,
  maxSizeMB = 2,
  multiple = false,
  disabled = false,
  alwaysActive = false,
  onFileAccepted,
  renderContent,
}: DropzoneBaseProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validator = useCallback(
    (file: File): FileError[] | null => {
      const errors: FileError[] = [];

      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push({
          code: 'file-too-large',
          message: `El archivo es demasiado grande (máx. ${maxSizeMB}MB)`,
        });
      }

      return errors.length > 0 ? errors : null;
    },
    [maxSizeMB],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsLoading(true);
        const file = acceptedFiles[0];
        const objectUrl = URL.createObjectURL(file);
        setFileUrl(objectUrl);
        onFileAccepted(file);
        setIsLoading(false);
      }
    },
    [onFileAccepted],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, fileRejections } =
    useDropzone({
      onDrop,
      validator,
      accept,
      multiple,
      disabled: disabled || isLoading || (!!fileUrl && !alwaysActive),
    });

  useEffect(() => {
    const shown = new Set();
    fileRejections.forEach((rejection) => {
      rejection.errors.forEach((error) => {
        if (!shown.has(error.code)) {
          shown.add(error.code);
          switch (error.code) {
            case 'file-invalid-type':
              toast.error('Tipo de archivo no permitido');
              break;
            case 'too-many-files':
              toast.error('Solo se permite un archivo');
              break;
            default:
              toast.error(error.message);
          }
        }
      });
    });
  }, [fileRejections]);

  const handleRemove = () => {
    setFileUrl(null);
  };

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
        {
          'border-zinc-300 bg-white': !isDragActive,
          'border-blue-500 bg-blue-50': isDragAccept,
          'border-red-500 bg-red-50': isDragReject,
          'cursor-pointer': !disabled && !isLoading && (!fileUrl || alwaysActive),
          'cursor-default bg-zinc-50': fileUrl || isLoading,
        },
      )}
    >
      <input {...getInputProps()} />
      {renderContent({ isLoading, fileUrl, handleRemove })}
    </div>
  );
}
