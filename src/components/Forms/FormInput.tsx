import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textArea';
import { Label } from '@/components/ui/label';
import { FieldValues } from 'react-hook-form';
import { FormInputProps } from '@/interfaces';

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  htmlFor,
  type = 'text',
  placeholder,
  maxChars,
  disabled = false,
  icon,
  iconPosition = 'right',
  className,
  optional = false,
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {/* Label superior */}
          {label && (
            <FormLabel htmlFor={htmlFor} className="justify-between font-medium">
              {label}
              {optional && (
                <span className="text-gray-500 text-sm font-light">
                  {' Opcional'}
                </span>
              )}
            </FormLabel>
          )}

          <FormControl>
            {type === 'textarea' ? (
              <Textarea placeholder={placeholder} disabled={disabled} {...field} />
            ) : (
              <Input
                type={type}
                id={htmlFor}
                icon={icon}
                iconPosition={iconPosition}
                maxLength={maxChars}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>

          {/* Label de descripción */}
          {description && (
            <Label htmlFor={htmlFor} variant="description">
              {description}
            </Label>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
