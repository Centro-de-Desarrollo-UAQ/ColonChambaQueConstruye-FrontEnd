'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '@/components/Forms/FormInput';

interface EmployerDetailsStepProps {
  control: Control<EmployerFormType>;
}

export default function EmployerDetailsStep({ control }: EmployerDetailsStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="mt-2 text-xl font-bold">Información de la empresa</h2>
      <div className="my-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="Nombre de la empresa"
        name="companyName"
        type="text"
        description="Nombre con el que opera la empresa"
      />

      <FormInput
        control={control}
        label="Correo electrónico empresarial"
        name="companyEmail"
        type="email"
        description="Correo oficial para contactar con la empresa"
      />

      <h2 className="mt-2 text-xl font-bold">Descripción</h2>
      <div className="my-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="Descripción de la empresa"
        name="companyDescription"
        type="textarea"
        description="Breve descripción de la empresa (misión, visión, servicios, etc.)"
      />

      <h2 className="mt-2 text-xl font-bold">Ubicación</h2>
      <div className="my-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput control={control} label="Dirección" name="companyAddress" type="text" />

      <FormInput control={control} label="Código Postal" name="companyAddressZip" type="text" />

      <div className="flex gap-4">
        <FormInput control={control} label="Estado" name="companyAddressState" type="text" />
        <FormInput control={control} label="País" name="companyAddressCountry" type="text" />
      </div>

      <h2 className="mt-2 text-xl font-bold">Datos Fiscales</h2>
      <div className="my-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput control={control} label="RFC" name="companyRFC" type="text" />

      <div className="flex gap-4">
        <FormInput
          control={control}
          label="Razón Social"
          name="companyRazonSocial"
          type="text"
          description="Nombre legal registrado ante la ley."
        />
        <FormInput
          control={control}
          label="Sector"
          name="companySector"
          type="text"
          description="Industria relacionada"
        />
      </div>

      <h2 className="mt-2 text-xl font-bold">Información del Empleador</h2>
      <label className="block">
        Ingrese aquí la información del propietario de la cuenta (Empleador)
      </label>
      <div className="my-4 h-[1px] w-full rounded bg-gray-300"></div>

      <FormInput control={control} label="Nombre(s)" name="employerName" type="text" />
      <FormInput control={control} label="Apellido(s)" name="employerLastName" type="text" />
      <FormInput
        control={control}
        label="Correo electrónico del empleador"
        name="employerEmail"
        type="email"
      />

      <label>
        Teléfono del empleador<span className="text-uaq-danger">*</span>
      </label>
      <div className="flex gap-4">
        <div className="w-1/6">
          <FormInput control={control} name="employerPhoneCode" type="text" />
        </div>
        <div className="w-5/6">
          <FormInput control={control} name="employerPhone" type="text" />
        </div>
      </div>

      <div className="flex gap-4">
        <FormInput control={control} label="Contraseña" name="accountPassword" type="password" />
        <FormInput
          control={control}
          label="Confirmar contraseña"
          name="accountPasswordConfirm"
          type="password"
        />
      </div>
    </div>
  );
}
