import { z } from 'zod';

const DEFAULT_ERROR_MESSAGE = 'Este campo es requerido';

export const applicantSchemaProfessionalInfo = z.object({


  // Información profesional requerida
  schooling: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  career: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  professionalSummary: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  position: z.string().min(1, DEFAULT_ERROR_MESSAGE),
  cvFile: z.instanceof(File).optional(),
  

  
});

export type ApplicantProfInfoFormType = z.infer<typeof applicantSchemaProfessionalInfo>;
