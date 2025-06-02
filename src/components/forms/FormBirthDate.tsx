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
import { useFormContext } from 'react-hook-form';
import { monthOptions, getYearOptions, getDayOptions } from '@/data/selectOptions';
import { useEffect, useMemo, useState } from 'react';
import { ApplicantFormType } from '@/validations/applicantSchema';

interface SelectOption {
  value: string;
  label: string;
}

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
  const { control, watch, setValue } = useFormContext<ApplicantFormType>();
  const [dayOptions, setDayOptions] = useState<SelectOption[]>([]);
  const yearOptions = useMemo(() => getYearOptions(), []);

  const birthDateValue = watch(name);

  const initialDate = useMemo(() => {
    if (!birthDateValue) return null;
    
    try {
      const dateStr = typeof birthDateValue === 'string' ? birthDateValue : '';
      return dateStr ? new Date(dateStr) : null;
    } catch {
      return null;
    }
  }, [birthDateValue]);

  // Inicializar valores seleccionados
  const [selectedValues, setSelectedValues] = useState({
    year: initialDate?.getFullYear()?.toString() || '',
    month: initialDate ? (initialDate.getMonth() + 1).toString() : '',
    day: initialDate?.getDate()?.toString() || ''
  });

  useEffect(() => {
    if (selectedValues.month && selectedValues.year) {
      const days = getDayOptions(
        parseInt(selectedValues.month),
        parseInt(selectedValues.year)
      );
      setDayOptions(days);
      
      if (selectedValues.day && !days.some(d => d.value === selectedValues.day)) {
        setSelectedValues(prev => ({ ...prev, day: '' }));
      }
    } else {
      setDayOptions([]);
    }
  }, [selectedValues.month, selectedValues.year]);

  const handleChange = (type: 'year' | 'month' | 'day', value: string) => {
    const newValues = { ...selectedValues, [type]: value };
    setSelectedValues(newValues);

    if (newValues.year && newValues.month && newValues.day) {
      const formattedDate = `${newValues.year}-${newValues.month.padStart(2, '0')}-${newValues.day.padStart(2, '0')}`;
      setValue(name, formattedDate, { shouldValidate: true });
    } else {
      setValue(name, null, { shouldValidate: true });
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="font-medium">
              {label}
              {optional && <span className="text-gray-500 text-sm font-light"> Opcional</span>}
            </FormLabel>
          )}

          <FormControl>
            <div className="grid grid-cols-3 gap-2">
              {/* Selector de Año */}
              <Select
                value={selectedValues.year}
                onValueChange={(val) => handleChange('year', val)}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selector de Mes */}
              <Select
                value={selectedValues.month}
                onValueChange={(val) => handleChange('month', val)}
                disabled={disabled || !selectedValues.year}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selector de Día */}
              <Select
                value={selectedValues.day}
                onValueChange={(val) => handleChange('day', val)}
                disabled={disabled || !selectedValues.month}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Día" />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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