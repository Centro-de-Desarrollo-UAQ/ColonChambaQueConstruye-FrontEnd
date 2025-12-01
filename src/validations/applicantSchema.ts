import { z } from 'zod';

const DEFAULT_ERROR_MESSAGE = 'Este campo es requerido';

export const applicantSchema = z.object({
  // Paso 1
  name: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  lastName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  address: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  birthDate: z
    .string()
    .min(1, DEFAULT_ERROR_MESSAGE)
    .refine((date) => !isNaN(Date.parse(date)), 'Fecha inválida'),
  email: z.string().email('Correo inválido'),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Requiere mayúscula')
    .regex(/[a-z]/, 'Requiere minúscula')
    .regex(/[0-9]/, 'Requiere número'),
  confirmPassword:z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Requiere mayúscula')
    .regex(/[a-z]/, 'Requiere minúscula')
    .regex(/[0-9]/, 'Requiere número'),

  // Paso 2
  career: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  professionalSummary: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  jobLocationPreference: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  preferredHours: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  employmentMode: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  telefono: z.object({
      code: z.string().min(1, 'Selecciona una LADA'),
      number: z
        .string()
        .regex(/^\d{10}$/, 'El número debe tener exactamente 10 dígitos'),
    }),
  // Paso 3
  profilePhoto: z.instanceof(File).optional().nullable(),
  cvFile: z.instanceof(File).optional(),
 
  


})
.refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], 
    message: 'Las contraseñas no coinciden',
  });

export type ApplicantFormType = z.infer<typeof applicantSchema>;
