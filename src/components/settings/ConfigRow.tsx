'use client';
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export type ConfigRowProps = {
  name?: string;
  title?: string;
  valueinput?: string;
  isTitle?: boolean;
  placeholder?: string;
  isEditable?: boolean;
  editInput?: boolean;
  onEditClick?: () => void;
  onValueChange?: (v: string) => void;
  inputType?: React.HTMLInputTypeAttribute;
  rules?: any;
  externalError?: string; // nuevo: error desde el padre para modo no-RHF
};

export function ConfigRow({
  name,
  title,
  valueinput = '',
  isTitle = false,
  placeholder = '',
  isEditable = false,
  editInput = false,
  onEditClick,
  onValueChange,
  inputType,
  rules,
  externalError,
}: ConfigRowProps) {
  const methods = useFormContext();
  const inFormContext = Boolean(methods && name);

  const watchedValue = inFormContext && methods ? methods.watch(name as any) : undefined;
  const displayValue = typeof watchedValue !== 'undefined' ? watchedValue : valueinput ?? '';

  const isPasswordField = inputType === 'password' || name === 'password';
  const maskedValue = isPasswordField ? '*************' : displayValue;

  // error desde RHF si existe
  const fieldError =
    inFormContext && methods && name ? ((methods.formState.errors as any)[name as string]?.message as string | undefined) : undefined;

  // fallback error state when NOT using RHF (non-context editing)
  const [localError, setLocalError] = useState<string | null>(null);

  // default rules to avoid empty / only-spaces values when editing
  const defaultRules =
    editInput
      ? {
          required: 'No puede quedar vacío',
          validate: (v: any) => (typeof v === 'string' ? v.trim() !== '' : !!v) || 'No puede quedar vacío',
          ...(inputType === 'tel' || name === 'phone' ? { pattern: { value: /^\d+$/, message: 'Solo se permiten números' } } : {}),
        }
      : undefined;

  const appliedRules = rules ?? defaultRules;

  // mostrar error prioritariamente: RHF fieldError -> externalError -> localError
  const shownError = fieldError ?? externalError ?? localError ?? undefined;

  return (
    <div
      className={`flex w-full items-center ${isTitle ? 'px-6' : 'px-4'} border-b border-zinc-100 ${isTitle && isEditable ? 'bg-zinc-50' : isTitle ? 'bg-zinc-50 py-4' : ''}`}
    >
      {isTitle ? (
        <>
          <h3 className="flex-1 text-[16px] font-[800]">{title}</h3>
        </>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center min-w-0">
            <p className="min-w-[150px] py-3">{title}</p>
            <div className="flex-1">
              {editInput ? (
                inFormContext && methods && name ? (
                  <Controller
                    control={methods.control}
                    name={name as any}
                    rules={appliedRules}
                    render={({ field }) => (
                      <Input
                        className="w-full rounded border px-3 py-2 text-sm"
                        placeholder={placeholder}
                        type={inputType ?? 'text'}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          if (methods.formState.errors && (methods.formState.errors as any)[name as string]) {
                            methods.clearErrors(name as any);
                          }
                        }}
                        onBlur={(e) => {
                          const trimmed = (e.target.value ?? '').trim();
                          if (trimmed !== field.value) {
                            field.onChange(trimmed);
                          }
                          field.onBlur();
                        }}
                      />
                    )}
                  />
                ) : (
                  <>
                    <Input
                      className="w-full rounded border px-3 py-2 text-sm"
                      value={displayValue}
                      placeholder={placeholder}
                      onChange={(e) => {
                        setLocalError(null);
                        onValueChange?.(e.target.value);
                      }}
                      onBlur={(e) => {
                        const trimmed = e.target.value.trim();
                        if (trimmed === '') {
                          setLocalError('No puede quedar vacío');
                          // no propagar valor vacío
                        } else {
                          if (trimmed !== displayValue) onValueChange?.(trimmed);
                          setLocalError(null);
                        }
                      }}
                      type={inputType ?? 'text'}
                    />
                    {/* mostrar error local o externo */}
                    {(externalError || localError) && <p className="mt-1 text-sm text-red-600">{externalError ?? localError}</p>}
                  </>
                )
              ) : (
                <div className="text-sm text-zinc-600 truncate">{isPasswordField ? maskedValue : displayValue}</div>
              )}
            </div>
          </div>

          {fieldError && (
            <p className="mt-1 text-sm text-red-600 pl-[150px]">
              {fieldError}
            </p>
          )}
        </div>
      )}

      <div className={`ml-auto ${isEditable ? 'py-4' : 'py-6'} shrink-0`}>
        {isEditable && isTitle && (
          <Button onClick={onEditClick} variant="edit" color="gray">
            Editar
          </Button>
        )}
      </div>
    </div>
  );
}