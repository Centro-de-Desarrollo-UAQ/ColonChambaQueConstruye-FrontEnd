'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerSchema, EmployerFormType } from '@/validations/employerSchema';
import { Button } from '../ui/button';
import Link from 'next/link';
import ImageUploadStep from './ImageUploadSignUp';
import EmployerDetailsStep from './EmployerDetailsStep';
import Stepper from '@/components/common/Stepper';

export default function SignUpEmployer() {

  const methods = useForm<EmployerFormType>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      employerName: '',
      positionWithinTheCompany: '',
      employerLastName: '',
      employerEmail: '',
      employerMobilePhone: { code: '+52', number: '' },
      employerLandlinePhone: { code: '+52', number: '' },
      accountPassword: '',
      accountPasswordConfirm: '',
    },
  });

  const { control, handleSubmit } = methods;

  const onSubmit = (data: EmployerFormType) => {
    console.log("ya te registraste", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-3xl rounded-lg bg-zinc-50 p-8 shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#FF7F40]">Información del responsable de publicar vacantes</h2>
        <p className="mb-6 text-center leading-5">
          Rellena los campos con los datos de la persona responsable de publicar las vacantes
        </p>
            <EmployerDetailsStep control={control} />
        <div className="mt-4 flex items-center justify-center">
              <Button type="submit" >
                Registrarte
              </Button>
        </div>
      </form>
    </FormProvider>
  );
}
