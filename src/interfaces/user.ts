import { dateSameDay } from '../validations/filtersTanStack';
'use client';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    //creadetAt: string;
    academicLevel: string;
    careerSummary?: string;
}


export interface CompanyUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cellPhone: string;
  jobExperience: string;
  curriculumURL?: string;
  academicLevel: string;
  dateFilter: string;
}

export interface Curriculum {
  id: string;
  createdAt: string;
  title: string;
  previewUrl: string | undefined;
  curriculumUrl: string | undefined;
  UserId: string;
}
