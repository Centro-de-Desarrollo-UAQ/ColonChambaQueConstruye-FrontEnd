//! Using Shadcn's DatePicker, as well as converting it into a reusable component by using the form wrapper
import CustomSelect from './select';
import { Label } from '@/components/ui/label';
import { monthOptions, yearOptions, getDayOptions } from '@/data/selectOptions';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface InputBirthDateProps {
  value?: string;
  onChange?: (value: string) => void;
  showError?: boolean;
}

export default function InputBirthDate({
  value,
  onChange,
  showError = false,
}: InputBirthDateProps) {
  // Parsear el valor inicial
  const initialDate = value ? new Date(value) : null;
  const initialYear = initialDate?.getFullYear() || null;
  const initialMonth = initialDate ? initialDate.getMonth() + 1 : null;
  const initialDay = initialDate?.getDate() || null;

  const [selectedYear, setSelectedYear] = useState<number | null>(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(initialMonth);
  // 1. Modifica el estado para el día:
  const [selectedDay, setSelectedDay] = useState<string | null>(initialDay?.toString() || null);
  const [dayOptions, setDayOptions] = useState<{ label: string; value: string }[]>([]);

  // Memoize las opciones para evitar recreación
  const memoizedYearOptions = useMemo(() => yearOptions, []);
  const memoizedMonthOptions = useMemo(() => monthOptions, []);

  // Actualizar opciones de días cuando cambia año/mes
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const days = getDayOptions(selectedMonth, selectedYear);
      setDayOptions(days);

      if (selectedDay && !days.some((day) => day.value === selectedDay)) {
        setSelectedDay(null);
      }
    } else {
      setDayOptions([]);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  // Notificar cambios solo cuando la fecha está completa
  const notifyChange = useCallback(() => {
    if (selectedYear && selectedMonth && selectedDay && onChange) {
      const formattedDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
      onChange(formattedDate);
    }
  }, [selectedYear, selectedMonth, selectedDay, onChange]);

  useEffect(() => {
    notifyChange();
  }, [notifyChange]);

  // Handlers optimizados
  const handleYearChange = useCallback((value: string) => {
    const year = Number(value);
    setSelectedYear(year);
    setSelectedMonth(null);
    setSelectedDay(null);
  }, []);

  const handleMonthChange = useCallback((value: string) => {
    const month = Number(value);
    setSelectedMonth(month);
    setSelectedDay(null);
  }, []);

  const handleDayChange = useCallback((value: string) => {
    setSelectedDay(value); // Ahora manejamos el valor como string directamente
  }, []);

  const isComplete = selectedYear && selectedMonth && selectedDay;

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm">
        {selectedYear
          ? selectedMonth
            ? 'Finalmente selecciona el día'
            : 'Ahora selecciona el mes'
          : 'Selecciona el año'}
      </p>

      <div className="grid grid-cols-3 gap-2">
        {/* Año */}
        <div className="flex flex-col">
          <Label htmlFor="year" className="mb-1">
            Año
          </Label>
          <CustomSelect
            placeholder="Año"
            options={memoizedYearOptions}
            onChange={handleYearChange}
            value={selectedYear?.toString()}
          />
        </div>

        {/* Mes */}
        <div className="flex flex-col">
          <Label htmlFor="month" className="mb-1">
            Mes
          </Label>
          <CustomSelect
            placeholder="Mes"
            options={memoizedMonthOptions}
            onChange={handleMonthChange}
            disabled={!selectedYear}
            value={selectedMonth?.toString()}
          />
        </div>

        {/* Día */}
        <div className="flex flex-col">
          <Label htmlFor="day" className="mb-1">
            Día
          </Label>
          <CustomSelect
            placeholder="Día"
            options={dayOptions}
            onChange={handleDayChange}
            disabled={!selectedMonth || !selectedYear}
            value={selectedDay} // Ahora usa el string directamente
          />
        </div>
      </div>

      {showError && !isComplete && (
        <p className="mt-1 text-sm text-red-500">Por favor, completa tu fecha de nacimiento</p>
      )}
    </div>
  );
}
