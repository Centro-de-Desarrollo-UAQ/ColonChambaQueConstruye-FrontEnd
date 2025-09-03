import { useState } from 'react';
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
  options?: string[]; // solo si variant === "checkbox"
}

export function MultiFilter({
  variant = 'checkbox',
  label = 'Filtro',
  options = [],
}: MultiFilterProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>();

  const isActive = variant === 'checkbox' ? selected.length > 0 : !!date;

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  const displayValue = () => {
    if (variant === 'checkbox') return selected.join(', ');
    if (variant === 'date' && date) return format(date, 'dd MMM yyyy');
    return '';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
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
              <div key={option} className="flex space-x-2">
                <Checkbox
                  id={option}
                  checked={selected.includes(option)}
                  onCheckedChange={() => toggleOption(option)}
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
            <div className="mt-3 h-[1px] w-full bg-zinc-300" />
            <Button
              variant="secondary"
              size="sm"
              color="gray"
              className="mt-1"
              onClick={() => setSelected([])}
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
              onSelect={setDate}
              initialFocus
            />
            <Button
              variant="secondary"
              size="sm"
              color="gray"
              className="mt-2"
              onClick={() => setDate(undefined)}
            >
              Borrar fecha
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
