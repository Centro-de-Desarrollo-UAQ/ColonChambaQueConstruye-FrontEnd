import { z } from 'zod';
const DEFAULT_ERROR_MESSAGE = 'Este es un campo requerido.';

export const employerSchema = z
  .object({
    employerName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    employerLastName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    positionWithinTheCompany: z.string().min(1, DEFAULT_ERROR_MESSAGE),

    
    employerEmail: z.string().email('Correo del empleador inválido.'),

    employerMobilePhone: z.object({
      code: z.string().min(1, 'Selecciona una lada'),
      number: z.string().regex(/^\d+$/, 'Ingrese solo números').min(10, 'Número inválido'),
    }),
    employerLandlinePhone: z.object({
      code: z.string().min(1, 'Selecciona una lada'),
      number: z.string().regex(/^\d+$/, 'Ingrese solo números').min(10, 'Número inválido'),
    }),

    accountPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.')
      .regex(/[A-Z]/, "Requiere mayúscula")
      .regex(/[a-z]/, "Requiere minúscula")
      .regex(/[0-9]/, "Requiere número"),
    accountPasswordConfirm: z.string().min(1, 'Confirma la contraseña.'),
  })
  .refine((data) => data.accountPassword === data.accountPasswordConfirm, {
    message: 'Las contraseñas no coinciden.',
    path: ['accountPasswordConfirm'],
  });

export type EmployerFormType = z.infer<typeof employerSchema>;
