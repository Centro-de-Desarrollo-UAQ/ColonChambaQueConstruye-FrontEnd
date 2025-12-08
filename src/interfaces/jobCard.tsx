import { VacancyStatus } from "./vacancy";


export interface JobCardProps {
  id: string;
  status: VacancyStatus
  title: string;
  company: string;
  location: string;
  description: string;
  salaryRange: string;
  schedule: string;
  modality: string;
  logoUrl?: string;
  information?: string;
  createdAt: string;
  sector: string;
  numberOfPositions: number;
  BenefitsSection: string
  degree: string;
  AdditionalInformation?: string;
  gender: string;
  ageRange: {
    min: number;
    max: number;
  }
  RequiredExperience?: string
  cellPhone: string;
  email:string
  
}
