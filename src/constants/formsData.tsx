type Day = { label: string; value: string };

export const daysMap: Day[] = [
  { label: 'L', value: 'LUNES' },
  { label: 'M', value: 'MARTES' },
  { label: 'M', value: 'MIERCOLES' },
  { label: 'J', value: 'JUEVES' },
  { label: 'V', value: 'VIERNES' },
  { label: 'S', value: 'SABADO' },
  { label: 'D', value: 'DOMINGO' },
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
  { label: 'Administrativo', value: 'ADMINISTRATIVO' },
  { label: 'Atención al Cliente', value: 'ATENCION_AL_CLIENTE' },
  { label: 'Ventas', value: 'VENTAS' },
  { label: 'Comercial', value: 'COMERCIAL' },
  { label: 'Marketing', value: 'MARKETING' },
  { label: 'Publicidad', value: 'PUBLICIDAD' },
  { label: 'Diseño', value: 'DISENO' },
  { label: 'Tecnología e Informática', value: 'TECNOLOGIA' },
  { label: 'Contabilidad', value: 'CONTABILIDAD' },
  { label: 'Finanzas', value: 'FINANZAS' },
  { label: 'Recursos Humanos', value: 'RECURSOS_HUMANOS' },
  { label: 'Legal (Derecho)', value: 'LEGAL' },
  { label: 'Operaciones', value: 'OPERACIONES' },
  { label: 'Logística', value: 'LOGISTICA' },
  { label: 'Almacén', value: 'ALMACEN' },
  { label: 'Producción', value: 'PRODUCCION' },
  { label: 'Manufactura', value: 'MANUFACTURA' },
  { label: 'Mantenimiento', value: 'MANTENIMIENTO' },
  { label: 'Construcción', value: 'CONSTRUCCION' },
  { label: 'Seguridad', value: 'SEGURIDAD' },
  { label: 'Limpieza', value: 'LIMPIEZA' },
  { label: 'Salud', value: 'SALUD' },
  { label: 'Educación', value: 'EDUCACION' },
  { label: 'Investigación', value: 'INVESTIGACION' },
  { label: 'Turismo', value: 'TURISMO' },
  { label: 'Hotelería', value: 'HOTELERIA' },
  { label: 'Gastronomía', value: 'GASTRONOMIA' },
  { label: 'Comunicación', value: 'COMUNICACION' },
  { label: 'Deportes', value: 'DEPORTES' },
  { label: 'Servicio Social', value: 'SERVICIO_SOCIAL' },
  { label: 'Otro', value: 'OTRO' },
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
  { value: 'TIEMPO_COMPLETO', label: 'Tiempo completo' },
  { value: 'MEDIO_TIEMPO', label: 'Medio tiempo' },
  { value: 'PAGO_HORA', label: 'Pago por hora' },
  { value: 'HORARIO_FLEXIBLE', label: 'Horario flexible' }
]

export const listModalityOptionsConstants = [
  { value: 'PRESENCIAL', label: 'Presencial' },
  { value: 'REMOTO', label: 'Remoto' },
  { value: 'HIBRIDO', label: 'Híbrido' },
]

export const listGenderOptionsConstants = [
  { value: 'MASCULINO', label: 'Masculino' },
  { value: 'FEMENINO', label: 'Femenino' },
  { value: 'INDIFERENTE', label: 'Indiferente' },
  { value: 'OTRO', label: 'Otro' },
]