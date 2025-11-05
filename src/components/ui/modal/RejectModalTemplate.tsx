'use client';

import { useEffect, useCallback } from 'react';
import { Card, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import FormInput from '@/components/forms/FormInput';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ModalTexts {
  title: string;
  subtitle: string;  // (lo conservamos por compatibilidad si lo usas en otro lado)
  content: string;   // texto descriptivo arriba del textarea
  cancel: string;
  confirm: string;
}

const schema = z.object({
  reason: z.string().min(1, 'Este campo es requerido'),
});

type SchemaFormType = z.infer<typeof schema>;

interface VacancyInfo {
  companyName?: string;
  roleTitle?: string;    
}

interface BaseModalTemplateProps {
  open?: boolean;
  onClose: () => void;
  onConfirm: (data: SchemaFormType) => void;
  texts: ModalTexts;
  className?: string;
  description: string;
  vacancy?: VacancyInfo;     
}

export default function RejectModalTemplate({
  onClose,
  onConfirm,
  texts,
  className = '',
  description,
  vacancy,
}: BaseModalTemplateProps) {

  const methods = useForm<SchemaFormType>({
    resolver: zodResolver(schema),
    defaultValues: { reason: '' },
    mode: 'onSubmit',
  });

  const { control, handleSubmit } = methods;

  const handleConfirm = useCallback((data: SchemaFormType) => {
    console.log(`${texts.title}`);
    onConfirm(data);
    console.log(data);
  }, [onConfirm, texts.title]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const code = (e as any).keyCode;

      // Escape → cerrar modal
      if (e.key === 'Escape' || e.key === 'Esc' || code === 27) {
        e.preventDefault();
        onClose();
        return;
      }

      // Enter → confirmar acción (respetando validación)
      if (e.key === 'Enter' || code === 13) {
        e.preventDefault();
        handleSubmit(handleConfirm)();
      }
    };

    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose, handleSubmit, handleConfirm]);

  return (
    <div
      className={`relative mx-auto w-full max-w-2xl shadow-md ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleConfirm)} className="mt-4 flex flex-col gap-6">
          <Tabs value="open">
            <TabsContent value="open">
              <Card className="flex flex-col bg-zinc-50 p-8 h-fit min-w-[636px]">
                <CardTitle>{texts.title}</CardTitle>

                {/* Bloque de Empresa/Puesto (opcional) */}
                {vacancy && (vacancy.companyName || vacancy.roleTitle) && (
                  <div className="mt-4 mb-2 space-y-2 text-[15px]">
                    {vacancy.companyName && (
                      <div>
                        <span className="font-semibold">Empresa:</span>{' '}
                        <span>{vacancy.companyName}</span>
                      </div>
                    )}
                    {vacancy.roleTitle && (
                      <div>
                        <span className="font-semibold">Puesto:</span>{' '}
                        <span>{vacancy.roleTitle}</span>
                      </div>
                    )}
                  </div>
                )}

                <CardContent className='p-0'>
                  <FormInput
                    control={control}
                    label="Describa observaciones"
                    type="textarea"     
                    name="reason"
                    description={description}
                  />
                </CardContent>

                <CardFooter className="flex justify-end gap-10 !p-0">
                  <Button type="button" variant="ghost" className="text-uaq-danger" onClick={onClose}>
                    {texts.cancel}
                  </Button>
                  <Button type="submit" variant="primary" color="danger">
                    {texts.confirm}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  );
}
