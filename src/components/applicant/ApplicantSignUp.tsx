'use client';
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import PersonalInfoStep from './PersonalInfoStep';
import ProfessionalInfoStep from './ProfessionalInfoStep';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicantFormType, applicantSchema } from '@/validations/applicantSchema';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import Stepper from '../common/Stepper';

export default function ApplicantSignUp() {
  const [step, setStep] = useState(1);
  const [stepValid, setStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const methods = useForm<ApplicantFormType>({
    resolver: zodResolver(applicantSchema),
    defaultValues: {  
      name: '',
      lastName: '',
      address: '',
      birthDate: '',
      email: '',
      password: '',
      confirmPassword: '',
      career: '',
      professionalSummary: '',
      jobLocationPreference: '',
      telefono: '',
      telefonoCode: '+52', 
      preferredHours: '',
      employmentMode: '',
      profilePhoto: null,
      cvFile: undefined,
    },
    mode: 'onSubmit',
    shouldFocusError: true
  });

  const { control, handleSubmit, trigger, watch } = methods;

  const onSubmit = async (data: ApplicantFormType) => {
    console.log('Form submitted:', data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (step === 1) {
        const requiredFields: (keyof ApplicantFormType)[] = [
          'name',
          'lastName',
          'address',
          'birthDate',
          'email',
          'telefono',
          'password',
          'confirmPassword',
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
    if (step === 1) {
      const fieldsToValidate: (keyof ApplicantFormType)[] = [
        'name',
        'lastName',
        'address',
        'birthDate',
        'email',
        'telefono',
        'password',
        'confirmPassword',
      ];
      
      const ok = await trigger(fieldsToValidate);
      if (!ok) return;

      setIsSubmitting(true);
      setError(null);
      
      try {
        const formData = methods.getValues();
        const signupData = {
          firstName: formData.name,
          lastName: formData.lastName,
          address: formData.address,
          birthDate: formData.birthDate,
          email: formData.email,
          cellPhone: `${formData.telefonoCode}${formData.telefono}`,
          password: formData.password,
        };

        const response = await authService.userSignup(signupData, 'user');
        console.log('Registro exitoso:', response);
        
        // Si el registro fue exitoso, avanzar al siguiente paso
        setStep((prev) => prev + 1);
        setStepValid(false);
      } catch (err) {
        console.error('Error en el registro:', err);
        setError(err instanceof Error ? err.message : 'Error al registrarse');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep((prev) => prev + 1);
      setStepValid(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return 'Registrando...';
    if (step === 1) return 'Registrarse';
    if (step === 2) return 'Finalizar registro';
    return 'Finalizar registro';
  };

  return (
    <div className="container mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-12 shadow-sm">
       <div className="mb-6">
<<<<<<< HEAD
      
=======
>>>>>>> 20fd45f (Fixed: Se ha modificado el ApplicantStore para almacenar el id en el localstorage)
    </div>
      <div className="mb-8 space-y-8 text-center">
        <h1 className="text-3xl font-bold text-brand">Completa tu registro</h1>
        <h2 className="mx-auto max-w-2xl text-lg text-[600]">
          Rellena los campos para completar tu registro y acceder a todas las funciones que ofrece
          la plataforma
        </h2>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {step === 1 && <PersonalInfoStep control={control} />}
          {step === 2 && <ProfessionalInfoStep control={control} />}
          
          <div className="flex justify-center">
            {step < 2 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!stepValid || isSubmitting}
              >
                {getButtonText()}
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {getButtonText()}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}