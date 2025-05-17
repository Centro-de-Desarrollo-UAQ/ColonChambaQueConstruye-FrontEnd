import { ComponentType } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
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
  className?: string;
  optional?: boolean;
}

type OptionType = 'select' | 'combobox';

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
}

export interface FormOptionsProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  htmlFor?: string;
  type: OptionType;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  className?: string;
  optional?: boolean;
  options: SelectOption[];
}

export interface FormPhoneProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  htmlFor?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
}