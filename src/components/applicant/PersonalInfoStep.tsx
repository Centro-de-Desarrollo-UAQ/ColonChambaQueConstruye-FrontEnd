'use client';

import { Separator } from '@/components/ui/separator';
import FormInput from '../forms/FormInput';
import { ApplicantFormType } from '@/validations/applicantSchema';
import { Control } from 'react-hook-form';
import { FormBirthDate } from '../forms/FormBirthDate';

interface ApplicantDetailsStepProps {
  control: Control<ApplicantFormType>;
}

export default function PersonalInfoStep({ control }: ApplicantDetailsStepProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Información Personal</h3>
      </div>

      <Separator />

      <div className="mb-6 space-y-4">
        <FormInput control={control} name="name" label="Nombre" type="text" className="mt-6" />

        <FormInput control={control} name="lastName" label="Apellido" type="text" />

        <FormInput
          control={control}
          name="address"
          label="Dirección"
          description="Ingresa tu dirección..."
          type="text"
        />

        <FormBirthDate
          name="birthDate"
          label="Fecha de nacimiento"
          description="Selecciona tu fecha de nacimiento"
        />
      </div>

      <h3 className="mb-4 text-xl font-bold">Cuenta y acceso</h3>
      <Separator />

      <div className="mt-6 space-y-4">
        <FormInput control={control} name="email" label="Correo Electrónico" type="email" />

        <FormInput control={control} name="password" label="Contraseña" type="password" />
      </div>

      <div className="my-6 text-sm text-gray-600">
        <p>
          Al continuar, confirmas que has leído y aceptas las Condiciones Legales y la Política de
          Privacidad de la Bolsa de Trabajo UAQ.
        </p>
      </div>
    </div>
  );
}
