 'use client';

import { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Control,
  FieldValues,
  Path,
  useFormContext,
  useWatch,
} from 'react-hook-form';

interface FormScheduleProps<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  minHourName: Path<T>;
  maxHourName: Path<T>;
  minDefault?: string;
  maxDefault?: string;
  label?: string;
  description?: string;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
}

const HHMM_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

function safeString(v: unknown) {
  return typeof v === 'string' ? v : '';
}

// En onChange: NO autoformateamos. Solo limpiamos caracteres raros.
function looseSanitize(raw: string) {
  let v = raw.replace(/[^\d:]/g, '');
  if (v.length > 5) v = v.slice(0, 5);
  return v;
}

// En blur: ahora sí convertimos "2010" -> "20:10" o validamos "20:10"
function formatOnBlur(raw: string) {
  const v = raw.trim();
  if (!v) return '';

  // Ya viene con ":" -> validar
  if (v.includes(':')) {
    return HHMM_REGEX.test(v) ? v : '';
  }

  // Sin ":" -> aceptamos 3 o 4 dígitos ("910"->"09:10", "2010"->"20:10")
  if (/^\d{3,4}$/.test(v)) {
    const padded = v.padStart(4, '0');
    const formatted = `${padded.slice(0, 2)}:${padded.slice(2, 4)}`;
    return HHMM_REGEX.test(formatted) ? formatted : '';
  }

  return '';
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

export default function FormSchedule<T extends FieldValues>({
  control: propControl,
  name,
  minHourName,
  maxHourName,
  label,
  description,
  minPlaceholder = 'HH:mm (ej. 20:10)',
  maxPlaceholder = 'HH:mm (ej. 23:30)',
  minDefault = '09:00',
  maxDefault = '17:00',
  disabled = false,
  className,
  optional = false,
}: FormScheduleProps<T>) {
  const context = useFormContext<T>();
  const control = propControl || context.control;

  if (!control) {
    throw new Error('FormSchedule must be used within a FormProvider or have a control prop');
  }

  // ✅ Validación de rango
  const startHour = useWatch({ control, name: minHourName });
  const endHour = useWatch({ control, name: maxHourName });

  const { setValue } = context;

  useEffect(() => {
    if (!startHour) {
      setValue(minHourName as any, minDefault as any);
    }
    if (!endHour) {
      setValue(maxHourName as any, maxDefault as any);
    }
  }, []);

  const isValidRange = (() => {
    const start = safeString(startHour);
    const end = safeString(endHour);

    if (!start || !end) return true; // no validamos si falta uno
    if (!HHMM_REGEX.test(start) || !HHMM_REGEX.test(end)) return true; // aún no está completo

    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    if (startMin === null || endMin === null) return true;

    return startMin <= endMin;
  })();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="font-medium">
              {label}
              {optional && (
                <span className="text-sm font-light text-gray-500">{' Opcional'}</span>
              )}
            </FormLabel>
          )}

          <FormControl>
            <div className="flex w-full items-center gap-2">
              {/* INICIO */}
              <div className="flex-1">
                <FormField
                  control={control}
                  name={minHourName}
                  render={({ field }) => (
                    <Input
                      type="time"
                      step={60}
                      placeholder={minPlaceholder}
                      disabled={disabled}
                      value={safeString(field.value)}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      onChange={(e) => {
                        const val = (e.target as HTMLInputElement).value; // expected HH:MM
                        field.onChange(val || '');
                      }}
                      onBlur={() => field.onBlur()}
                    />
                  )}
                />
              </div>

              <div className="flex items-center justify-center">
                <p className="text-center">-</p>
              </div>

              {/* FIN */}
              <div className="flex-1">
                <FormField
                  control={control}
                  name={maxHourName}
                  render={({ field }) => (
                    <Input
                      type="time"
                      step={60}
                      placeholder={maxPlaceholder}
                      disabled={disabled}
                      value={safeString(field.value)}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      onChange={(e) => {
                        const val = (e.target as HTMLInputElement).value;
                        field.onChange(val || '');
                      }}
                      onBlur={() => field.onBlur()}
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

          {/* ✅ Mensaje de error cuando inicio > fin */}
          {!isValidRange && (
            <p className="text-xs text-red-500 mt-1">
              La hora de inicio no puede ser mayor que la hora de fin.
            </p>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
