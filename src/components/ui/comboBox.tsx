'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const items = [
  { value: 'phone', label: 'Número de Teléfono' },
  { value: 'currency', label: 'Moneda' },
  { value: 'day', label: 'Día' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' },
];

interface ComboboxDemoProps {
  defaultValue?: string;
  width?: string | number;
}

export function ComboboxDemo({ defaultValue = 'currency', width = '380px' }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  const displayText =
    value === 'phone'
      ? 'MX (+52)'
      : value === 'currency'
        ? 'MXN'
        : value === 'day'
          ? 'Día'
          : value === 'month'
            ? 'Mes'
            : value === 'year'
              ? 'Año'
              : 'Selecciona tipo...';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="edit"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {displayText}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
      >
        <Command>
          <CommandInput placeholder="Buscar tipo..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontró ninguna opción.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
