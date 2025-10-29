import { z } from 'zod';

const DEFAULT_ERROR_MESSAGE = 'Este es un campo requerido.';
const AGE_ERROR_MESSAGE = 'Ingrese una edad válida (mínimo 1).';

export const registerVacancy = z.object({
  name: z.string().min(1, DEFAULT_ERROR_MESSAGE),

  sector: z.enum([
    'Ingeniería en Sistemas Computacionales', 
    'Ingeniería en Software', 
    'Ingeniería Industrial', 
    'Arquitectura',
    'Administración',
    'Diseño Gráfico',
    'Mercadotecnia',
    'Psicología',
    'Derecho',
    'Ciencias de la Comunicación'
], { 
    // Mensaje para cuando es null o undefined
    required_error: DEFAULT_ERROR_MESSAGE, 
})
.refine(value => value !== undefined, DEFAULT_ERROR_MESSAGE),

  modality: z.enum(['Presencial', 'Remoto', 'Híbrido'], { required_error: DEFAULT_ERROR_MESSAGE }),

  location: z.string().min(1, DEFAULT_ERROR_MESSAGE),

  numberOpenings: z.string()
    .min(1, DEFAULT_ERROR_MESSAGE)
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    }, {
      message: 'Ingrese un número válido mayor a 0.',
    }),

  description: z.string().min(1, DEFAULT_ERROR_MESSAGE),  

  experience: z.string().min(1, DEFAULT_ERROR_MESSAGE),

  gender: z.string().min(1, DEFAULT_ERROR_MESSAGE),

  ageRange: z.string().optional(), // This field is not used in the form, but kept for consistency

  minAge: z.string().optional().refine((val) => {
    if (!val) return true;
    return !isNaN(Number(val)) && Number(val) > 0;
  }, {
    message: 'Ingrese una edad válida.',
  }),

  maxAge: z.string().optional().refine((val) => {
    if (!val) return true;
    return !isNaN(Number(val)) && Number(val) > 0;
  }, {
    message: 'Ingrese una edad válida.',
  }),

  requiredDegree: z.enum([
    'INDIFERENTE', 
    'TECNICA', 
    'LICENCIATURA', 
    'INGENIERIA',
    'MAESTRIA',
    'DOCTORADO'
], { 
    // Mensaje para cuando es null o undefined
    required_error: DEFAULT_ERROR_MESSAGE, 
})
.refine(value => value !== undefined, DEFAULT_ERROR_MESSAGE)
    ,

  salaryRange: z.string().optional(), // This field is not used in the form, but kept for consistency

  currency: z.enum(['mxn', 'usd'], { required_error: DEFAULT_ERROR_MESSAGE }),

  minSalary: z.string()
    .min(1, DEFAULT_ERROR_MESSAGE)
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Ingrese un salario válido mayor a 0.',
    }),

  maxSalary: z.string()
    .min(1, DEFAULT_ERROR_MESSAGE)
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Ingrese un salario válido mayor a 0.',
    }),

  benefits: z.string().min(1, DEFAULT_ERROR_MESSAGE),

  workingDays: z.array(z.string().min(1, DEFAULT_ERROR_MESSAGE)).min(1, 'Agrega al menos un día de trabajo'),
  
  workShift: z.enum(
    ['Tiempo completo', 'Medio tiempo', 'Pago por hora', 'Horario flexible'],
    { required_error: DEFAULT_ERROR_MESSAGE, 
})
.refine(value => value !== undefined, DEFAULT_ERROR_MESSAGE),

  workSchedule: z.string().optional(), // This field is not used in the form, but kept for consistency

  workHourStart: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:mm)"),

  workHourEnd: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:mm)"),
  
  additionalInformation: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  


}).superRefine((values, ctx) => {

  const minSalary = Number(values.minSalary);
  const maxSalary = Number(values.maxSalary);
  if (!isNaN(minSalary) && !isNaN(maxSalary) && minSalary >= maxSalary) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El salario mínimo debe ser menor que el salario máximo.',
      path: ['minSalary'],
    });
  }

  if (values.minAge && values.maxAge) {
    const minAge = Number(values.minAge);
    const maxAge = Number(values.maxAge);
    if (!isNaN(minAge) && !isNaN(maxAge) && minAge >= maxAge) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La edad mínima debe ser menor que la edad máxima.',
        path: ['minAge'],
      });
    }
  }

  if (values.workShift === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Debe seleccionar un horario de trabajo.',
      path: ['workShift'],
    });
  }

  const SalaryRangeFinal = values.minSalary && values.maxSalary
    ? `${values.minSalary} - ${values.maxSalary} ${values.currency.toUpperCase()}`
    : '';
  if (SalaryRangeFinal && !/^\d+ - \d+ (MXN|USD)$/.test(SalaryRangeFinal)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El rango salarial debe tener el formato "min - max MONEDA".',
      path: ['currency'],
    });
  }
  values.salaryRange = SalaryRangeFinal;

  const ageRangeFinal = values.minAge && values.maxAge
    ? `${values.minAge} - ${values.maxAge} años`
    : '';
  if (ageRangeFinal && !/^\d+ - \d+ años$/.test(ageRangeFinal)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El rango de edad debe tener el formato "min - max años".',
      path: ['minAge', 'maxAge'],
    });
  }
  values.ageRange = ageRangeFinal;
});
export type VacancyFormType = z.infer<typeof registerVacancy>;