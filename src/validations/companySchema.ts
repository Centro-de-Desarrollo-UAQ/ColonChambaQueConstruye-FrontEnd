import { z } from 'zod';
const DEFAULT_ERROR_MESSAGE = 'Este es un campo requerido.';

export const companySchema = z
  .object({
    companyName: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyEmail: z.string().email('Correo electrónico inválido.'),
    companySector: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyDescription: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyInvestmentCountry: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyEmlpoyeesNumber: z
        .string().min(1, DEFAULT_ERROR_MESSAGE)
        .regex(/^[0-9]+$/, 'Formato inválido'),
    companyRFC: z
      .string()
      .min(12, 'RFC inválido.')
      .toUpperCase()
      .regex(
        /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/,
        'RFC inválido.',
      ),
    companyRazonSocial: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressCountry: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressState: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressMunicipality: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressColonia: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressStreet: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressZip: z.string().min(1, DEFAULT_ERROR_MESSAGE),
    companyAddressNo: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  })

export type CompanyFormType = z.infer<typeof companySchema>;
