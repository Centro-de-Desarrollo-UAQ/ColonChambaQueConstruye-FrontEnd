import { z } from 'zod';
const DEFAULT_ERROR_MESSAGE = 'Este es un campo requerido.';

export const employerSchema = z
  .object({
    companyName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyEmail: z.string().email('Correo electrónico inválido.'),
    companyDescription: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddress: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressState: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressZip: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressCountry: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyRFC: z
      .string()
      .min(12, 'RFC inválido.')
      .toUpperCase()
      .regex(/^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/,
        'RFC inválido.'),
    companyRazonSocial: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companySector: z.string(),
    employerName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    employerLastName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    employerEmail: z.string().email('Correo del empleador inválido.'),
    employerPhone: z.object({
      code: z.string().min(1, "Selecciona una lada"),
      number: z
        .string()
        .regex(/^\d+$/, "Ingrese solo números")
        .min(10, "Número inválido")
    }),
    accountPassword: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres.')
      .regex(/(?:(?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/,
        'La contraseña debe tener una letra mayúscula, una minúscula y un número.'),
    accountPasswordConfirm: z.string().min(1, 'Confirma la contraseña.'),
    image: z.string().nullable(),
  })
  .refine((data) => data.accountPassword === data.accountPasswordConfirm, {
    message: 'Las contraseñas no coinciden.',
    path: ['accountPasswordConfirm'],
  });

export type EmployerFormType = z.infer<typeof employerSchema>;
