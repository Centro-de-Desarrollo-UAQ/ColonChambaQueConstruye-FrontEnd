import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

type Variant = 'checkbox' | 'date';

interface MultiFilterProps {
  variant?: Variant;
  label?: string;
  options?: { label: string; value: string }[];
  value?: unknown;
  onChange?: (value: unknown) => void;
}

export function MultiFilter({
  variant = 'checkbox',
  label = 'Filtro',
  options = [],
  value,
  onChange,
}: MultiFilterProps) {
  const [selected, setSelected] = useState<string[]>(() => (Array.isArray(value) ? value : []));
  const [date, setDate] = useState<Date | undefined>(() =>
    value instanceof Date ? value : undefined,
  );

  useEffect(() => {
    if (variant === 'checkbox' && Array.isArray(value)) {
      setSelected(value);
    }
    if (variant === 'date' && value instanceof Date) {
      setDate(value);
    }
  }, [value, variant]);

  const isActive = variant === 'checkbox' ? selected.length > 0 : !!date;

  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    setSelected(newSelected);
    onChange?.(newSelected);

    console.log('Selected options:', newSelected);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  const displayValue = () => {
    if (variant === 'checkbox' && selected.length > 0) {
      // Convert values to labels for display
      const selectedLabels = selected.map(value => {
        const option = options.find(opt => opt.value === value);
        return option ? option.label : value;
      });
      return selectedLabels.join(', ');
    }
    if (variant === 'date' && date) return format(date, 'dd MMM yyyy');
    return '';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="h-fit gap-1 rounded-4xl border py-1 max-w-[300px]" // Limitamos ancho del botón
          color={isActive ? 'brand' : 'gray'}
          aria-expanded={isActive}
        >
          <span className={isActive ? 'font-medium' : ''}>
            {label}
            {isActive ? ':' : ''}
          </span>
          {/* Truncamos el texto si son muchas opciones seleccionadas */}
          {isActive && <span className="truncate max-w-[150px] block">{displayValue()}</span>}
          <ChevronDown className="ml-1 h-4 w-4 flex-shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit max-w-sm p-0 overflow-hidden" aria-label={`Filtro: ${label}`} align="start">
        {variant === 'checkbox' && (
          <div className="flex flex-col p-4">
            {/* --- AQUÍ ESTÁ LA SOLUCIÓN DEL SCROLL --- */}
            {/* max-h-60 limita la altura y overflow-y-auto habilita el scroll */}
            <div className="flex flex-col items-start space-y-2 max-h-60 overflow-y-auto pr-2">
                {options.map((option) => (
                <div key={option.value} className="flex space-x-2 items-center">
                    <Checkbox
                    id={option.value}
                    checked={selected.includes(option.value)}
                    onCheckedChange={() => toggleOption(option.value)}
                    />
                    <Label htmlFor={option.value} className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {option.label}
                    </Label>
                </div>
                ))}
            </div>
            
            <div className="mt-3 h-[1px] w-full bg-zinc-300" />
            <Button
              variant="secondary"
              size="sm"
              color="gray"
              className="mt-2 w-full"
              onClick={() => {
                setSelected([]);
                onChange?.([]);
              }}
            >
              Borrar selección
            </Button>
          </div>
        )}

        {variant === 'date' && (
          <div className="flex flex-col items-start p-4">
            <Calendar
              className="rounded-md border shadow"
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              captionLayout="dropdown"
              autoFocus
            />
            <Button
              variant="secondary"
              size="sm"
              color="gray"
              className="mt-2 w-full"
              onClick={() => handleDateChange(undefined)}
            >
              Borrar fecha
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}