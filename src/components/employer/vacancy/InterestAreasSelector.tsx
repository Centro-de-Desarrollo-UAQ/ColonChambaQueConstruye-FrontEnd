'use client';

import { Control } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormComboBadgeSelector from '@/components/forms/FormComboBadgeSelector';
import { listAreasOptionsConstants } from '@/constants';
import { useState } from 'react';

type InterestAreasSelectorProps = {
    control: Control<VacancyFormType>;
}

export default function InterestAreasSelector({ control }: InterestAreasSelectorProps) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Áreas de Interés"
                description="Selecciona las carreras de la UAQ que preferentemente pueden postular a la vacante."
            />
            <div className="space-y-4">
                <FormComboBadgeSelector
                    control={control}
                    name="areasOfInterest"
                    label="Carreras afines"
                    options={listAreasOptionsConstants}
                />
            </div>
        </section>
    );
}