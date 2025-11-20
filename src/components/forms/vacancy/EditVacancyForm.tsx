'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerVacancy, VacancyFormType } from '@/validations/registerVacancy';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import JobConditionsSection from './JobConditionsSection';
import InterestAreasSelector from './AdditionalInformation';
import GeneralInfoSection from './GeneralInfoSection';
import BenefitsSection from './BenefitsSection';
import VacancyInfoSection from './VacancyInfoSection';
import RequiredExperience from './RequiredExperience';
import { Vacancy } from '@/interfaces/vacancy';
import { VacancyU } from '@/interfaces/vacancyUpdate';


export default function EditVacancyForm({ vacancy }: { vacancy: VacancyU }) {
    const methods = useForm<VacancyFormType>({
        resolver: zodResolver(registerVacancy),
        defaultValues: {
            name: vacancy.name,
            sector: vacancy.businessSector,
            modality: vacancy.modality,
            location: vacancy.location,
            numberOpenings: vacancy.numberOpenings.toString(), 
            description: vacancy.description,
            experience: vacancy.experience,
            gender: vacancy.gender,
            ageRange: '',
            minAge: vacancy.ageRange[0].toString(),
            maxAge: vacancy.ageRange[1].toString(),
            requiredDegree: vacancy.requiredDegree,
            salaryRange: '',
            minSalary: vacancy.salary.min.toString(),
            maxSalary: vacancy.salary.max.toString(),
            currency: "mxn",
            benefits: vacancy.benefits,
            workingDays: vacancy.workingDay,
            workShift: vacancy.workShift,
            workSchedule: vacancy.workSchedule[0] + ' - ' + vacancy.workSchedule[1],
            workHourStart: vacancy.workSchedule[0],
            workHourEnd: vacancy.workSchedule[1],
            additionalInformation: vacancy.additionalInformation,
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
                <h2 className="text-4xl font-bold text-center text-[var(--secundary)]">Editar vacante</h2>
                <p className="text-center text-xl mb-6 w-[578px] justify-self-center pb-5">
                    Edita la información de la oferta de trabajo
                </p>

                <GeneralInfoSection control={control} />
                <RequiredExperience control={control} />
                <VacancyInfoSection control={control} />
                <BenefitsSection control={control} />
                <JobConditionsSection control={control} />
                <InterestAreasSelector control={control} />
                

                <div className="flex justify-end">
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>Registrar</Button>
                </div>
            </form>
        </FormProvider>
    );
}