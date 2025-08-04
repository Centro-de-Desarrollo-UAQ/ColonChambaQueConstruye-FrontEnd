//TODO: Changing styles to appeal to figma design
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CloseSquare, Pen2, Upload } from '@solar-icons/react';

interface ResumeElementProps {
  displayName: string;
  file?: File | string;
  action?: 'upload' | 'edit' | 'none';
  onView?: () => void;
  onRemove?: () => void;
}

export function ResumeElement({
  displayName,
  file,
  action = 'none',
  onView,
  onRemove,
}: ResumeElementProps) {
  return (
    <div className="group flex w-full min-w-0 rounded-xl border transition-shadow hover:shadow-md">
      {/* Sección izquierda - Información del archivo */}
      <div
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 p-3 transition-colors group-hover:bg-zinc-100"
        onClick={onView}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onView?.()}
      >
        <div className="shrink-0">
          <Image
            src="/FileIcon.svg"
            alt="FileIcon"
            width={40}
            height={40}
            className="transition-opacity group-hover:opacity-90"
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-medium">{displayName}</span>
          <div className="text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {/* Tamaño del archivo */}
            {typeof file !== 'string' && file?.size && (
              <span className="shrink-0">{`${(file.size / 1024).toFixed(1)} KB`}</span>
            )}
            {/* Fecha y hora de subida */}
            {file && (
              <span className="shrink-0">
                {new Date().toLocaleDateString('es-MX', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
                <span className="mx-1"></span>
                {new Date().toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {action !== 'none' && (
        <div className="flex shrink-0 items-center gap-1 px-2">
          {action === 'upload' && (
            <Button variant="mono" size="icon" onClick={onView} className="h-9 w-9" color="accent">
              <Upload className="h-4 w-4" weight="Bold" />
            </Button>
          )}
          {action === 'edit' && (
            <Button variant="mono" size="icon" onClick={onView} className="h-9 w-9" color="accent">
              <Pen2 className="h-4 w-4" weight="Bold" />
            </Button>
          )}
          <Button variant="mono" size="icon" onClick={onRemove} className="h-9 w-9" color="danger">
            <CloseSquare className="h-4 w-4" weight="Bold" />
          </Button>
        </div>
      )}
    </div>
  );
}