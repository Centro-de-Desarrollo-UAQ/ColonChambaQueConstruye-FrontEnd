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
    mode: 'onChange'
  });

  const { control, handleSubmit, trigger, formState, watch } = methods;
  const { isValid, errors, touchedFields } = formState;

  // Debug completo
  useEffect(() => {
    console.group('Form State');
    console.log('isValid:', isValid);
    console.log('Errors:', errors);
    console.log('Touched Fields:', touchedFields);
    console.log('Values:', watch());
    console.groupEnd();
  }, [isValid, errors, touchedFields, watch]);

  const onSubmit = (data: ApplicantFormType) => {
    console.log('Form submitted:', data);
  };

  // Validación específica por paso
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name) return;

      let currentStepFields: (keyof ApplicantFormType)[] = [];
      if (step === 1) {
        currentStepFields = ['name', 'lastName', 'address', 'birthDate', 'email', 'password'];
      } else if (step === 2) {
        currentStepFields = ['career', 'professionalSummary', 'jobLocationPreference', 'preferredHours', 'employmentMode'];
      }

      if (currentStepFields.includes(name as keyof ApplicantFormType)) {
        trigger(currentStepFields).then(isValid => {
          setStepValid(isValid);
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [step, watch, trigger]);

  const handleNextStep = async () => {
    const fieldsToValidate: (keyof ApplicantFormType)[] = 
      step === 1 
        ? ['name', 'lastName', 'address', 'birthDate', 'email', 'password']
        : ['career', 'professionalSummary', 'jobLocationPreference', 'preferredHours', 'employmentMode'];

    const isValidStep = await trigger(fieldsToValidate);
    setStepValid(isValidStep);

    if (isValidStep) {
      setStep(prev => prev + 1);
      setStepValid(false); 
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
    setStepValid(false);
  };

  return (
  <div className="container mx-auto p-12 max-w-4xl border border-uaq-default-200 rounded-lg shadow-sm bg-white">
    <div className="text-center space-y-8 mb-8"> 
      <h1 className="text-3xl font-bold text-[800]">
        Completa tu registro
      </h1>
      <h2 className="text-lg text-[600] max-w-2xl mx-auto">
        Rellena los campos para completar tu registro y acceder a todas las funciones que ofrece la plataforma
      </h2>
    </div>

    <div className="mt-4 text-center">
      <Stepper size={3} activeStep={step} />
    </div>
    
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {step === 1 && <PersonalInfoStep control={control}/>}
        {step === 2 && <ProfessionalInfoStep control={control}/>}
        {step === 3 && <ProfilePhotoStep />}
       
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={handlePrevStep}>
              Anterior
            </Button>
          )}
          
          {step < 3 ? (
            <Button 
              type="button" 
              onClick={handleNextStep} 
              className="ml-auto"
              disabled={!stepValid}
            >
              Siguiente
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Finalizar registro
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  </div>
);
}