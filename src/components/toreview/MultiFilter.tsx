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
          variant="secundary"
          className="h-fit gap-1 rounded-4xl border py-1"
          color={isActive ? 'brand' : 'gray'}
          aria-expanded={isActive}
        >
          <span className={isActive ? 'font-medium' : ''}>
            {label}
            {isActive ? ':' : ''}
          </span>
          {isActive && <span>{displayValue()}</span>}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-fit" aria-label={`Filtro: ${label}`} align="start">
        {variant === 'checkbox' && (
          <div className="items-start space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex space-x-2">
                <Checkbox
                  id={option.value}
                  checked={selected.includes(option.value)}
                  onCheckedChange={() => toggleOption(option.value)}
                />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
            <div className="mt-3 h-[1px] w-full bg-zinc-300" />
            <Button
              variant="secundary"
              size="sm"
              color="gray"
              className="mt-1"
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
          <div className="flex flex-col items-start">
            <Calendar
              className="rounded"
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              captionLayout="dropdown"
              autoFocus
            />
            <Button
              variant="secundary"
              size="sm"
              color="gray"
              className="mt-2"
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
