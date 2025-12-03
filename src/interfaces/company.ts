import { sector } from '../constants/companyData';
export type Company = {
  id: string;
  name: string;
  representative: string;
  emailContact: string;
  phoneContact: string;
  createdAt: string;
  status: 'REVISION' | 'APROBADA' | 'RECHAZADA';
  sector?: typeof sector[number];
};


// 1. La interfaz para el objeto de la empresa (Company)
export interface CompanyC {
  id: string;
  tradeName: string;
  legalName: string;
  zipCode: string; // Es mejor string para códigos postales (por si inician con 0)
  street: string;
  state: string;
  district: string;
  streetNumber: string;
  municipality: string;
  country: string;
  investmentCountry: string;
  totalWorkers: number;
  rfc: string;
  description: string;
  companyEmail: string;
  workSector: string; // Podría ser un Enum si tienes valores fijos
  registeredAt: string; // ISO Date string
  status: 'REVISION' | 'ACTIVA' | 'INACTIVA' | 'RECHAZADA'; // Podría ser un Enum ('ACTIVA', 'INACTIVA', etc.)
  comment: string | null;
  LinkerId: string | null; // Asumo string por el patrón de IDs, pero permite null
}

// 2. La interfaz para la cuenta de usuario asociada (CompanyAccount)
export interface CompanyAccount {
  id: string;
  firstName: string;
  lastName: string;
  cellPhone: string;
  landlinePhone: string;
  email: string;
  jobTitle: string;
}

// 3. La estructura del objeto "data"
export interface CompanyData {
  Company: CompanyC;
  CompanyAccount: CompanyAccount;
}
