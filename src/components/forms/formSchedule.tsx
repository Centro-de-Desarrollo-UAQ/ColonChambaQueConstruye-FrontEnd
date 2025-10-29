'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Control, FieldValues, Path, useFormContext } from 'react-hook-form';

interface FormScheduleProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  minHourName: Path<T>;
  maxHourName: Path<T>;
  label?: string;
  description?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
}

export default function FormSchedule<T extends FieldValues>({
  control: propControl,
  name,
  minHourName,
  maxHourName,
  label,
  description,
  minPlaceholder = '',
  maxPlaceholder = '',
  disabled = false,
  className,
  optional = false,
}: FormScheduleProps<T>) {
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
                  name={minHourName}
                  render={({ field }) => (
                    <Input
                      type="string"
                      placeholder={minPlaceholder}
                      disabled={disabled}
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
                  name={maxHourName}
                  render={({ field }) => (
                    <Input
                      type="string"
                      placeholder={maxPlaceholder}
                      disabled={disabled}
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
