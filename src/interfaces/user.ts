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