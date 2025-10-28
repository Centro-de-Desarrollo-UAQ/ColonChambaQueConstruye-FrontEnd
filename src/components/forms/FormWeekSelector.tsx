'use client';

import { FieldValues, useController } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { FormWeekSelectorProps } from '@/interfaces';
import { daysMap } from '@/constants';

export default function FormWeekSelector<T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  optional = false,
}: FormWeekSelectorProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => {
        const {
          field: { value = [], onChange },
        } = useController({ name, control });

        const daysValue = Array.isArray(value) ? value as string[] : [];

        const toggleDay = (day: string) => {
          if (daysValue.includes(day)) {
            onChange(daysValue.filter((d) => d !== day));
          } else {
            onChange([...daysValue, day]);
          }
        };

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className="justify-between font-medium">
                {label}
                {optional && (
                  <span className="text-gray-500 text-sm font-light"> Opcional</span>
                )}
              </FormLabel>
            )}

            <FormControl>
              <div className="flex gap-2 flex-wrap">
                {daysMap.map((day, idx) => (
                  <button
                    key={`${day.value}-${idx}`}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={cn(
                      'w-10 h-10 flex items-center justify-center rounded-full border text-sm',
                      daysValue.includes(day.value)
                        ? 'bg-uaq-terniary text-white border-uaq-brand'
                        : 'bg-gray-100 border-gray-300 text-black hover:bg-gray-200'
                    )}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}