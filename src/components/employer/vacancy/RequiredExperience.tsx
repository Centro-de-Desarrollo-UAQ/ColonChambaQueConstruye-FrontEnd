'use client';

import { Control } from 'react-hook-form';
import FormSectionHeader from './FormSectionHeader';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormExperienceList from '@/components/forms/FormExperienceList';

type RequiredSkillsProps = {
    control: Control<VacancyFormType>;
}

export default function RequiredSkills({ control }: RequiredSkillsProps) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Experiencia Requerida"
                description="Años de experiencia necesarias en conocimientos y habilidades particulares."
            />
            <div className="space-y-4">
                <FormExperienceList
                    control={control}
                    name="requiredSkills"
                    availableSkills={[]} 
                />
            </div>
        </section>
    );
}