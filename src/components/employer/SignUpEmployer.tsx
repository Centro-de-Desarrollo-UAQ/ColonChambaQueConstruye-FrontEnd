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
  const [step, setStep] = useState(1);

  const methods = useForm<EmployerFormType>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      companyName: '',
      companyEmail: '',
      companyDescription: '',
      companyAddress: '',
      companyAddressState: '',
      companyAddressZip: '',
      companyAddressCountry: '',
      companyRFC: '',
      companyRazonSocial: '',
      companySector: '',
      employerName: '',
      employerLastName: '',
      employerEmail: '',
      employerPhone: {code: '+52', number: '' },
      accountPassword: '',
      accountPasswordConfirm: '',
      image: null,
    },
  });

  const { control, handleSubmit, setValue, trigger } = methods;

  const onSubmit = (data: EmployerFormType) => {
    console.log(data);
  };

  const handleNextStep = async () => {
    const valid = await trigger();
    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2xl rounded-lg bg-zinc-50 p-8 shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold">Únete como empleador</h2>
        <p className="mb-6 text-center leading-5">
          Conecta con el talento que tu empresa necesita. Publica ofertas de trabajo y encuentra a
          los profesionales ideales para tu equipo.
        </p>
        {/* UI paso a paso */}
        {step === 1 && (
          <>
            <div className='mb-7 mx-auto w-2/3'>
              <Stepper size={2} activeStep={1} />
            </div>
            <EmployerDetailsStep control={control} />
          </>
        )}

        {step === 2 && (
          <>
            <div className='mb-7 mx-auto w-2/3'>
              <Stepper size={2} activeStep={2} />
            </div>
            <ImageUploadStep
              setSelectedImage={(image) => setValue('image', image)}
            />
          </>
        )}

        <div className="mt-4 flex justify-between items-center">
          {step === 1 && (
            <>
              <Link href="" className="text-zinc-600 underline">
                ¿Ya tienes una cuenta?
                <span className="font-bold"> Inicia sesión</span>
              </Link>
              <Button type="button" onClick={handleNextStep}>
                Registra tu empresa
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button className='ml-auto' type="submit">Finalizar</Button>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
