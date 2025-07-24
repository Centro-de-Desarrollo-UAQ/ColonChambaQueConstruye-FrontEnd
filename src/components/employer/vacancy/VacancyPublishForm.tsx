'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerVacancy, VacancyFormType } from '@/validations/registerVacancy';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import GeneralInfoSection from './GeneralInfoSection';
import VacancyInfoSection from './VacancyInfoSection';
import BenefitsSection from './BenefitsSection';
import DescriptionSection from './DescriptionSection';
import JobConditionsSection from './JobConditionsSection';
import InterestAreasSelector from './InterestAreasSelector';
import RequiredSkills from './RequiredExperience';

export default function PostJobForm() {
    const methods = useForm<VacancyFormType>({
        resolver: zodResolver(registerVacancy),
        defaultValues: {
            name: '',
            modality: 'Presencial',
            sector: '',
            location: '',
            numberVacancies: "",
            maxApplications: "",
            description: '',
            gender: 'Selecciona una opción',
            ageRange: '',
            minAge: '',
            maxAge: '',
            profile: '',
            benefits: '',
            additionalBenefits: '',
            minSalary: '',
            maxSalary: '',
            currency: "mxn",
            workingHours: 'Selecciona una opción',
            workingDays: [],
            areasOfInterest: [],
            requiredSkills: []
        },
    });

    // Uncomment the following lines to log form errors
    // This can help in debugging validation issues
    
    // const { formState } = methods;
    // useEffect(() => {
    //     console.log('Errores:', formState.errors);
    // }, [formState.errors]);

    const { control, handleSubmit } = methods;
    const [submittedData, setSubmittedData] = useState<VacancyFormType | null>(null);

    const onSubmit = (data: VacancyFormType) => {
        setSubmittedData(data);
        console.log('Formulario enviado:', data);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto bg-white p-8 space-y-4"
            >
                <h2 className="text-3xl font-bold text-center">Publica una nueva vacante</h2>
                <p className="text-center text-sm leading-5 mb-6">
                    Completa la información de la oferta de trabajo y conéctate con los mejores talentos.
                </p>

                <GeneralInfoSection control={control} />
                <VacancyInfoSection control={control} />
                <BenefitsSection control={control} />
                <DescriptionSection control={control} />
                <JobConditionsSection control={control} />
                <InterestAreasSelector control={control} />
                <RequiredSkills control={control} />

                <div className="flex justify-end">
                    <Button type="submit">Publicar</Button>
                </div>
            </form>
        </FormProvider>
    );
}