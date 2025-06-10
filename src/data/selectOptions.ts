// types/selectOptions.ts
export interface SelectOption {
  value: string;
  label: string;
}

// Función para verificar si un año es bisiesto
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Función que devuelve el número de días en un mes específico de un año
export function getDaysInMonth(month: number, year: number): number {
  switch (month) {
    case 2: // Febrero
      return isLeapYear(year) ? 29 : 28;
    case 4: case 6: case 9: case 11: // Abril, Junio, Septiembre, Noviembre
      return 30;
    default: // Todos los demás meses
      return 31;
  }
}

// Opciones de días (1-31), ajustadas según el mes y año
export function getDayOptions(month: number, year: number): SelectOption[] {
  const daysInMonth = getDaysInMonth(month, year);
  return Array.from({ length: daysInMonth }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));
}

// Opciones de meses (valor numérico como string)
export const monthOptions: SelectOption[] = [
  { label: 'Enero', value: '1' },
  { label: 'Febrero', value: '2' },
  { label: 'Marzo', value: '3' },
  { label: 'Abril', value: '4' },
  { label: 'Mayo', value: '5' },
  { label: 'Junio', value: '6' },
  { label: 'Julio', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Septiembre', value: '9' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12' },
];

// Opciones de años (valor numérico como string)
export function getYearOptions(startYear = 1970, yearsToAdd = 10): SelectOption[] {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear + yearsToAdd - startYear + 1 },
    (_, i) => ({
      label: (startYear + i).toString(),
      value: (startYear + i).toString(),
    })
  ).reverse();
}

export const yearOptions = getYearOptions();

// Otras opciones
export const currencyOptions: SelectOption[] = [
  { value: 'mxn', label: 'MXN' },
  { value: 'usd', label: 'USD' },
];

export const vacancyOptions = [
  { value: 'full-time', label: 'Tiempo completo (40+ hrs)' },
  { value: 'part-time', label: 'Medio tiempo (20-30 hrs)' },
  { value: 'freelance', label: 'Freelance/Proyectos' },
  { value: 'internship', label: 'Prácticas profesionales' },
  { value: 'flexible', label: 'Horario flexible' },
];
