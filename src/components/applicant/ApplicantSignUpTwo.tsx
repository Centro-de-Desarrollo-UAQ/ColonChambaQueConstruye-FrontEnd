'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import ProfessionalInfoStep from './ProfessionalInfoStep';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicantProfInfoFormType, applicantSchemaProfessionalInfo } from '@/validations/applicantSchemaProfessionalInfo';

export default function ApplicantSignUpTwo() {

  const methods = useForm<ApplicantProfInfoFormType>({
    resolver: zodResolver(applicantSchemaProfessionalInfo),
    defaultValues: {
      schooling: '',
      career: '',
      professionalSummary: '',
      position: '',
      cvFile: undefined,
    },
    mode: 'onSubmit',
  });

  const { control, handleSubmit, trigger, watch } = methods;

  const onSubmit = (data: ApplicantProfInfoFormType) => {
    console.log('Form submitted:', data);
  };



  return (
    <div className="container mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-12 shadow-sm">
      <div className="mb-4 space-y-8 text-center">
        <h1 className="text-3xl font-bold text-[800] text-[var(--uaq-selected-hover)]">Completa tu registro</h1>
        <p className="mx-auto max-w-2xl justify-items-start self-start text-left mb-0">
          Rellena los campos para completar tu registro y acceder a todas las funciones que ofrece la plataforma
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
          <ProfessionalInfoStep control={control} />

              <Button type="submit" className=" self-end text-right justify-items-end">
                Crear cuenta
              </Button>
          
        </form>
      </FormProvider>
    </div>
  );
}
