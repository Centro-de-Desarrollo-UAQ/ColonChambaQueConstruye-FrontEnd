'use client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CloseSquare, Pen2, Upload, Refresh } from '@solar-icons/react';
import { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ResumeElement } from './ResumeElement';

interface UploadedFileProps {
  file: File | string;
  defaultFileName: string;
  action?: 'upload' | 'edit' | 'none';
  showPreview?: boolean;
  onView?: () => void;
  onRemove?: () => void;
}

export function UploadedFile({
  file,
  defaultFileName,
  action = 'none',
  showPreview = true,
  onView,
  onRemove,
}: UploadedFileProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Generar URL de previsualización solo si showPreview es true
  useEffect(() => {
    if (!showPreview) return;

    if (typeof file !== 'string' && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof file === 'string') {
      setPreviewUrl(file);
    }
  }, [file, showPreview]);

  const getFileType = () => {
    if (typeof file === 'string') {
      const ext = file.split('.').pop()?.toLowerCase() || '';
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
      return imageExtensions.includes(ext) ? 'image' : 'pdf';
    } else {
      if (file.type.startsWith('image/')) return 'image';
      if (file.type === 'application/pdf') return 'pdf';
      return 'other';
    }
  };

  const fileType = getFileType();
  const displayName = typeof file === 'string' ? defaultFileName : file.name || defaultFileName;
  const isImage = fileType === 'image' && showPreview;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className={`group flex w-full items-center ${isImage ? 'flex-col' : ''}`}>
        {isImage ? (
          <>
            <div
              className="relative flex w-full cursor-pointer flex-col items-center gap-4"
              onClick={onView}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onView?.()}
            >
              <Avatar className="h-60 w-60">
                {previewUrl ? (
                  <AvatarImage src={previewUrl} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-zinc-100">
                    <ImageIcon className="h-12 w-12 text-zinc-400" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="flex w-full justify-center gap-2 py-6">
              <Button variant="secondary" color="gray" size="sm" onClick={onRemove}>
                <CloseSquare className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </>
        ) : (
          <ResumeElement
            displayName={displayName}
            file={file}
            action={action}
            onRemove={onRemove}
          />
        )}
      </div>
    </div>
  );
}
