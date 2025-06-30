'use client';

import { Control } from 'react-hook-form';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormInput from '@/components/forms/FormInput';
import FormOptions from '@/components/forms/FormOptions';
import FormSectionHeader from './FormSectionHeader';
import FormAge from '@/components/forms/FormAge';
import FormSalaryRange from '@/components/forms/FormRangeSalary';

type Props = {
    control: Control<VacancyFormType>;
};

export default function VacancInfoSection({ control }: Props) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Detalles del puesto"
                description="Informacion referente al puesto."
            />

            <div className="flex gap-4">
                <FormOptions
                    control={control}
                    label="Género preferente"
                    name="gender"
                    optional={true}
                    type="select"
                    description='Indique si es requerido la preferencia.'
                    className='w-full'
                    options={[
                        { value: 'Selecciona una opción', label: 'Selecciona una opción' },
                        { value: 'masculino', label: 'Masculino' },
                        { value: 'femenino', label: 'Femenino' },
                        { value: 'otro', label: 'Otro' },
                    ]}
                />
                <FormAge
                    control={control}
                    name="ageRange"
                    minAgeName="minAge"
                    maxAgeName="maxAge"
                    label="Rango de edad"
                    description="Edad preferente."
                    optional={true}
                    className='w-full'
                />
            </div>
            <FormSalaryRange
                control={control}
                name='salaryRange'
                currencyName="currency"
                minSalaryName="minSalary"
                maxSalaryName="maxSalary"
                label="Salario mensual ofrecido"
                description="Rango salarial."
            />
            <FormInput
                control={control}
                label="Perfil requerido"
                name="profile"
                type="textarea"
                description="Habilidades clave para el puesto (ejemplo: manejo de Excel, liderazgo)."
                maxChars={500}
            />

        </section>
    );
}
