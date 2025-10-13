'use client';
import { Input } from '@/components/ui/input';
import { Controller, Control } from 'react-hook-form';
import { useRef } from 'react';

type OtpDigitProps = {
  control: Control<any>;
  name: string;        // ej: `otp[0]`, `otp[1]`...
  index: number;
  inputsRef: React.MutableRefObject<(HTMLInputElement | null)[]>;
  total: number;
  className?: string;
};

export function FormOTPValidation({ control,    name, index, inputsRef, total, className }: OtpDigitProps) {
  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field }) => (
        <Input
          ref={(el) => { inputsRef.current[index] = el; }}  
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={field.value ?? ''}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, '').slice(0, 1);
            field.onChange(v);
            if (v && index < total - 1) inputsRef.current[index + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !field.value && index > 0) {
              inputsRef.current[index - 1]?.focus();
            }
          }}
          className='w-[66px] h-[66px] text-center text-xl border-2 rounded-xl'
        />
      )}
    />
  );
}
