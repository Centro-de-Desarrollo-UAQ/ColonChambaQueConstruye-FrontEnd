import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
      .max(100, { message: 'El nombre no puede exceder los 100 caracteres' })
      .trim(),

    lastname: z
      .string()
      .min(2, { message: 'El apellido debe tener al menos 2 caracteres' })
      .max(100, { message: 'El apellido no puede exceder los 100 caracteres' })
      .trim(),

    email: z
      .string()
      .min(1, { message: 'El correo electrónico es requerido' })
      .email({ message: 'Debe ser un correo electrónico válido' })
      .max(244, { message: 'El correo no puede exceder los 244 caracteres' })
      .trim(),

    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .max(50, { message: 'La contraseña no puede exceder los 50 caracteres' })
      .regex(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' })
      .regex(/[a-z]/, { message: 'Debe contener al menos una letra minúscula' })
      .regex(/[0-9]/, { message: 'Debe contener al menos un número' })
      .regex(/[^A-Za-z0-9]/, { message: 'Debe contener al menos un carácter especial' })
      .trim(),

    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type SignupFormType = z.infer<typeof signupSchema>;
