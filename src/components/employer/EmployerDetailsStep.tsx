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
      <h2 className="mt-6 mb-2 text-xl font-bold">Información de la empresa</h2>
      <div className="mb-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="Nombre de la empresa"
        name="companyName"
        type="text"
        description="Nombre con el que opera la empresa"
        maxChars={100}
      />

      <FormInput
        control={control}
        label="Correo electrónico empresarial"
        name="companyEmail"
        type="email"
        description="Correo oficial de contacto de la empresa"
        maxChars={244}
      />

      <h2 className="mt-6 mb-2 text-xl font-bold">Descripción</h2>
      <div className="mb-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="Descripción de la empresa"
        name="companyDescription"
        type="textarea"
        description="Breve descripción de la empresa (misión, visión, servicios, etc.)"
        maxChars={1200}
      />

      <h2 className="mt-6 mb-2 text-xl font-bold">Ubicación</h2>
      <div className="mb-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="Dirección"
        name="companyAddress"
        type="text"
        maxChars={100}
      />

      <FormInput
        control={control}
        label="Código Postal"
        name="companyAddressZip"
        type="text"
        maxChars={10}
      />

      <div className="flex gap-4">
        <FormInput
          control={control}
          label="Estado"
          name="companyAddressState"
          type="text"
          className="w-full"
        />
        <FormInput
          control={control}
          label="País"
          name="companyAddressCountry"
          type="text"
          className="w-full"
        />
      </div>

      <h2 className="mt-6 mb-2 text-xl font-bold">Datos Fiscales</h2>
      <div className="mb-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput control={control} label="RFC" name="companyRFC" type="text" maxChars={13} />

      <div className="flex justify-start gap-4">
        <FormInput
          control={control}
          label="Razón Social"
          name="companyRazonSocial"
          type="text"
          description="Nombre legal registrado ante la ley."
          className="w-full"
          maxChars={100}
        />
        <FormOptions
          type="select"
          control={control}
          label="Sector"
          name="companySector"
          options={sector}
          description="Industria relacionada"
          className="w-full"
          optional
        />
      </div>

      <h2 className="mt-6 mb-0 text-xl font-bold">Información del Empleador</h2>
      <label className="mb-4 block">
        Ingrese aquí la información del propietario de la cuenta (Empleador)
      </label>
      <div className="mb-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="Nombre(s)"
        name="employerName"
        type="text"
        maxChars={60}
      />
      <FormInput
        control={control}
        label="Apellido(s)"
        name="employerLastName"
        type="text"
        maxChars={60}
      />
      <FormInput
        control={control}
        label="Correo electrónico del empleador"
        name="employerEmail"
        type="email"
        maxChars={244}
      />

      <FormPhone control={control} name="employerPhone" label="Celular" />

      <div className="flex gap-4">
        <FormInput
          control={control}
          label="Contraseña"
          name="accountPassword"
          type="password"
          className="w-full"
          maxChars={16}
        />
        <FormInput
          control={control}
          label="Confirmar contraseña"
          name="accountPasswordConfirm"
          type="password"
          className="w-full"
          maxChars={16}
        />
      </div>

      {/* TODO: Add link to terms and conditions */}
      <div>
        Al continuar, confirmas que has leído las{' '}
        <Link href="" className="text-uaq-brand underline">
          Condiciones Legales
        </Link>{' '}
        y la{' '}
        <Link href="" className="text-uaq-brand underline">
          Política de Privacidad
        </Link>{' '}
        de la Bolsa de Trabajo UAQ para continuar con el registro.
      </div>
    </div>
  );
}
