'use client';

import { useState, useRef, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormOTPValidation } from '../forms/FormOTPValidation';
import { Button } from '@/components/ui/button';

interface OtpInputProps { 
  length?: number;
  onChange: (code: string) => void;
}

export default function EmailVerificationCode({ length = 6, onChange }: OtpInputProps) {
    const methods = useForm({ defaultValues: { otp: Array(6).fill('') } });
  const { control, watch, handleSubmit } = methods;
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const otp = (watch('otp') || []).join('');

  return (
    <div className='w-fit align-center justify-center my-8'>
        <FormProvider {...methods}>
        <form
            onSubmit={handleSubmit(() => console.log('Código:', otp))}
            className="text-center"
        >
            <div className="flex gap-[16px] justify-center gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <FormOTPValidation
                key={i}
                control={control}
                name={`otp.${i}`}
                index={i}
                total={6}
                inputsRef={refs}
                />
            ))}
            </div>
            <Button variant="primary" color="brand" type="submit" className='mt-[20px]'>
            Validar
            </Button>
        </form>
        </FormProvider>
    </div>
  );
}