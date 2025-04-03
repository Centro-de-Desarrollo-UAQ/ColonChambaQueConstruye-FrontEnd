"use client"

import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select"
import InputBirthDate from '@/components/inputBirthDate';

// Generamos opciones de años desde 1970 hasta año actual + 10
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  const endYear = currentYear + 10;
  const years = [];
  
  for (let year = startYear; year <= endYear; year++) {
    years.push({
      label: `${year}`,
      value: `${year}`
    });
  }
  
  return years.reverse(); // Orden descendente (más recientes primero)
};

const yearOptions = generateYearOptions();

const ScrollableSelect = ({
  options,
  placeholder = "Select...",
  value,
  onChange,
  maxHeight = "250px",
  className,
}: {
  options: { value: string; label: string }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  maxHeight?: string;
  className?: string;
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent style={{ maxHeight }} className="overflow-y-auto">
        <SelectScrollUpButton />
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
};

const Page = () => {
  const [selectedYear, setSelectedYear] = React.useState<string>();

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Selector de Años</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Año de fabricación</label>
          <ScrollableSelect
            options={yearOptions}
            placeholder="Selecciona un año"
            value={selectedYear}
            onChange={setSelectedYear}
            maxHeight="300px"
            className="w-full"
          />
              <InputBirthDate/>

        </div>

        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm">
            {selectedYear 
              ? `Has seleccionado el año: ${selectedYear}` 
              : "No se ha seleccionado ningún año"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;