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
            <FormLabel
      htmlFor={htmlFor}
      className="!inline-flex !justify-start items-center gap-1 font-medium"
    >
      {label}
      {!optional && <span className="text-red-500">*</span>}
      {optional && (
        <span className="text-sm font-light text-gray-500 ml-1">Opcional</span>
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
            <Label htmlFor={htmlFor} className="font-thin text-[14px]" variant="description">
              {description}
            </Label>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
