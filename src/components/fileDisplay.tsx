'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CloseSquare, Pen2, Upload } from "@solar-icons/react"

interface FileDisplayProps {
  displayName: string;
  file?: File | string;
  action?: 'upload' | 'edit' | 'none';
  onView?: () => void;
  onRemove?: () => void;
}

export function FileDisplay({ 
  displayName, 
  file, 
  action = 'none', 
  onView, 
  onRemove 
}: FileDisplayProps) {
  return (
    <div className="flex w-full min-w-0 border rounded-xl hover:shadow-md transition-shadow">
      {/* Sección izquierda - Información del archivo */}
      <div 
        className="flex-1 flex items-center gap-3 p-3 group-hover:bg-uaq-default-100/90 transition-colors cursor-pointer min-w-0"
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
            className="group-hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-medium truncate">{displayName}</span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
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
                  year: 'numeric'
                })}
                <span className="mx-1"></span>
                {new Date().toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {action !== 'none' && (
        <div className="flex items-center gap-1 px-2 shrink-0">
          {action === 'upload' && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onView}
              className="h-9 w-9"
            >
              <Upload className="h-4 w-4" weight="Bold" />
            </Button>
          )}
          {action === 'edit' && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onView}
              className="h-9 w-9"
            >
              <Pen2 className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
            className="h-9 w-9"
          >
            <CloseSquare className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}