'use client';
import { Control } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import FormSectionHeader from './FormSectionHeader';
import { VacancyFormType } from '@/validations/registerVacancy';

type DescriptionSectionProps = {
    control: Control<VacancyFormType>;
}

export default function DescriptionSection({ control }: DescriptionSectionProps) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Descripción"
                description="Describa las responsabilidades principales del puesto."
            />
            <FormInput
                control={control}
                label="Descripción"
                name="description"
                type="textarea"
                maxChars={1200}
            />
        </section>
    );
}