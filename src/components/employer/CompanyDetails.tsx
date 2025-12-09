'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import { CompanyFormType } from '@/validations/companySchema';
import FormInput from '@/components/forms/FormInput';
import FormComboBadgeSelector from '@/components/forms/FormComboBadgeSelector';
import { country, sector, states } from '@/constants';

interface CompanyDetailsProps {
  control: Control<CompanyFormType>;
}

export default function CompanyDetails({ control }: CompanyDetailsProps) {
  return (
    <div className="space-y-8 p-4">
      {/* ─────────────── Información general ─────────────── */}
      <section className="space-y-6">
        <h2 className="text-center text-xl text-uaq-terniary">
          Información general
        </h2>
        <div className="mx-auto h-px w-full max-w-[596px] rounded bg-gray-300" />

        {/* Nombre comercial */}
        <FormInput
          control={control}
          label="Nombre comercial *"
          name="companyName"
          type="text"
          description="Ingresa el nombre con el que se conoce públicamente la empresa"
          maxChars={100}
        />

        {/* Correo + Giro */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
          <FormInput
            control={control}
            label="Correo electrónico *"
            name="companyEmail"
            type="email"
            description="Proporciona un correo electrónico de contacto oficial de la empresa"
            maxChars={244}
          />

          <FormComboBadgeSelector
            control={control}
            label="Giro de la empresa *"
            name="companySector"
            options={sector}
            description="Selecciona la opción que mejor se adapte a tu empresa"
            multiple={false}
          />
        </div>

        {/* Descripción */}
        <FormInput
          control={control}
          label="Descripción *"
          name="companyDescription"
          type="textarea"
          description="Describe brevemente a qué se dedica la empresa, productos o servicios que ofrece"
          maxChars={1200}
        />

        {/* País de inversión + Número de trabajadores */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
          <FormComboBadgeSelector
            control={control}
            label="País de inversión *"
            name="companyInvestmentCountry"
            options={country}
            description="Selecciona el país desde el cual provienen los recursos o capital de inversión"
            multiple={false}
          />

          <FormInput
            control={control}
            label="Número de trabajadores *"
            name="companyEmlpoyeesNumber"
            type="text"
            description="Indica cuántos empleados tiene actualmente la empresa"
            maxChars={5}
          />
        </div>
      </section>

      {/* ─────────────── Datos fiscales ─────────────── */}
      <section className="space-y-6">
        <h2 className="text-center text-xl text-uaq-terniary">
          Datos fiscales
        </h2>
        <div className="mx-auto h-px w-full max-w-[596px] rounded bg-gray-300" />

        <FormInput
          control={control}
          label="RFC *"
          name="companyRFC"
          type="text"
          maxChars={13}
          description="Escribe el Registro Federal de Contribuyentes (RFC) con homoclave de la empresa"
        />

        <FormInput
          control={control}
          label="Razón social *"
          name="companyRazonSocial"
          type="text"
          maxChars={100}
          description="Ingresa la denominación legal completa de la empresa tal como aparece en documentos fiscales"
        />
      </section>

      {/* ─────────────── Ubicación ─────────────── */}
      <section className="space-y-6">
        <h2 className="text-center text-xl text-uaq-terniary">Ubicación</h2>
        <div className="mx-auto h-px w-full max-w-[596px] rounded bg-gray-300" />

        {/* País + Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 items-start">

  {/* País */}
  <div className="flex flex-col">
    <FormComboBadgeSelector
      control={control}
      label="País *"
      name="companyAddressCountry"
      options={country}
      description="Selecciona el país donde se ubica la empresa"
      multiple={false}
    />
    <p className="mt-1 text-xs leading-4 text-gray-500">
      Selecciona el país donde se ubica la empresa
    </p>
  </div>

        {/* Estado */}
        <div className="flex flex-col">
          <FormComboBadgeSelector
            control={control}
            label="Estado *"
            name="companyAddressState"
            options={states}
            description="Elige el estado o entidad federativa correspondiente a la ubicación de la empresa"
            multiple={false}
          />
          <p className="mt-1 text-xs leading-4 text-gray-500">
            Elige el estado o entidad federativa correspondiente a la ubicación de la empresa
          </p>
        </div>

      </div>

        {/* Municipio + Colonia */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
          <FormInput
            control={control}
            label="Municipio *"
            name="companyAddressMunicipality"
            type="text"
            maxChars={100}
            description="Escribe el municipio o delegación donde está localizada la empresa"
          />
          <FormInput
            control={control}
            label="Colonia *"
            name="companyAddressColonia"
            type="text"
            maxChars={100}
            description="Escribe el nombre de la colonia o barrio donde se encuentra la empresa"
          />
        </div>

        {/* Calle + CP + Número */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-3">
          <FormInput
            control={control}
            label="Calle *"
            name="companyAddressStreet"
            type="text"
            maxChars={100}
            description="Indica el nombre de la calle donde está ubicada la empresa"
          />
          <FormInput
            control={control}
            label="C.P. *"
            name="companyAddressZip"
            type="text"
            maxChars={10}
            description="Escribe el código postal correspondiente a la dirección"
          />
          <FormInput
            control={control}
            label="No. Exterior *"
            name="companyAddressNo"
            type="text"
            maxChars={5}
            description="Número exterior del inmueble"
          />
        </div>
      </section>
    </div>
  );
}
