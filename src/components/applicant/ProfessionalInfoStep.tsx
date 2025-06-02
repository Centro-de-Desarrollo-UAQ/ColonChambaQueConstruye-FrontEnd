'use client';

import { Separator } from '@/components/ui/separator';
import FormInput from '../forms/FormInput';
import FormOptions from '../forms/FormOptions';
import { vacancyOptions } from '@/data/selectOptions';
import { Button } from '@/components/ui/button';
import { FileSmile, FileSend } from '@solar-icons/react';
import { Control } from 'react-hook-form';
import { ApplicantFormType } from '@/validations/applicantSchema';

interface ApplicantDetailsStepProps {
  control: Control<ApplicantFormType>;
}

export default function ProfessionalInfoStep({ control }: ApplicantDetailsStepProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Información Profesional</h3>
        <div className="flex items-center">
          <span className="text-uaq-default-400 text-sm">
            <span className="text-300 text-uaq-danger mr-1">*</span>Campos obligatorios
          </span>
        </div>
      </div>

      <Separator />

      <div className="space-y-4 py-6">
        <FormInput
          control={control}
          name="career"
          label="Carrera"
          description="Ingresa la carrera o ámbito de estudio al que se dedique"
          type="text"
        />

        <FormInput
          control={control}
          name="professionalSummary"
          label="Resumen personal"
          description="Describa su perfil profesional en una pequeña oración"
          type="textarea"
        />

        <h3 className="mt-6 mb-4 text-xl font-bold">Preferencias</h3>
        <Separator />

        <FormInput
          control={control}
          name="jobLocationPreference"
          label="Preferencia de ubicación laboral"
          description="¿En qué ubicación preferiría explorar ofertas de trabajo?"
          type="text"
          className="mt-6"
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <FormInput
              control={control}
              name="preferredHours"
              label="Horas preferentes"
              description="¿Qué cantidad de horas prefiere trabajar a la semana?"
              type="text"
            />
          </div>

          <div className="flex-1">
            <FormOptions
              control={control}
              name="employmentMode"
              label="Modalidad de empleo preferente"
              type="select"
              options={vacancyOptions}
              description="Seleccione una opción"
            />
          </div>
        </div>

        <h3 className="mt-8 mb-4 text-xl font-bold">Currículum</h3>
        <Separator />

        <div className="mt-10 flex gap-4">
          <Button variant="primary" color="accent" className="flex-1">
            <FileSend weight="Bold" />
            Sube tu CV
          </Button>
          <Button variant="secondary" color="brand" className="flex-1">
            <FileSmile weight="Bold" />
            Crea tu CV
          </Button>
        </div>
      </div>
    </div>
  );
}
