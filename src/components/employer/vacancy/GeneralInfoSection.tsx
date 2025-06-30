'use client';

import { Control } from 'react-hook-form';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormInput from '@/components/forms/FormInput';
import FormOptions from '@/components/forms/FormOptions';
import FormSectionHeader from './FormSectionHeader';

type Props = {
  control: Control<VacancyFormType>;
};

export default function GeneralInfoSection({ control }: Props) {
  return (
    <section className="space-y-4">
      <FormSectionHeader
        title="Información General"
        description="Principales datos de la vacante."
      />

      <FormInput control={control} label="Nombre de la Vacante" name="name" type="text" maxChars={100} />
      <div className="flex gap-4">
        <FormOptions
          control={control}
          label="Modalidad"
          name="modality"
          type="select"
          options={[
            { value: 'presencial', label: 'Presencial' },
            { value: 'remoto', label: 'Remoto' },
            { value: 'hibrido', label: 'Híbrido' },
          ]}
          className="w-full"
        />
        <FormInput
          control={control}
          label="Sector"
          name="sector"
          type="text"
          maxChars={50}
          className="w-full"
        />
      </div>

      <FormInput control={control} label="Dirección de la Vacante" name="location" type="text" maxChars={100} />

      <div className="flex gap-4">
        <FormInput
          control={control}
          label="Vacantes Disponibles"
          name="numberVacancies"
          type="text"
          maxChars={10}
          className="w-full"
        />
        <FormInput
          control={control}
          label="Máximo de Aplicaciones"
          name="maxApplications"
          optional
          type="text"
          maxChars={10}
          className="w-full"
        />
      </div>
    </section>
  );
}
