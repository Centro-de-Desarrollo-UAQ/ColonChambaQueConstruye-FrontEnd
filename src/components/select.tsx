//! Don't use this, use src/components/ui/select.tsx instead
'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

interface CustomSelectProps {
  options: { label: string; value: string }[];
  placeholder?: string;
  value?: string | null;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export default function CustomSelect({
  options,
  placeholder = 'Select',
  value,
  disabled = false,
  onChange,
  className = 'bg-uaq-default-100 font-[400] px-4 py-3',
}: CustomSelectProps) {
  const handleChange = (newValue: string) => {
    if (!disabled && onChange) {
      onChange(newValue);
    }
  };

  return (
    <Select value={value || undefined} onValueChange={handleChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
