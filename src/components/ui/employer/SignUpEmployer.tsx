'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerSchema, EmployerFormType } from '@/validations/employerSchema';
import { Button } from '../button';
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
      companyAddressState: 'Selecciona un estado',
      companyAddressZip: '',
      companyAddressCountry: 'Selecciona un Pais',
      companyRFC: '',
      companyRazonSocial: '',
      companySector: 'Selecciona un sector',
      employerName: '',
      employerLastName: '',
      employerEmail: '',
      employerPhone: '',
      employerPhoneCode: 'MX +(52)',
      accountPassword: '',
      accountPasswordConfirm: '',
      accountTerms: false,
      image: null,
    },
  });

  const { control, handleSubmit, watch, setValue, trigger } = methods;

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
            <Stepper size={2} activeStep={1} />
            <EmployerDetailsStep control={control} />
            {/* TODO: Add link to terms and conditions */}
            <div>
              Al continuar, confirmas que has leído las{' '}
              <Link href="" className="text-uaq-brand underline">
                Condiciones Legales
              </Link>{' '}
              y la{' '}
              <Link href="" className="text-uaq-brand underline">
                Política de Privacidad
              </Link>{' '}
              de la Bolsa de Trabajo UAQ para continuar con el registro.
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Stepper size={2} activeStep={2} />
            <ImageUploadStep
              selectedImage={watch('image')}
              setSelectedImage={(image) => setValue('image', image)}
            />
          </>
        )}

        <div className="mt-8 flex justify-between">
          {step === 1 && (
            <>
              <Link href="" className="text-zinc-600 underline">
                ¿Ya tienes una cuenta?
                <span className="font-bold"> Inicia sesión</span>
              </Link>
              <Button type="button" onClick={handleNextStep}>
                Siguiente
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                Atrás
              </Button>
              <Button type="submit">Crear cuenta</Button>
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
