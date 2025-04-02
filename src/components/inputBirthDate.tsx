import CustomSelect from "./select";
import { Label } from "@/components/ui/label";
import { monthOptions, yearOptions, getDayOptions } from "@/data/selectOptions";
import { useState, useEffect } from "react";

export default function InputBirthDate() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [dayOptions, setDayOptions] = useState<{ label: string; value: string }[]>([]);
  const [instructions, setInstructions] = useState<string>("Selecciona el año");

  useEffect(() => {
    if (selectedYear && !selectedMonth) {
      setInstructions("Ahora selecciona el mes");
      setDayOptions([]); // Resetear días si cambian el año
    } else if (selectedYear && selectedMonth) {
      setInstructions("Finalmente selecciona el día");
      setDayOptions(getDayOptions(selectedMonth, selectedYear));
    } else {
      setInstructions("Selecciona el año");
    }
  }, [selectedMonth, selectedYear]);

  const handleYearChange = (value: string) => {
    setSelectedYear(Number(value));
    setSelectedMonth(null); // Resetear mes al cambiar año
  };

  const handleMonthChange = (value: string) => {
    setSelectedMonth(Number(value));
  };

  return (
    <div className="space-y-2">
      {/* Instrucciones */}
      <p className="text-sm text-muted-foreground">{instructions}</p>
      
      <div className="grid grid-cols-3 gap-2">
        {/* Año - siempre habilitado */}
        <div className="flex flex-col">
          <Label htmlFor="year" className="mb-1">Año</Label>
          <CustomSelect
            placeholder="Año"
            options={yearOptions}
            onChange={handleYearChange}
            value={selectedYear?.toString()}
          />
        </div>

        {/* Mes - habilitado solo cuando hay año seleccionado */}
        <div className="flex flex-col">
          <Label htmlFor="month" className="mb-1">Mes</Label>
          <CustomSelect
            placeholder="Mes"
            options={monthOptions}
            onChange={handleMonthChange}
            disabled={!selectedYear}
            value={selectedMonth?.toString()}
          />
        </div>

        {/* Día - habilitado solo cuando hay mes y año seleccionados */}
        <div className="flex flex-col">
          <Label htmlFor="day" className="mb-1">Día</Label>
          <CustomSelect
            placeholder="Día"
            options={dayOptions}
            onChange={(value) => console.log("Día seleccionado:", value)}
            disabled={!selectedMonth || !selectedYear}
          />
        </div>
      </div>
    </div>
  );
}