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
      modality: 'PRESENCIAL',       // coincide con z.enum(['PRESENCIAL', 'REMOTO', 'HIBRIDO'])
      location: '',
      numberOpenings: '1',
      description: '',
      experience: '',
      gender: '',                   // tú eliges en el select (MASCULINO/FEMENINO/INDIFERENTE)
      ageRange: '',
      minAge: '',
      maxAge: '',
      requiredDegree: 'INDIFERENTE', // uno válido del enum
      salaryRange: '',
      currency: 'mxn',              // coincide con z.enum(['mxn', 'usd'])
      minSalary: '',
      maxSalary: '',
      benefits: '',
      workingDays: [],              // array de strings
      workShift: 'TIEMPO_COMPLETO', // valor válido del enum
      workSchedule: '',
      workHourStart: '',
      workHourEnd: '',
      additionalInformation: '',
    },
  });

  const router = useRouter()
  const { control, handleSubmit } = methods;
  const [submittedData, setSubmittedData] = useState<VacancyFormType | null>(null);
  const { companyId } = useCompanyStore(); 

  const onSubmit = async (values: VacancyFormType) => {
    
    if (!companyId) {
      console.error("No se encontró companyId en el store");
      return;
    }
    
    const minAgeNum = values.minAge ? Number(values.minAge) : undefined;
    const maxAgeNum = values.maxAge ? Number(values.maxAge) : undefined;
    const minSalaryNum = Number(values.minSalary);
    const maxSalaryNum = Number(values.maxSalary);
    const openingsNum = Number(values.numberOpenings);


    const payload = {
      name: values.name,
      businessSector: values.sector,          
      modality: values.modality,              
      location: values.location,
      numberOpenings: openingsNum,

      description: values.description,
      experience: values.experience,

      gender: values.gender.toUpperCase() || 'INDIFERENTE',

      ageRange: [
        minAgeNum ?? 18,
        maxAgeNum ?? (minAgeNum ?? 18),
      ],

      requiredDegree: values.requiredDegree,  

      salary: {
        coin: values.currency.toUpperCase(),  
        min: minSalaryNum,
        max: maxSalaryNum,
      },

      benefits: values.benefits,

      workingDay: (values.workingDays || []).map((d) => d.toUpperCase()),
     

      workShift: values.workShift,          

      workSchedule: [values.workHourStart, values.workHourEnd],
     

      additionalInformation: values.additionalInformation,
    };

    console.log('Payload final que va al backend:', payload);
    setSubmittedData(values);

    try {
      const response = await apiService.post(`/companies/${companyId}/vacancies`,payload);
        if(!response?.ok){
            console.log("error en crear la vacante")
            return  
        }

        const data = await response.json()
        console.log("vacante creada, el id es:",data.data.id)

        console.log("STATUS:", response.status);
  console.log("BODY:", data);

    router.push("/employer/home/vacancies");
  return;
  
    } catch (err) {
      console.error('Error de red al crear la vacante:', err);
      // toast.error('Error de red al publicar la vacante');
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
        <p className="text-center text-xl mb-6 w-[578px] justify-self-center pb-5">
          Completa la información de la oferta de trabajo u conéctate con los mejores talentos
        </p>

        <GeneralInfoSection control={control} />
        <RequiredExperience control={control} />
        <VacancyInfoSection control={control} />
        <BenefitsSection control={control} />
        <JobConditionsSection control={control} />
        <InterestAreasSelector control={control} />

        <div className="flex justify-end">
          {/* Ya no uses onClick, el handleSubmit está en el form */}
          <Button type="submit">Publicar</Button>
        </div>
      </form>
    </FormProvider>
  );
}
