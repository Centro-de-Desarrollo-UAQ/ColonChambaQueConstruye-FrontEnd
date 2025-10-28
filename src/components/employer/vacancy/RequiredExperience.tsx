'use client';

import { Control } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormExperienceList from '@/components/forms/FormExperienceList';
import FormInput from '@/components/forms/FormInput';

type RequiredSkillsProps = {
    control: Control<VacancyFormType>;
}

export default function RequiredExperience({ control }: RequiredSkillsProps) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Experiencia Requerida"
                className='text-uaq-terniary font-normal'
            />
            <div className="space-y-4">
                <FormInput
                    control={control}
                    label='Habilidades'
                    name='experience'
                    type='textarea'
                    maxChars={7000}
                    description='Describe las habilidades esenciales e indica el tiempo de experiencia requerido'
                    className='flex-1'
                />
            </div>
        </section>
    );
}