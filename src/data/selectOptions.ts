// Opciones para los selects
export const currencyOptions = [
  { value: 'mxn', label: 'MXN' },
  { value: 'usd', label: 'USD' },
];

export const ageOptions = [{ value: 'age', label: 'Edad' }];

export const phoneExtensions = [
  { value: '+52', label: 'MX (+52)' },
  { value: '+1', label: 'US (+1)' },
];
// Función para verificar si un año es bisiesto
export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Opciones de días (1-31), ajustadas según el mes y año
export const getDayOptions = (month: number, year: number) => {
  const daysInMonth = getDaysInMonth(month, year);
  return Array.from({ length: daysInMonth }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));
};

// Función que devuelve el número de días en un mes específico de un año
export function getDaysInMonth(month: number, year: number) {
  switch (month) {
    case 2: // Febrero
      return isLeapYear(year) ? 29 : 28;
    case 4: // Abril
    case 6: // Junio
    case 9: // Septiembre
    case 11: // Noviembre
      return 30;
    default: // Todos los demás meses
      return 31;
  }
}

// Opciones de meses
export const monthOptions = [
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

// Opciones de años (desde 1970 hasta año actual + 10 años)
export const yearOptions = Array.from(
  { length: new Date().getFullYear() + 10 - 1970 + 1 },
  (_, i) => ({
    label: `${1970 + i}`,
    value: `${1970 + i}`,
  }),
).reverse();

export const vacancyOptions = [
  { value: 'full-time', label: 'Tiempo completo (40+ hrs)' },
  { value: 'part-time', label: 'Medio tiempo (20-30 hrs)' },
  { value: 'freelance', label: 'Freelance/Proyectos' },
  { value: 'internship', label: 'Prácticas profesionales' },
  { value: 'flexible', label: 'Horario flexible' },
];
