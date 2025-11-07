'use client';

import * as React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';

type Props = {
  name: string;                // usa "registerDate"
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
};

export default function FormRegisterDate({
  name,
  label,
  description,
  disabled,
  className,

}: Props) {
  const form = useFormContext(); // no tipamos fuerte para evitar choques de tipos

  // límite máximo = hoy
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => {
        const value = typeof field.value === 'string' && field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className="font-medium">
                
                
              </FormLabel>
            )}

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="combobox"
                    size="sm"
                    disabled={disabled}
                    className={cn(
                      'w-full justify-between text-left font-normal',
                      !value && 'text-muted-foreground'
                    )}
                  >
                    <div className="flex items-center">
                      
                      {value ? (
                        <span>{format(value, 'dd/MM/yyyy', { locale: es })}</span>
                      ) : (
                        <span>Fecha de registro</span>
                      )}
                    </div>

                    {value && (
                      <X
                        className="h-4 w-4 opacity-70 hover:opacity-100"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          field.onChange(''); // limpiar
                        }}
                      />
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={value}
                    onSelect={(d) => {
                      if (!d) return field.onChange('');
                      // Guardamos ISO a las 00:00 locales
                      const iso = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).toISOString();
                      field.onChange(iso);
                    }}
                    disabled={(d) => d > today}
                    fromYear={2010}
                    toYear={today.getFullYear()}
                    weekStartsOn={1}
                    locale={es}
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
