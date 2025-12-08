'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import PersonalInfoStep from './PersonalInfoStep';
import EmailVerificationCode from '../ui/email-verification-code';
import ProfessionalInfoStep from './ProfessionalInfoStep';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicantFormType, applicantSchema } from '@/validations/applicantSchema';
import { useRouter } from 'next/navigation';
import { useApplicantStore } from '@/app/store/authApplicantStore';

export default function ApplicantSignUp() {
  const [step, setStep] = useState(1);
  const [stepValid, setStepValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { login, token, id: userId } = useApplicantStore();

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
      
      schooling: '', 
      career: '',
      professionalSummary: '',
      jobLocationPreference: '',
      preferredHours: '',
      employmentMode: '',
      
      telefono: { code: '+52', number: '' },
      
      profilePhoto: null,
      cvFile: undefined,
    },
    mode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false 
  });

  const { control, handleSubmit, trigger, watch, getValues } = methods;

  const onSubmit = async (data: ApplicantFormType) => {
    console.log('Form submitted:', data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (step === 1) {
        const requiredFields = ['name', 'lastName', 'address', 'birthDate', 'email', 'password', 'confirmPassword'];
        let isFilled = requiredFields.every((field) => {
          const val = value[field as keyof ApplicantFormType];
          return val !== undefined && val !== null && val !== '';
        });

        const tel = value.telefono as any;
        if (!tel || !tel.number || tel.number.length !== 10) {
          isFilled = false;
        }

        setStepValid(isFilled);
      } else {
        setStepValid(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [step, watch]);

  // --- PASO 1: REGISTRO ---
  const handleSignupStep1 = async () => {
    if (step === 1) {
      const fieldsToValidate: (keyof ApplicantFormType)[] = [
        'name', 'lastName', 'address', 'birthDate', 'email', 'telefono', 'password', 'confirmPassword',
      ];
      
      const ok = await trigger(fieldsToValidate);
      if (!ok) return;

      setIsSubmitting(true);
      setError(null);
      
      try {
        const formData = getValues();
        
        const telObj = formData.telefono as { code: string; number: string };
        const codeStr = (telObj.code || '+52').replace('+', ''); 
        const numberStr = telObj.number;

        const finalCellPhone = `${telObj.code}${numberStr}`;

        const signupData = {
          firstName: formData.name,
          lastName: formData.lastName,
          address: formData.address,
          birthDate: formData.birthDate,
          email: formData.email.toLowerCase(),
          cellPhone: finalCellPhone,
          password: formData.password,
        };

        console.log("Payload Paso 1:", signupData);

        const response = await fetch('/api/v1/auth/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData),
        });

        const result = await response.json();

        if (!response.ok) {
          const backendMsg = result.message || 'Error al registrarse';
          throw new Error(Array.isArray(backendMsg) ? backendMsg[0] : backendMsg);
        }
        
        if (result.data && result.data.token) {
          login({
            id: result.data.id,
            email: result.data.email,
            status: result.data.status || 'REVISION',
            token: result.data.token,
          });
        }

        setStep(2);

      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : 'Error al registrarse');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
        const formData = getValues();
        
        const professionalData = {
            academicLevel: formData.schooling,
            degree: formData.career,
            jobExperience: formData.professionalSummary, 
            desiredPosition: formData.jobLocationPreference, 
        };

        console.log("Guardando datos profesionales:", professionalData);

        const responseData = await fetch(`/api/v1/users/${userId}/register`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(professionalData),
        });

        if (!responseData.ok) {
            const errorText = await responseData.text();
            throw new Error(`Error en datos profesionales: ${errorText}`);
        }

        if (formData.cvFile instanceof File) {
            
            if (formData.cvFile.type !== 'application/pdf') {
                throw new Error("El archivo de currículum debe ser un PDF válido.");
            }

            console.log("Subiendo archivo de CV...");
            const fileData = new FormData();
            fileData.append('file', formData.cvFile);

            const responseCv = await fetch(`/api/v1/users/${userId}/curriculum/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: fileData
            });

            if (!responseCv.ok) {
                // Si falla el CV pero el registro pasó, solo advertimos (o lanza error si es obligatorio)
                console.warn("El registro se completó pero hubo un error subiendo el CV");
            } else {
                console.log("CV subido correctamente");
            }
        }

        router.push('/login/waiting');

    } catch (err) {
        console.error(err);
        setError("Error al finalizar el registro. Revisa la consola.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return 'Procesando...';
    if (step === 1) return 'Registrarse';
    if (step === 3) return 'Finalizar registro';
    return 'Continuar';
  };

  return (
    <div className="container mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white p-12 shadow-sm">
      <div className="mb-8 space-y-8 text-center">
        <h1 className="text-3xl font-bold text-brand">Completa tu registro</h1>
        <h2 className="mx-auto max-w-2xl text-lg text-gray-600">
          {step === 1 && "Datos personales y cuenta"}
          {step === 2 && "Verifica tu correo electrónico"}
          {step === 3 && "Perfil profesional"}
        </h2>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-800 border border-red-100">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <div className="mt-8">
          
          {step === 1 && <PersonalInfoStep control={control} />}
          
          {step === 2 && (
            <EmailVerificationCode 
               onSuccess={() => {
                 setStep(3);
               }}
            />
          )}

          {step === 3 && <ProfessionalInfoStep control={control} />}
          
          {step !== 2 && (
            <div className="flex justify-center mt-8">
                <Button
                    type="button"
                    onClick={step === 1 ? handleSignupStep1 : handleFinalSubmit}
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-6 text-lg"
                >
                    {getButtonText()}
                </Button>
            </div>
          )}
        </div>
      </FormProvider>
    </div>
  );
}