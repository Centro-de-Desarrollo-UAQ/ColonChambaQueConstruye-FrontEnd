import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textArea';
import { Label } from '@/components/ui/label';
import { FieldValues } from 'react-hook-form';
import { FormInputProps } from '@/interfaces';
import React from 'react'; // Import React

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
  min, 
  onKeyDown, 
  max,
}: FormInputProps<T>) {

  
  const isNumeric = type === 'number';
  const inputType = isNumeric ? 'text' : type;
  const inputMode = isNumeric ? 'numeric' : undefined;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => { 
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value;

          if (isNumeric) {
            // 1. Limpia CUALQUIER letra o símbolo
            const sanitizedValue = value.replace(/[^0-9]/g, '');

            // --- 2. LÓGICA 'MAX' ---
            // Si hay un 'max' definido y el valor no está vacío
            if (max && sanitizedValue !== '') {
              const numMax = Number(max);
              if (Number(sanitizedValue) > numMax) {
                // Si el número se pasa de 10 (ej: 11 o 99)
                // lo forzamos a ser 10
                value = String(numMax); 
              } else {
                // Si es menor (ej: 1, 5, 10) lo dejamos
                value = sanitizedValue;
              }
            } else {
              // Si no hay 'max', solo lo dejamos limpio
              value = sanitizedValue;
            }
            // --- FIN LÓGICA 'MAX' ---
          }

          field.onChange(value);
        };

        return (
          <FormItem className={className}>
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
                <Textarea 
                    placeholder={placeholder} 
                    className='h-36' 
                    disabled={disabled} 
                    {...field} 
                />
              ) : (
                <Input
                  type={inputType}     
                  inputMode={inputMode} 
                  maxLength={maxChars}
                  placeholder={placeholder}
                  disabled={disabled}
                  id={htmlFor}
                  icon={icon}
                  iconPosition={iconPosition}
                  
                  onChange={handleChange} 
                  
                  value={field.value}
                  name={field.name}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  
                />
              )}
            </FormControl>

            {description && (
                <Label htmlFor={htmlFor} className="font-thin text-[14px]" variant="description">
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