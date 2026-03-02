'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FieldValues, useFormContext, Controller } from 'react-hook-form';
import { useEffect } from 'react';


interface FormSalaryRangeProps<T extends FieldValues> {
  control?: any; // Control explícito (opcional si se usa FormProvider)
  name: string;
  currencyName: string;
  minSalaryName: string;
  maxSalaryName: string;
  label?: string;
  description?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
}

export default function FormSalaryRange<T extends FieldValues>({
  control: propControl,
  name,
  currencyName,
  minSalaryName,
  maxSalaryName,
  label,
  description,
  minPlaceholder = '',
  maxPlaceholder = '',
  disabled = false,
  className,
  optional = false,
}: FormSalaryRangeProps<T>) {
  // 1. Intenta obtener el control del contexto
  const context = useFormContext<T>();

  // 2. Determina qué control usar (prop o contexto)
  const control = propControl ?? context?.control;

  // 3. Validación temprana
  if (!control) {
    console.error('Error: Missing control prop. Component must be either:');
    console.error('1. Wrapped in a FormProvider, or');
    console.error('2. Receive a control prop directly');

    return (
      <div className={className}>
        <p className="text-red-500">Error: Missing form control configuration</p>
      </div>
    );
  }

  const { watch, setError, clearErrors, formState } = context;
  const watchedMinRaw = watch(minSalaryName as any);
  const watchedMaxRaw = watch(maxSalaryName as any);
  const watchedMin = watchedMinRaw ? Number(watchedMinRaw) : NaN;
  const watchedMax = watchedMaxRaw ? Number(watchedMaxRaw) : NaN;

  useEffect(() => {
    if (!isNaN(watchedMin) && !isNaN(watchedMax)) {
      if (watchedMax <= watchedMin) {
        setError(maxSalaryName as any, { type: 'manual', message: 'El salario máximo debe ser mayor que el salario mínimo.' });
      } else {
        clearErrors(maxSalaryName as any);
      }
    } else {
      clearErrors(maxSalaryName as any);
    }
  }, [watchedMin, watchedMax, maxSalaryName, setError, clearErrors]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={className}>
          {label && (
            <FormLabel className="font-medium">
              {label}
              {optional && <span className="text-sm font-light text-gray-500">{' Opcional'}</span>}
            </FormLabel>
          )}

          <div className="mt-2 flex items-center gap-2">
            {/* Selector de moneda */}
            <div className="w-[120px]">
              <Controller
                control={control}
                name={currencyName}
                render={({ field: currencyField }) => (
                  <div className='font-bold w-[70px] '> 
                    <Input
                      type="text"
                      value="MXN"
                      readOnly
                    />
                  </div>
                )}
              />
            </div>

            {/* Inputs de rango salarial */}
            <div className="flex items-center gap-2">
              <div className='bg-zinc-100 flex items-center rounded-md border bg-zinc-100'>
                <span className="text-gray-700 ml-2">$</span>
                <Controller
                  control={control}
                  name={minSalaryName}
                  render={({ field: minField }) => (
                    <Input
                      type="number"
                      placeholder={minPlaceholder}
                      disabled={disabled}
                      {...minField}
                      min={1000}
                      className='border-0 p-0'
                      onBlur={(e) => {
                        if (typeof minField.onBlur === 'function') minField.onBlur?.();
                        const val = (e.target as HTMLInputElement).value;
                        if (val !== '' && !isNaN(Number(val)) && Number(val) < 1000) {
                          minField.onChange('1000');
                        }
                      }}
                    />
                  )}
                />
              </div>
              
              <span className="text-gray-500">-</span>
              <div className='bg-zinc-100 flex items-center rounded-md border bg-zinc-100'>
                <span className="text-gray-700 ml-2">$</span>
                <Controller
                  control={control}
                  name={maxSalaryName}
                  render={({ field: maxField }) => {
                    const dynamicMin = !isNaN(watchedMin) ? watchedMin + 1 : 1000;
                    return (
                      <Input
                        type="number"
                        placeholder={maxPlaceholder}
                        disabled={disabled}
                        min={dynamicMin}
                        className='border-0 px-1  '
                        {...maxField}
                        onBlur={(e) => {
                          if (typeof maxField.onBlur === 'function') maxField.onBlur?.();
                          const val = (e.target as HTMLInputElement).value;
                          if (val !== '' && !isNaN(Number(val)) && !isNaN(watchedMin) && Number(val) <= watchedMin) {
                            const corrected = String(watchedMin + 1);
                            maxField.onChange(corrected);
                          }
                        }}
                      />
                    );
                  }}
                /> 
              </div>
            </div>
          </div>

          {description && (
            <Label variant="description" className="mt-1">
              {description}
            </Label>
          )}

          {formState.errors && (formState.errors as any)[maxSalaryName] && (
            <Label className="text-red-600 mt-1">{(formState.errors as any)[maxSalaryName].message}</Label>
          )}

          <FormMessage />
        </div>
      )}
    />
  );
}
