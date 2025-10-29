type Day = { label: string; value: string };

export const daysMap: Day[] = [
  { label: 'L', value: 'Monday' },
  { label: 'M', value: 'Tuesday' },
  { label: 'M', value: 'Wednesday' },
  { label: 'J', value: 'Thursday' },
  { label: 'V', value: 'Friday' },
  { label: 'S', value: 'Saturday' },
  { label: 'D', value: 'Sunday' },
];

export const listYearsOptionsConstants = [
  { label: 'Sin experiencia', value: '0 years' },
  { label: 'Menos de un año', value: '-1 years' },
  { label: '1 año', value: '1 year' },
  { label: '2 años', value: '2 years' },
  { label: '3 años', value: '3 years' },
  { label: 'Mas de 3 años', value: '+3 years' }
];

export const listAreasOptionsConstants = [
  { label: 'Ingeniería en Sistemas Computacionales', value: 'Ingeniería en Sistemas Computacionales' },
  { label: 'Ingeniería en Software', value: 'Ingeniería en Software' },
  { label: 'Ingeniería Industrial', value: 'Ingeniería Industrial' },
  { label: 'Arquitectura', value: 'Arquitectura' },
  { label: 'Administración', value: 'Administración' },
  { label: 'Diseño Gráfico', value: 'Diseño Gráfico' },
  { label: 'Mercadotecnia', value: 'Mercadotecnia' },
  { label: 'Psicología', value: 'Psicología' },
  { label: 'Derecho', value: 'Derecho' },
  { label: 'Ciencias de la Comunicación', value: 'Ciencias de la Comunicación' },
];

export const listDegreesOptionsConstants = [
  { label: 'Indiferente', value: 'INDIFERENTE' },
  { label: 'Técnica', value: 'TECNICA' },
  { label: 'Licenciatura', value: 'LICENCIATURA' },
  { label: 'Ingeniería', value: 'INGENIERIA' },
  { label: 'Maestría', value: 'MAESTRIA' },
  { label: 'Doctorado', value: 'DOCTORADO' },
];

export const listWorkingHoursOptionsConstants = [
  { value: 'Tiempo completo', label: 'Tiempo completo' },
  { value: 'Medio tiempo', label: 'Medio tiempo' },
  { value: 'Pago por hora', label: 'Pago por hora' },
  { value: 'Horario flexible', label: 'Horario flexible' }
]

export const listModalityOptionsConstants = [
  { value: 'Presencial', label: 'Presencial' },
  { value: 'Remoto', label: 'Remoto' },
  { value: 'Híbrido', label: 'Híbrido' },
]

export const listGenderOptionsConstants = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Femenino', label: 'Femenino' },
  { value: 'Otro', label: 'Otro' },
]