export type Vacancy = {
    company: string;
    LogoUrl: string | URL;
    id: number;
    name: string;
    location: string;
    state: 'Activo' | 'EnRevisión' | 'Cerrado' | 'Rechazado';
    experience: {
        skill: string;
        time: string;
    }[];
    workingDay: string[];
    employeeBenefit: string;
    additionaSupport: string;
    requiredProfile: {
        skill: string;
        time: string;
    }[];
    ageRange: {
        min: number;
        max: number;
    };
    modality: string;
    salary: {
        min: number;
        max: number;
    };
    description: string;
    workShift: string;
    vacancyCareer: string[];
    industryCategory: string;
    gender: string;
    numberOpening: number;
    limitApply: number;
    accountId: string;
    companyId: string;
    linkerId: string;
    createdAt: string
    applications: number;
    requestedAt: string;
};