'use client';

import {  FieldValues } from 'react-hook-form';
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { countryCodes } from '@/constants';
import { FormPhoneProps } from '@/interfaces/form';

const digits = (s: string) => (s ?? '').replace(/\D/g, '');

type PhoneValue = {
  code: string;
  number: string;
};

type Props<T extends FieldValues> = FormPhoneProps<T>;

export default function FormPhone<T extends FieldValues>({
  control,
  name,
  label,
  description,
  htmlFor,
  placeholder,
  disabled = false,
  className,
  optional = false,
}: Props<T>) {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = (field.value || {}) as Partial<PhoneValue>;

        const currentCode = value.code || '+52';
        const numberStr = value.number || '';

        const handleCodeChange = (newCode: string) => {
          field.onChange({
            code: newCode,
            number: numberStr,
          });
        };

        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const onlyDigits = digits(e.target.value).slice(0, 10);
          field.onChange({
            code: currentCode,
            number: onlyDigits,
          });
        };

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel htmlFor={htmlFor} className="justify-between font-medium">
                {label}
                {optional && (
                  <span className="text-sm font-light text-gray-500"> Opcional</span>
                )}
              </FormLabel>
            )}

            <FormControl>
              <div className="flex gap-2">
                <Select
                  value={currentCode}
                  onValueChange={handleCodeChange}
                  disabled={disabled}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="+XX" />
                  </SelectTrigger>

                  <SelectContent>
                    {countryCodes.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="tel"
                  placeholder={placeholder}
                  value={numberStr}
                  onChange={handleNumberChange}
                  disabled={disabled}
                  maxLength={10}
                  inputMode="numeric"
                />
              </div>
            </FormControl>

            {description && (
              <Label htmlFor={htmlFor} variant="description">
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
