'use client';

import DropzoneBase from './DropzoneBase';
import { ResumeElement } from './ResumeElement';
import { toast } from 'sonner';
import { useState } from 'react';
import { FileSend } from '@solar-icons/react';
import { Button } from '../ui/button';
import { PDFDropzoneProps } from '@/interfaces';

export default function PDFDropzone({ setSelectedFile }: PDFDropzoneProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileAccept = (file: File) => {
    setPdfFile(file);
    setSelectedFile(file);
    toast.success('PDF cargado correctamente');
  };

  const handleRemove = () => {
    setPdfFile(null);
    setSelectedFile(null);
    toast.success('PDF eliminado');
  };

  return (
    <div className="flex flex-col gap-4">
      {pdfFile && (
        <ResumeElement
          displayName={pdfFile.name}
          file={pdfFile}
          action="edit"
          onView={() => {
            const url = URL.createObjectURL(pdfFile);
            window.open(url, '_blank');
          }}
          onRemove={handleRemove}
        />
      )}

      <DropzoneBase
        accept={{
          'application/pdf': ['.pdf'],
        }}
        maxSizeMB={5}
        onFileAccepted={handleFileAccept}
        alwaysActive
        renderContent={({ isLoading }) => {
          if (isLoading) {
            return <p className="text-zinc-500">Cargando...</p>;
          }

          return (
            <>
              <FileSend className="mb-4 h-24 w-24 text-zinc-400" />
              <p className="mb-4 text-sm text-zinc-500">Arrastra y suelta tu imagen aquí o</p>
              <Button variant="ghost">Selecciona un archivo</Button>
            </>
          );
        }}
      />
    </div>
  );
}
