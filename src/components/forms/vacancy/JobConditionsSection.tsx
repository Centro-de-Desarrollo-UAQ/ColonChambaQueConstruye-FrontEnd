'use client';
import { Control } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import FormSectionHeader from './FormSectionHeader';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormOptions from '@/components/forms/FormOptions';
import FormWeekSelector from '@/components/forms/FormWeekSelector';
import { listWorkingHoursOptionsConstants } from '@/constants';
import FormSchedule from '@/components/forms/formSchedule';

type Props = {
    control: Control<VacancyFormType>;
};

export default function JobConditionsSection({ control }: Props) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Horario y condiciones laborales"
                className='text-uaq-terniary font-normal'
            />
            <div className="flex gap-4">
                <FormWeekSelector
                    name="workingDays"
                    control={control}
                    label='Dias laborales'
                    className='w-full'
                    description='Seleccione los días laborales de la vacante' />
                <FormOptions
                    control={control}
                    label="Tipo de Jornada"
                    name="workShift"
                    type="select"
                    className='w-full'
                    options={listWorkingHoursOptionsConstants} 
                    description='Seleccione el tipo de jornada laboral de la vacante'/>
            </div>
                <FormSchedule
                    control={control}
                    name="workSchedule"
                    minHourName="workHourStart"
                    maxHourName="workHourEnd"
                    label="Horario"
                    
                    description="Anote el horario de trabajo."
                    className='w-[50%]'
                />

        </section>
    );
}