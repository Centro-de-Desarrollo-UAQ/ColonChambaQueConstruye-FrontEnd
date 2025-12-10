import { z } from 'zod';

export const recoverySchema = z
  .object({
    email: z
      .string()
      .min(1, 'El correo es obligatorio')
      .max(244, 'El correo es demasiado largo')
      .email('Ingresa un correo válido'),

    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.')
      .regex(/[A-Z]/, "Requiere mayúscula")
      .regex(/[a-z]/, "Requiere minúscula")
      .regex(/[0-9]/, "Requiere número")
      .optional()
      .or(z.literal('')), 
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword) return true;
      return data.password === data.confirmPassword;
    },
    {
      path: ['confirmPassword'],
      message: 'Las contraseñas no coinciden',
    }
  );

export type RecoveryFormType = z.infer<typeof recoverySchema>;