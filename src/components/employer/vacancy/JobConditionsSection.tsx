'use client';
import { Control } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import FormSectionHeader from './FormSectionHeader';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormOptions from '@/components/forms/FormOptions';
import FormWeekSelector from '@/components/forms/FormWeekSelector';
import { listWorkingHoursOptionsConstants } from '@/constants';

type JobConditionsSectionProps = {
    control: Control<VacancyFormType>;
}

export default function JobConditionsSection({ control }: JobConditionsSectionProps) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Horario y Condiciones Laborales"
                description="Seleccione los días laborales, el horario y/o el tipo de turno de la vacante"
            />
            <div className="flex gap-4">
                <FormWeekSelector
                    name="workingDays"
                    control={control}
                    label='Dias laborales'
                    className='w-full' />
                <FormOptions
                    control={control}
                    label="Tipo de Jornada"
                    name="workingHours"
                    type="select"
                    className='w-full'
                    options={listWorkingHoursOptionsConstants} />
            </div>
        </section>
    );
}