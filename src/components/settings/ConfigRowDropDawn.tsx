'use client';

import React from 'react';
import { Controller, useFormContext, Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Option = { label: string; value: string; group?: string };

type Props = {
  name?: string;
  title: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
  editInput?: boolean;

  // modo sin RHF
  valueinput?: any; 
  onValueChange?: (v: string) => void;
  externalError?: string;

  control?: Control<any>;
};

function groupOptions(options: Option[]): [string, Option[]][] {
  const grouped: Record<string, Option[]> = {};
  for (const opt of options) {
    const group = opt.group || '';
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(opt);
  }
  return Object.entries(grouped);
}

export default function ConfigRowSelect({
  name,
  title,
  placeholder = 'Selecciona una opción',
  options,
  disabled = false,
  editInput = true,
  valueinput = '',
  onValueChange,
  externalError,
  control: propControl,
}: Props) {
  const methods = useFormContext();
  const control = propControl ?? methods?.control;

  const inRHF = Boolean(control && name);


  const safeValue =
    typeof valueinput === 'string' ? valueinput : (valueinput as any)?.value ?? '';

  
  const selectedLabel =
    options.find((o) => o.value === safeValue)?.label ?? (safeValue || '-');

  return (
    <div className="flex w-full items-center px-4 border-b border-zinc-100">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center min-w-0">
          <p className="min-w-[150px] py-3">{title}</p>

          <div className="flex-1">
            {editInput ? (
              inRHF ? (
                <Controller
                  control={control}
                  name={name as any}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(val) => field.onChange(val)}
                      disabled={disabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>

                      <SelectContent className="max-h-60 overflow-y-auto">
                        {groupOptions(options).map(([group, groupOpts]) => (
                          <SelectGroup key={group}>
                            {group && <SelectLabel>{group}</SelectLabel>}
                            {groupOpts.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              ) : (
                // ✅ modo SIN RHF
                <div className="flex flex-col">
                  <Select
                    value={safeValue} // 👈 usa safeValue, NO valueinput
                    onValueChange={(val) => onValueChange?.(val)}
                    disabled={disabled}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent className="max-h-60 overflow-y-auto">
                      {groupOptions(options).map(([group, groupOpts]) => (
                        <SelectGroup key={group}>
                          {group && <SelectLabel>{group}</SelectLabel>}
                          {groupOpts.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>

                  {externalError && (
                    <p className="mt-1 text-sm text-red-600">{externalError}</p>
                  )}
                </div>
              )
            ) : (
              // ✅ modo lectura: muestra label, no objeto ni value crudo
              <div className="text-sm text-zinc-600 truncate">{selectedLabel}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
