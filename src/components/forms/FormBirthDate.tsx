'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { ApplicantFormType } from '@/validations/applicantSchema';
import React from 'react';
import { es } from 'date-fns/locale';


interface FormBirthDateProps {
  name: keyof ApplicantFormType;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
}

export function FormBirthDate({
  name,
  label,
  description,
  disabled = false,
  className,
  optional = false,
}: FormBirthDateProps) {
  const { control } = useFormContext<ApplicantFormType>();
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const parsedDate =
          typeof field.value === 'string' ? new Date(field.value) : undefined;

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className="font-medium">
                {label}
                {optional && (
                  <span className="text-gray-500 text-sm font-light"> Opcional</span>
                )}
              </FormLabel>
            )}

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="combobox"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    disabled={disabled}
                    size="sm"
                    color="gray"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value && typeof field.value === 'string'
                      ? format(new Date(field.value), 'dd/MM/yyyy', { locale: es })
                      : <span>Selecciona una fecha</span>}

                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                   <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (!selectedDate) return;
                      setDate(selectedDate);
                      field.onChange(selectedDate.toISOString()); 
                    }}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </FormControl>

            {description && (
              <Label variant="description" className="mt-1">
                {description}
              </Label>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
