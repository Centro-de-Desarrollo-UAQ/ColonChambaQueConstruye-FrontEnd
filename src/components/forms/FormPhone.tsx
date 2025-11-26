'use client';
import { FieldValues, Controller } from 'react-hook-form';
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
}: FormPhoneProps<T>) {
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // field.value debería ser { code: '+52', number: '1234567890' }
        const currentValue = field.value || { code: '+52', number: '' };
        const currentCode = currentValue.code || '+52';
        const currentNumber = currentValue.number || '';

        const handleCodeChange = (newCode: string) => {
          field.onChange({
            ...currentValue,
            code: newCode,
          });
        };

        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const cleanNumber = digits(e.target.value).slice(0, 10);
          field.onChange({
            ...currentValue,
            number: cleanNumber,
          });
        };

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel htmlFor={htmlFor} className="justify-between font-medium">
                {label}
                {!optional && <span className="text-red-500">*</span>}
                {optional && <span className="text-sm font-light text-gray-500"> Opcional</span>}
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
                  value={currentNumber}
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