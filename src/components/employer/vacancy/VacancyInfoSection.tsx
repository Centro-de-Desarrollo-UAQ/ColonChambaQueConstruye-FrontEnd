'use client';

import { Control } from 'react-hook-form';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormInput from '@/components/forms/FormInput';
import FormOptions from '@/components/forms/FormOptions';
import FormSectionHeader from './FormSectionHeader';
import FormAge from '@/components/forms/FormAge';
import FormSalaryRange from '@/components/forms/FormRangeSalary';
import { listDegreesOptionsConstants, listGenderOptionsConstants } from '@/constants';

type Props = {
    control: Control<VacancyFormType>;
};

export default function VacancyInfoSection({ control }: Props) {
    return (
        <section className="space-y-4">
            <FormSectionHeader
                title="Detalles del puesto"
                className='text-uaq-terniary font-normal'
            />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6 items-start content-start auto-rows-auto">
                <FormOptions
                    control={control}
                    label="Género preferente"
                    name="gender"
                    type="select"
                    description='Indica el género preferente para el puesto'
                    className='col-span-2'
                    options={listGenderOptionsConstants}
                />
                <FormAge
                    control={control}
                    name="ageRange"
                    minAgeName="minAge"
                    maxAgeName="maxAge"
                    label="Rango de edad"
                    description="Menciona la edad mínima y máxima aceptada para postularse."
                    className='col-span-1 justify-self-end'
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-x-3 gap-y-6 items-start content-start auto-rows-auto">
                <FormOptions
                    control={control}
                    label="Escolaridad requerida"
                    name="requiredDegree"
                    type="select"
                    description='Indica el nivel mínimo de estudios que debe tener el candidato'
                    className='col-span-3'
                    options={listDegreesOptionsConstants}
                />
                <FormSalaryRange
                    control={control}
                    name='currency'
                    currencyName="currency"
                    minSalaryName="minSalary"
                    maxSalaryName="maxSalary"
                    label="Salario mensual ofrecido"
                    description="Rango salarial."
                    className='col-span-2 justify-self-end'
                />
            </div>
            
            

        </section>
    );
}
