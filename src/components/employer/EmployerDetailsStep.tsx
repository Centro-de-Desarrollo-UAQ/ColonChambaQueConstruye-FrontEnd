'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import Link from 'next/link';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '@/components/forms/FormInput';
import FormOptions from '@/components/forms/FormOptions';
import { sector } from '@/constants';
import FormPhone from '@/components/forms/FormPhone';

interface EmployerDetailsStepProps {
  control: Control<EmployerFormType>;
}

export default function EmployerDetailsStep({ control }: EmployerDetailsStepProps) {
  return (
    <div className="space-y-4 pb-4">
      

      <FormInput
        control={control}
        label="Nombre(s)"
        name="employerName"
        type="text"
        description="Ingresa tu nombre o nombres tal como aparece en tus documentos oficiales."
        maxChars={100}
      />

      <FormInput
        control={control}
        label="Apellidos"
        name="employerLastName"
        type="text"
        description="Escribe tus apellidos. Asegúrate de que estén completos y sin errores."
        maxChars={244}
      />

      <FormInput
        control={control}
        label="Puesto dentro de la empresa"
        name="positionWithinTheCompany"
        type="text"
        description="Indica tu cargo actual en la organización (ej. Coordinador de Recursos Humanos)."
        maxChars={244}
      />

      <FormInput
        control={control}
        label="Correo"
        name="employerEmail"
        type="email"
        description="Proporciona un correo corporativo o personal válido. Este correo te permitirá ingresar a la plataforma."
        maxChars={244}
      />

      <FormPhone control={control} name="employerLandlinePhone" label="Teléfono fijo "
      description="Ingresa un número fijo donde podamos contactarte (opcional si no cuentas con uno)." />

      <FormPhone control={control} name="employerMobilePhone" label="Teléfono Celular"
      description="Proporciona tu número móvil. Es importante para una comunicación más directa." />

        <FormInput
          control={control}
          label="Contraseña"
          name="accountPassword"
          type="password"
          className="w-full"
          description="Crea una contraseña segura. Usa al menos 8 caracteres, combinando letras, números y símbolos."
          maxChars={244}
        />
        <FormInput
          control={control}
          label="Confirmar contraseña"
          name="accountPasswordConfirm"
          type="password"
          className="w-full"
          description="Ingresa nuevamente tu contraseña para confirmar."
          maxChars={244}
        />
    </div>
  );
}
