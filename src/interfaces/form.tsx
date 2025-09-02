import { ComponentType } from 'react';
import { ArrayPath, Control, FieldPath, FieldValues, Path } from 'react-hook-form';

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
  onSelect?: (value: string) => void; // For combobox optional field
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

export interface FormAgeProps<T extends FieldValues> {
  control: Control<T>;

}

// For Experience List Component
type SkillOption = { label: string; value: string };
type ExperienceItem = { skill: string; years: string };

export interface FormExperienceListProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  availableSkills: SkillOption[];
  className?: string;
  onChangeList?: (list: ExperienceItem[]) => void;
};

// For Combo Badge Selector Component
type Option = { label: string; value: string };

export interface FormComboBadgeSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  options: Option[];
};

// For Week Selector Component
export interface FormWeekSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  optional?: boolean;
};