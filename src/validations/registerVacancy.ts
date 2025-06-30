import { z } from 'zod';

const DEFAULT_ERROR_MESSAGE = 'Este es un campo requerido.';

export const registerVacancy = z.object({
  name: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  modality: z.enum(['presencial', 'remoto', 'hibrido'], { required_error: DEFAULT_ERROR_MESSAGE }),
  sector: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  location: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  numberVacancies: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  maxApplications: z.string().optional(),
  gender: z.enum(['Selecciona una opción', 'masculino', 'femenino', 'otro']).optional(),
  ageRange: z.enum(['18-25', '26-35', '36-45', '46-55', '56+']).optional(),
  minAge: z.string().optional(),
  maxAge: z.string().optional(),
  salaryRange: z.enum(['USD', 'MXN'], { required_error: DEFAULT_ERROR_MESSAGE }),
  profile: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  benefits: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  additionalBenefits: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  description: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  workingHours: z.enum(['Selecciona una opción', 'Tiempo completo', 'Medio tiempo', 'Pago por hora', 'Horario Flexible'], 
                      { required_error: DEFAULT_ERROR_MESSAGE }),
  workingDays: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  areasOfInterest: z.array(z.never()).optional(),
  requiredSkills: z
  .array(
    z.object({
      skill: z.string().min(1, 'Selecciona una habilidad'),
      years: z.string().min(1, 'Selecciona los años'),
    })
  )
  .optional(),
});

export type VacancyFormType = z.infer<typeof registerVacancy>;
