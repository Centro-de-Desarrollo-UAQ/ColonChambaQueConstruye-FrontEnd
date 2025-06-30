'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerVacancy, VacancyFormType } from '@/validations/registerVacancy';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import GeneralInfoSection from './GeneralInfoSection';
import VacancInfoSection from './VacancyInfoSection';
import BenefitsSection from './BenefitsSection';
import DescriptionSection from './DescriptionSection';
import JobConditionsSection from './JobConditionsSection';
import InterestAreasSelector from './InterestAreasSelector';
import RequiredSkills from './RequiredExperience';

export default function PostJobForm() {

    const [visibleBadges, setVisibleBadges] = useState({
        outlineClosable: true,
        defaultClosable: true,
        secondaryClosable: true,
        destructiveClosable: true,
    });

    const methods = useForm<VacancyFormType>({
        resolver: zodResolver(registerVacancy),
        defaultValues: {
            name: '',
            modality: 'presencial',
            sector: '',
            location: '',
            numberVacancies: '',
            maxApplications: '',
            gender: 'Selecciona una opción',
            salaryRange: 'MXN',
            profile: '',
            minAge: '',
            maxAge: '',
            benefits: '',
            additionalBenefits: '',
            description: '',
            workingHours: 'Selecciona una opción',
            workingDays: '',
            areasOfInterest: [],
            requiredSkills: [],
        },
    });

    const { control, handleSubmit, watch, setValue, trigger } = methods;

    const onSubmit = (data: VacancyFormType) => {
        console.log('Formulario enviado:', data);
    };

    const handleClose = (badge: string) => {
        setVisibleBadges((prevState) => ({
            ...prevState,
            [badge]: false,
        }));
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
                <VacancInfoSection control={control} />
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