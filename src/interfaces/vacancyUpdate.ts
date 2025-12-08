import { create } from 'zustand';
export type VacancyStatus =
  | 'REVISION'
  | 'RECHAZADA'
  | 'APROBADA'
  | 'ABIERTA'
  | 'CERRADA'
  | 'INACTIVA';

export type Modality = 'PRESENCIAL' | 'REMOTO' | 'HIBRIDO';

export type Gender = 'MASCULINO' | 'FEMENINO' | 'INDIFERENTE' | 'OTRO';

export type RequiredDegree =
  | 'INDIFERENTE'
  | 'TECNICA'
  | 'LICENCIATURA'
  | 'INGENIERIA'
  | 'MAESTRIA'
  | 'DOCTORADO';

export type WorkShift =
  | 'TIEMPO_COMPLETO'
  | 'MEDIO_TIEMPO'
  | 'HORARIO_FLEXIBLE'
  | 'PAGO_HORA';

export interface VacancyU {
    id: string;
  status: VacancyStatus;
  name: string;
  

  businessSector: string; // o un type si luego tienes enum para esto
  modality: Modality;

  location: string;
  numberOpenings: number;

  description: string;
  experience: string;

  gender: Gender;

  ageRange: [number, number]; // [min, max]

  requiredDegree: RequiredDegree;

  salary: {
    coin: string; // o 'MXN' | 'USD' si lo quieres más estricto
    min: number;
    max: number;
  };

  benefits: string;

  workingDay: string[]; // ["LUNES", "VIERNES"]
  workShift: WorkShift;

  workSchedule: [string, string]; // ["08:00", "17:00"]

  additionalInformation: string;
  comment: string; // comentario de revisión
  createdAt: string;
  modifiedAt: string;
  
}
