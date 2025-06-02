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
        <div className="flex items-center">
          <span className="text-uaq-default-400 text-sm">
            <span className="text-300 text-uaq-danger mr-1">*</span>Campos obligatorios
          </span>
        </div>
      </div>

      <Separator />

      <div className="mb-6 space-y-4">
        <FormInput
        control={control}
          name="name"
          label="Nombre"
          type="text"
          placeholder="Bryan Gersain"
          className="mt-6"
        />

        <FormInput
                control={control}

          name="lastName"
          label="Apellido"
          type="text"
          placeholder="Bonilla Nandayapa"
        />

        <FormInput
                control={control}

          name="address"
          label="Dirección"
          description="Ingresa tu dirección..."
          type="text"
          placeholder="Av. De las ciencias"
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
        <FormInput
                control={control}

          name="email"
          label="Correo Electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
        />

        <FormInput
                control={control}

          name="password"
          label="Contraseña"
          type="password"
          placeholder="***********"
        />
      </div>

      <div className="my-6 text-sm text-gray-600">
        <p>
          Al continuar, confirmas que has leído y aceptas las Condiciones Legales y la Política
          de Privacidad de la Bolsa de Trabajo UAQ.
        </p>
      </div>
    </div>
  );
}