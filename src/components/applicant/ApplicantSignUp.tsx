'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Stepper from '@/components/common/Stepper';
import PersonalInfoStep from './PersonalInfoStep';
import ProfessionalInfoStep from './ProfessionalInfoStep';
import ProfilePhotoStep from './ProfilePhotoStep';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicantFormType, applicantSchema } from '@/validations/applicantSchema';

export default function ApplicantSignUp() {
  const [step, setStep] = useState(1);
  const [stepValid, setStepValid] = useState(false);

  const methods = useForm<ApplicantFormType>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {
      name: '',
      lastName: '',
      address: '',
      birthDate: '',
      email: '',
      password: '',
      career: '',
      professionalSummary: '',
      jobLocationPreference: '',
      preferredHours: '',
      employmentMode: '',
      profilePhoto: null,
      cvFile: undefined
    },
    mode: 'onSubmit'
  });

  const { control, handleSubmit, trigger, watch } = methods;

  const onSubmit = (data: ApplicantFormType) => {
    console.log('Form submitted:', data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (step === 1) {
        const requiredFields: (keyof ApplicantFormType)[] = [
          'name', 'lastName', 'address', 'birthDate', 'email', 'password'
        ];

        const isFilled = requiredFields.every((field) => {
          const val = value[field];
          return val !== undefined && val !== null && val !== '';
        });

        setStepValid(isFilled);
      } else {
        setStepValid(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [step, watch]);

  const handleNextStep = async () => {
    const fieldsToValidate: (keyof ApplicantFormType)[] =
      step === 1
        ? ['name', 'lastName', 'address', 'birthDate', 'email', 'password']
        : []; 

    const isValidStep = step === 1 ? await trigger(fieldsToValidate) : true;
    setStepValid(isValidStep);

    if (isValidStep) {
      setStep(prev => prev + 1);
      setStepValid(false);
    }
  };

  const getButtonText = () => {
    if (step === 1) return 'Registrar tu usuario';
    if (step === 2) return 'Continuar';
    return 'Finalizar registro';
  };

  return (
    <div className="container mx-auto p-12 max-w-2xl border border-zinc-200 rounded-lg shadow-sm bg-white">
      <div className="text-center space-y-8 mb-8"> 
        <h1 className="text-3xl font-bold text-[800]">Completa tu registro</h1>
        <h2 className="text-lg text-[600] max-w-2xl mx-auto">
          Rellena los campos para completar tu registro y acceder a todas las funciones que ofrece la plataforma
        </h2>
      </div>

      <div className="mt-4 text-center">
        <Stepper size={3} activeStep={step} />
      </div>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {step === 1 && <PersonalInfoStep control={control} />}
          {step === 2 && <ProfessionalInfoStep control={control} />}
          {step === 3 && <ProfilePhotoStep />}

          <div className="mt-8 flex justify-between">
            {step < 3 ? (
              <Button 
                type="button" 
                onClick={handleNextStep} 
                className="ml-auto"
                disabled={!stepValid}
              >
                {getButtonText()}
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                {getButtonText()}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
