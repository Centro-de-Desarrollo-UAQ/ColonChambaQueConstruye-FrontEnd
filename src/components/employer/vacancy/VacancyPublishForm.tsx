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
import InterestAreasSelector from './AdditionalInformation';
import RequiredSkills from './RequiredExperience';

export default function PostJobForm() {
    const methods = useForm<VacancyFormType>({
        resolver: zodResolver(registerVacancy),
        defaultValues: {
            name: '',
            sector: undefined,
            modality: 'Presencial',
            location: '',
            numberOpenings: '', 
            description: '',
            experience: '',
            gender: '',
            ageRange: '',
            minAge: '',
            maxAge: '',
            requiredDegree: undefined,
            salaryRange: '',
            minSalary: '',
            maxSalary: '',
            currency: "mxn",
            benefits: '',
            workingDays: [],
            workShift: undefined,
            workSchedule: '',
            workHourStart: '',
            workHourEnd: '',
            additionalInformation: '',
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
                className="mx-12 bg-white pt-12 space-y-4"
            >
                <h2 className="text-4xl font-bold text-center text-[var(--secundary)]">Publica una nueva vacante</h2>
                <p className="text-center text-xl mb-6 w-[578px] justify-self-center pb-5">
                    Completa la información de la oferta de trabajo u conéctate con los mejores talentos
                </p>

                <GeneralInfoSection control={control} />
                <RequiredSkills control={control} />
                <VacancyInfoSection control={control} />
                <BenefitsSection control={control} />
                <JobConditionsSection control={control} />
                <InterestAreasSelector control={control} />
                

                <div className="flex justify-end">
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>Publicar</Button>
                </div>
            </form>
        </FormProvider>
    );
}