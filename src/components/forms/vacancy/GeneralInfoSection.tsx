'use client';

import { Control } from 'react-hook-form';
import { VacancyFormType } from '@/validations/registerVacancy';
import FormInput from '@/components/forms/FormInput';
import FormOptions from '@/components/forms/FormOptions';
import FormSectionHeader from './FormSectionHeader';
import { listAreasOptionsConstants, listModalityOptionsConstants, sector } from '@/constants';

type Props = {
  control: Control<VacancyFormType>;
};

export default function GeneralInfoSection({ control }: Props) {
  return (
    <section className="space-y-4">
      <FormSectionHeader
        title="Información General"
        className='text-uaq-terniary font-normal'
      />

      <FormInput 
        control={control} 
        label="Nombre" 
        name="name" 
        type="text" 
        maxChars={80} 
        description='Especifica el título del puesto tal como quieres que aparezca en la publicación'/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6 items-start content-start auto-rows-auto">
        <FormOptions
          control={control}
          label="Sector"
          name="sector"
          type="select"
          className="w-full"
          options={listAreasOptionsConstants}
          description='Indica el sector o industria al que pertenece la vacante'
        />
        <FormOptions
          control={control}
          label="Modalidad"
          name="modality"
          type="select"
          options={listModalityOptionsConstants}
          className="w-full"
          description='Define si el trabajo es presencial, remoto o híbrido'
        />
        
      </div>

      <div className='grid md:grid-cols-4 gap-x-3 gap-y-6 items-start content-start auto-rows-auto'>
        <div className='col-span-3 min-w-0'>
          <FormInput 
          control={control} 
          label="Dirección de la Vacante" 
          name="location" 
          type="text" 
          maxChars={150} 
          className=''
          description='Señala la ubicación exacta del centro de trabajo'/>
        </div>
        <div className='justify-self-end col-span-1'>
          <FormInput
          control={control}
          label="No. de plazas"
          name="numberOpenings"
          maxChars={10}
          max={10}
          type="number"
          min={1}
          className=""
          description='Cantidad de personas para cubrir el puesto'
        />
        </div>
      </div>
      <FormInput
          control={control}
          label='Descripción'
          name='description'
          type='textarea'
          maxChars={7000}
          description='Resume detalladamente las funciones principales y el objetivo del cargo'
          className='flex-1'
        />
    </section>
  );
}
