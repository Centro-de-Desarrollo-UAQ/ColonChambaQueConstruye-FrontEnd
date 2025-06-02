'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
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
import { currencyOptions } from '@/data/selectOptions';

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
  minPlaceholder = 'Mínimo',
  maxPlaceholder = 'Máximo',
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

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={className}>
          {label && (
            <FormLabel className="font-medium">
              {label}
              {optional && (
                <span className="text-gray-500 text-sm font-light">
                  {' Opcional'}
                </span>
              )}
            </FormLabel>
          )}

          <div className="flex items-center gap-2 mt-2">
            {/* Selector de moneda */}
            <div className="w-[120px]">
              <Controller
                control={control}
                name={currencyName}
                render={({ field: currencyField }) => (
                  <Select
                    onValueChange={currencyField.onChange}
                    value={currencyField.value}
                    disabled={disabled}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Inputs de rango salarial */}
            <div className="flex flex-1 items-center gap-2">
              <Controller
                control={control}
                name={minSalaryName}
                render={({ field: minField }) => (
                  <Input
                    type="number"
                    placeholder={minPlaceholder}
                    disabled={disabled}
                    min={0}
                    {...minField}
                  />
                )}
              />
              <span className="text-gray-500">-</span>
              <Controller
                control={control}
                name={maxSalaryName}
                render={({ field: maxField }) => (
                  <Input
                    type="number"
                    placeholder={maxPlaceholder}
                    disabled={disabled}
                    min={0}
                    {...maxField}
                  />
                )}
              />
            </div>
          </div>

          {description && (
            <Label variant="description" className="mt-1">
              {description}
            </Label>
          )}

          <FormMessage />
        </div>
      )}
    />
  );
}