'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerVacancy, VacancyFormType } from '@/validations/registerVacancy';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import JobConditionsSection from './JobConditionsSection';
import InterestAreasSelector from './AdditionalInformation';
import GeneralInfoSection from './GeneralInfoSection';
import BenefitsSection from './BenefitsSection';
import VacancyInfoSection from './VacancyInfoSection';
import RequiredExperience from './RequiredExperience';

import { apiService } from '@/services/api.service';
import { useCompanyStore } from '@/app/store/authCompanyStore';
import { useRouter } from 'next/navigation';

export default function PostJobForm() {
  const methods = useForm<VacancyFormType>({
    resolver: zodResolver(registerVacancy),
    defaultValues: {
      name: '',
      sector: '',
      modality: 'PRESENCIAL',
      location: '',
      numberOpenings: '1',
      description: '',
      experience: '',
      gender: '',
      minAge: '',
      maxAge: '',
      requiredDegree: 'INDIFERENTE',
      currency: 'mxn',
      minSalary: '',
      maxSalary: '',
      benefits: '',
      workingDays: [],
      workShift: 'TIEMPO_COMPLETO',
      workHourStart: '',
      workHourEnd: '',
      additionalInformation: '',
    },
  });

  const { control, handleSubmit } = methods;
  const router = useRouter();
  const { companyId } = useCompanyStore();

  const [submittedData, setSubmittedData] = useState<VacancyFormType | null>(null);

  const onSubmit = async (values: VacancyFormType) => {
    try {
      if (!companyId) {
        throw new Error('No se encontró companyId en sesión');
      }

      const payload = {
        name: values.name,
        businessSector: values.sector,
        modality: values.modality,
        location: values.location,
        numberOpenings: Number(values.numberOpenings),

        description: values.description,
        experience: values.experience,

        gender: (values.gender || 'INDIFERENTE').toUpperCase(),

        ageRange: [
          values.minAge ? Number(values.minAge) : 18,
          values.maxAge ? Number(values.maxAge) : Number(values.minAge) || 18,
        ],

        requiredDegree: values.requiredDegree,

        salary: {
          coin: values.currency.toUpperCase(),
          min: Number(values.minSalary),
          max: Number(values.maxSalary),
        },

        benefits: values.benefits,

        workingDay: (values.workingDays || []).map(d => d.toUpperCase()),

        workShift: values.workShift,

        workSchedule: [values.workHourStart, values.workHourEnd],

        additionalInformation: values.additionalInformation,
      };

      console.log('Payload enviado:', payload);
      setSubmittedData(values);

      const response = await apiService.post(
        `/companies/${companyId}/vacancies`,
        payload
      );


      if (!response?.ok) {
        const err = await response.json().catch(() => null);
        console.error('Error backend:', err);
        throw new Error(err?.message || 'No se pudo crear la vacante');
      }

      const data = await response.json();
      console.log('Vacante creada con ID:', data?.data?.id);

      router.push('/employer/home/vacancies');
    } catch (err: any) {
      console.error('Error al crear vacante:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-12 bg-white pt-12 space-y-4"
      >
        <h2 className="text-4xl font-bold text-center text-[var(--secundary)]">
          Publica una nueva vacante
        </h2>

        <p className="text-center text-xl mb-6 w-[578px] mx-auto">
          Completa la información de la oferta de trabajo y conéctate con los mejores talentos
        </p>

        <GeneralInfoSection control={control} />
        <RequiredExperience control={control} />
        <VacancyInfoSection control={control} />
        <BenefitsSection control={control} />
        <JobConditionsSection control={control} />
        <InterestAreasSelector control={control} />

        <div className="flex justify-end">
          <Button type="submit">Publicar</Button>
        </div>
      </form>
    </FormProvider>
  );
}
