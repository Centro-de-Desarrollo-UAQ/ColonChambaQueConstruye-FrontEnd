import { ComponentType } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  htmlFor?: string;
  variant?: 'default' | 'count' | 'description';
  type?: 'text' | 'email' | 'password' | 'textarea' | 'combobox';
  placeholder?: string;
  maxChars?: number;
  disabled?: boolean;
  icon?: ComponentType<{ className?: string }>;
  iconPosition?: 'left' | 'right';
  width?: number;
  className?: string;
}
