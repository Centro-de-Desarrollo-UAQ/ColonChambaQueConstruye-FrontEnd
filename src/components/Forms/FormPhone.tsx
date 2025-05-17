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
import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';
import { FormPhoneProps } from '@/interfaces/form';
import { countryCodes } from '@/constants';

export default function FormPhone<T extends FieldValues>({
  control,
  name,
  label,
  description,
  htmlFor,
  placeholder,
  disabled = false,
  className,
  optional = false
}: FormPhoneProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value || { code: '+52', number: '' };

        const handleCodeChange = (newCode: string) => {
          field.onChange({ ...value, code: newCode });
        };

        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          field.onChange({ ...value, number: e.target.value });
        };

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel htmlFor={htmlFor} className="justify-between font-medium">
                {label}
                {optional && (
                  <span className="text-gray-500 text-sm font-light"> Opcional</span>
                )}
              </FormLabel>
            )}

            <FormControl>
              <div className="flex gap-2">
                <Select
                  defaultValue={value.code}
                  onValueChange={handleCodeChange}
                  value={value.code}
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
                  type="string"
                  placeholder={placeholder}
                  value={value.number}
                  onChange={handleNumberChange}
                  disabled={disabled}
                  maxLength={10}
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