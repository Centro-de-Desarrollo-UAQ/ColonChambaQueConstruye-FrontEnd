import { Industry } from "./industries";

export interface ApplicantCompanyCardProps {
  title: string;
  description: string;
  logoUrl?: string;
  correo:string
  contact:string
  company?:string
  industry?:Industry
  registerDate?:string
  
}


