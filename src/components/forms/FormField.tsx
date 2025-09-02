import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textArea';
import { Label } from '@/components/ui/label';
import { ComponentType, forwardRef, RefObject } from 'react';

type FormFieldProps = {
  label?: string;
  description?: string;
  htmlFor?: string;
  variant?: 'default' | 'count' | 'description';
  type?: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  maxChars?: number;
  disabled?: boolean;
  icon?: ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  width?: number;
  className?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  descriptionClassName?: string;
  value?: string; // Nueva prop value
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      description,
      htmlFor,
      type = 'text',
      placeholder,
      maxChars,
      disabled = false,
      icon,
      iconPosition = 'right',
      width,
      className,
      inputRef,
      descriptionClassName = 'mb-6',
      value, // Extraemos value de props
      onChange, // Extraemos onChange de props
      ...props
    },
    ref,
  ) => {
    const renderInput = () => {
      switch (type) {
        case 'textarea':
          return (
            <Textarea
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              {...props}
              className="mb-1"
            />
          );
        default:
          return (
            <Input
              type={type}
              id={htmlFor}
              ref={ref}
              placeholder={placeholder}
              disabled={disabled}
              icon={icon}
              iconPosition={iconPosition}
              maxLength={maxChars}
              value={value}
              onChange={onChange}
              {...props}
              className="mb-1"
            />
          );
      }
    };

    return (
      <div className={className}>
        {/* Label superior */}
        {label && (
          <Label htmlFor={htmlFor} variant="default" className="pb-3">
            {label}
          </Label>
        )}

        {/* Componente de entrada */}
        {renderInput()}

        {/* Label de descripción */}
        {description && (
          <Label htmlFor={htmlFor} variant="description" className={descriptionClassName}>
            {description}
          </Label>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
