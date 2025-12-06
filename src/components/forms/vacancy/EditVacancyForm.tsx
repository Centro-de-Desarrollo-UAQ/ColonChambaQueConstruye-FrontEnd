'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerVacancy, VacancyFormType } from '@/validations/registerVacancy';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import JobConditionsSection from './JobConditionsSection';
import InterestAreasSelector from './AdditionalInformation';
import GeneralInfoSection from './GeneralInfoSection';
import BenefitsSection from './BenefitsSection';
import VacancyInfoSection from './VacancyInfoSection';
import RequiredExperience from './RequiredExperience';

import { VacancyU } from '@/interfaces/vacancyUpdate';
import { useCompanyStore } from '@/app/store/authCompanyStore';
import { apiService } from '@/services/api.service';

export default function EditVacancyForm({ idVacancy }: { idVacancy: string }) {
  const { token, companyId } = useCompanyStore();
  const router = useRouter();

  const [vacancy, setVacancy] = useState<VacancyU | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVacancy = async () => {
      if (!token || !companyId || !idVacancy) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await apiService.get(
          `/companies/${companyId}/vacancies/${idVacancy}`,
        );

        if (!res?.ok) {
          setVacancy(null);
          setIsLoading(false);
          return;
        }

        const json = await res.json();
        const data = json?.data?.vacancy ?? json?.data ?? json;
        setVacancy(data as VacancyU);
        console.log('Vacancy data:', data);
      } catch (e) {
        console.error('Error cargando vacante', e);
        setVacancy(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVacancy();
  }, [idVacancy, token, companyId]);

  const methods = useForm<VacancyFormType>({
    resolver: zodResolver(registerVacancy),
    defaultValues: {
      name: '',
      sector: '',
      modality: undefined,
      location: '',
      numberOpenings: '',
      description: '',
      experience: '',
      gender: '',
      ageRange: '',
      minAge: '',
      maxAge: '',
      requiredDegree: undefined,
      salaryRange: '',
      minSalary: '',
      maxSalary: '',
      currency: 'mxn',
      benefits: '',
      workingDays: [],
      workShift: undefined,
      workSchedule: '',
      workHourStart: '',
      workHourEnd: '',
      additionalInformation: '',
    },
  });

  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    if (!vacancy) return;

    const rawCoin = vacancy.salary?.coin?.toLowerCase();
    const coin: 'mxn' | 'usd' | undefined =
        rawCoin === 'mxn' || rawCoin === 'usd' ? rawCoin : undefined;

    reset({
      name: vacancy.name ?? '',
      sector: vacancy.businessSector ?? '',
      modality: vacancy.modality ?? undefined,
      location: vacancy.location ?? '',
      numberOpenings:
        vacancy.numberOpenings != null ? String(vacancy.numberOpenings) : '',
      description: vacancy.description ?? '',
      experience: vacancy.experience ?? '',
      gender: vacancy.gender ?? '',
      ageRange: '',
      minAge:
        vacancy.ageRange && vacancy.ageRange[0] != null
          ? String(vacancy.ageRange[0])
          : '',
      maxAge:
        vacancy.ageRange && vacancy.ageRange[1] != null
          ? String(vacancy.ageRange[1])
          : '',
      requiredDegree: vacancy.requiredDegree ?? '',
      salaryRange: '',
      minSalary:
        vacancy.salary && vacancy.salary.min != null
          ? String(vacancy.salary.min)
          : '',
      maxSalary:
        vacancy.salary && vacancy.salary.max != null
          ? String(vacancy.salary.max)
          : '',
      currency: coin ?? 'mxn',
      benefits: vacancy.benefits ?? '',
      workingDays: vacancy.workingDay ?? [],
      workShift: vacancy.workShift ?? '',
      workSchedule: '',
      workHourStart:
        vacancy.workSchedule && vacancy.workSchedule[0]
          ? vacancy.workSchedule[0]
          : '',
      workHourEnd:
        vacancy.workSchedule && vacancy.workSchedule[1]
          ? vacancy.workSchedule[1]
          : '',
      additionalInformation: vacancy.additionalInformation ?? '',
    });
  }, [vacancy, reset]);

  const [submittedData, setSubmittedData] = useState<VacancyFormType | null>(null);

  const onSubmit = async (data: VacancyFormType) => {
    if (!token || !companyId) return;

    setIsSubmitting(true);

    const payload = {
      name: data.name || undefined,
      businessSector: data.sector || undefined,
      modality: data.modality || undefined,
      location: data.location || undefined,
      numberOpenings: data.numberOpenings ? Number(data.numberOpenings) : undefined,
      description: data.description || undefined,
      experience: data.experience || undefined,
      gender: data.gender || undefined,
      ageRange:
        data.minAge && data.maxAge
          ? [Number(data.minAge), Number(data.maxAge)]
          : undefined,
      requiredDegree: data.requiredDegree || undefined,
      salary:
        data.minSalary || data.maxSalary
          ? {
              min: data.minSalary ? Number(data.minSalary) : null,
              max: data.maxSalary ? Number(data.maxSalary) : null,
              coin: data.currency?.toUpperCase() ?? 'MXN',
            }
          : undefined,
      benefits: data.benefits || undefined,
      workingDay: Array.isArray(data.workingDays) ? data.workingDays : [],
      workShift: data.workShift || undefined,
      workSchedule:
        data.workHourStart || data.workHourEnd
          ? [data.workHourStart || null, data.workHourEnd || null]
          : [],
      additionalInformation: data.additionalInformation || undefined,
    };

    try {
      const response = await apiService.put(
        `/companies/${companyId}/vacancies/${idVacancy}`,
        payload,
      );

      if (!response?.ok) {
        console.error('Error al actualizar la vacante:', response?.status, response?.statusText);
        return;
      }

      const json = await response.json();
      const updated = json?.data?.vacancy ?? json?.data ?? json;
      setVacancy(updated as VacancyU);
      router.push('/employer/home/vacancies');
    } catch (error) {
      console.error('Error inesperado al actualizar la vacante:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-zinc-500">
        Cargando información de la vacante...
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className="py-10 text-center text-zinc-500">
        No se encontró la vacante.
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-12 bg-white pt-12 space-y-4"
      >
        <h2 className="text-4xl font-bold text-center text-[var(--secundary)]">
          Editar vacante
        </h2>
        <p className="text-center text-xl mb-6 w-[578px] justify-self-center pb-5">
          Edita la información de la oferta de trabajo
        </p>

        <GeneralInfoSection control={control} />
        <RequiredExperience control={control} />
        <VacancyInfoSection control={control} />
        <BenefitsSection control={control} />
        <JobConditionsSection control={control} />
        <InterestAreasSelector control={control} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
