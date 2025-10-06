'use client';

import { useFormContext, FieldValues } from 'react-hook-form';
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

type Props<T extends FieldValues> = FormPhoneProps<T> & {

  codeName?: keyof T & string;
};

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
  codeName = 'telefonoCode' as keyof T & string,
}: Props<T>) {
  const { setValue, getValues } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}  
      render={({ field }) => {
        const numberStr = typeof field.value === 'string' ? field.value : '';
        const currentCode = (getValues(codeName) as string) || '+52';

        const handleCodeChange = (newCode: string) => {
          // persistimos la LADA aparte
          setValue(codeName as string, newCode, { shouldValidate: true, shouldDirty: true });
        };

        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          // guardamos solo dígitos y máximo 10
          field.onChange(digits(e.target.value).slice(0, 10));
        };

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel htmlFor={htmlFor} className="justify-between font-medium">
                {label}
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
