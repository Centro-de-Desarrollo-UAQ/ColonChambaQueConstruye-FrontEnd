'use client';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    cellPhone?: string;
    phoneNumber?: string;
    photoURL?: string;
    jobExperience?: string;
    careerSummary?: string;
    academicLevel?: string;
    registeredAt?: string;
    status?: string;
}