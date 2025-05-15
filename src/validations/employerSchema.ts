import { z } from "zod";
const DEFAULT_ERROR_MESSAGE = "Este es un campo requerido.";

export const employerSchema = z.object({
  companyName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  companyEmail: z.string().email("Correo electrónico inválido."),
  companyDescription: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  companyAddress: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  companyAddressState: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  companyAddressZip: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  companyAddressCountry: z.string().min(1),
  companyRFC: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  companyRazonSocial: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  companySector: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  employerName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  employerLastName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  employerEmail: z.string().email("Correo del empleador inválido."),
  employerPhone: z.string().min(1),
  employerPhoneCode: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  accountPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  accountPasswordConfirm: z.string().min(1, "Confirma la contraseña."),
  accountTerms: z.boolean({
    required_error: "Debes aceptar las condiciones legales.",
  }),
  image: z.string().nullable(),
}).refine((data) => data.accountPassword === data.accountPasswordConfirm, {
  message: "Las contraseñas no coinciden.",
  path: ["accountPasswordConfirm"],
});

export type EmployerFormType = z.infer<typeof employerSchema>;