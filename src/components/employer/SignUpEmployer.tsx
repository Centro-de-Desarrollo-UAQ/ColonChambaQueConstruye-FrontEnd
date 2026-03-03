'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employerSchema, EmployerFormType } from '@/validations/employerSchema';
import { Button } from '../ui/button';
import EmployerDetailsStep from './EmployerDetailsStep';
import { authService } from '@/services/auth.service';
import { useCompanyStore } from '@/app/store/authCompanyStore';

type HttpErrorPayload = { status?: number; message?: string };

type SignUpEmployerProps = {
  onSuccess?: () => void;
  onHttpError?: (err: HttpErrorPayload) => void; 
};

function extractStatusCode(error: unknown): number | undefined {
 
  if (error instanceof Error) {
    const raw = error.message?.trim();
    if (raw?.startsWith('{') && raw?.endsWith('}')) {
      try {
        const parsed = JSON.parse(raw);
        return parsed?.statusCode ?? parsed?.status;
      } catch {
        return undefined;
      }
    }
  }

  if (typeof error === 'object' && error !== null) {
    const e = error as any;
    return e?.statusCode ?? e?.status ?? e?.response?.status;
  }

  return undefined;
}

function extractMessage(error: unknown): string | undefined {
  if (error instanceof Error) {
    const raw = error.message?.trim();
    if (raw?.startsWith('{') && raw?.endsWith('}')) {
      try {
        const parsed = JSON.parse(raw);
        return parsed?.message;
      } catch {
        return error.message;
      }
    }
    return error.message;
  }
  return undefined;
}

export default function SignUpEmployer({ onSuccess, onHttpError }: SignUpEmployerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<EmployerFormType>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      employerName: '',
      positionWithinTheCompany: '',
      employerLastName: '',
      employerEmail: '',
      accountPassword: '',
      accountPasswordConfirm: '',
    },
  });

  const { control, handleSubmit } = methods;
  const saveCompanyData = useCompanyStore((s) => s.saveCompanyData);

  const onSubmit = async (data: EmployerFormType) => {
    setIsLoading(true);

    try {
      const payload = {
        firstName: data.employerName,
        lastName: data.employerLastName,
        jobTitle: data.positionWithinTheCompany,
        email: data.employerEmail,
        landlinePhone: data.employerLandlinePhone
          ? `${data.employerLandlinePhone.code}${data.employerLandlinePhone.number}`
          : '',
        cellPhone: data.employerMobilePhone
          ? `${data.employerMobilePhone.code}${data.employerMobilePhone.number}`
          : '',
        password: data.accountPassword,
      };

      const signupData = await authService.userSignup('employer', payload);

      const companyId = signupData?.data?.id;
      const token = signupData?.data?.token;
      const status = signupData?.data?.status;
      const emailFromApi = signupData?.data?.email;

      if (!companyId) {
        console.log('signupData completo:', signupData);
        throw new Error('No llegó data.id en la respuesta del signup');
      }

      saveCompanyData({
        companyId: String(companyId),
        email: emailFromApi ?? data.employerEmail,
        status: status ?? 'REVISION',
        token: token ?? '',
      });

      onSuccess?.();
    } catch (error) {
      console.log('SIGNUP ERROR', error);

      const status = extractStatusCode(error);
      const message = extractMessage(error);
      onHttpError?.({ status, message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3xl rounded-lg bg-zinc-50 p-8 shadow-xl"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-[#FF7F40]">
          Información del responsable de publicar vacantes
        </h2>
        <p className="mb-6 text-center leading-5">
          Rellena los campos con los datos de la persona responsable de publicar las vacantes
        </p>

        <EmployerDetailsStep control={control} />

        <div className="mt-4 flex items-center justify-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}