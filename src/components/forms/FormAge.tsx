'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

interface FormAgeProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  minAgeName: Path<T>;
  maxAgeName: Path<T>;
  label?: string;
  description?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
}

export default function FormAge<T extends FieldValues>({
  control: propControl,
  name,
  minAgeName,
  maxAgeName,
  label,
  description,
  minPlaceholder = 'Edad mínima',
  maxPlaceholder = 'Edad máxima',
  disabled = false,
  className,
  optional = false,
}: FormAgeProps<T>) {
  const context = useFormContext<T>();
  const control = propControl || context.control;

  if (!control) {
    throw new Error('FormAge must be used within a FormProvider or have a control prop');
  }

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="font-medium">
              {label}
              {optional && <span className="text-sm font-light text-gray-500">{' Opcional'}</span>}
            </FormLabel>
          )}

          <FormControl>
            <div className="flex w-full items-center gap-2">
              <div className="flex-1">
                <FormField
                  control={control}
                  name={minAgeName}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder={minPlaceholder}
                      disabled={disabled}
                      min={0}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-center">
                <p className="text-center">-</p>
              </div>

              <div className="flex-1">
                <FormField
                  control={control}
                  name={maxAgeName}
                  render={({ field }) => (
                    <Input
                      type="number"
                      placeholder={maxPlaceholder}
                      disabled={disabled}
                      min={0}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </FormControl>

          {description && (
            <Label variant="description" className="mt-1">
              {description}
            </Label>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
