'use client';

import React from 'react';
import { Control } from 'react-hook-form';
import Link from 'next/link';
import { EmployerFormType } from '@/validations/employerSchema';
import FormInput from '@/components/forms/FormInput';
import FormOptions from '@/components/forms/FormOptions';
import { country, sector, states } from '@/constants';
import FormPhone from '@/components/forms/FormPhone';
import { Label } from '@/components/ui/label';
import { CompanyFormType } from '@/validations/companySchema';
import { Combobox } from '../ui/comboBox';
import FormComboBadgeSelector from '../forms/FormComboBadgeSelector';

interface CompanyDetailsProps {
  control: Control<CompanyFormType>;
}

export default function CompanyDetails({ control }: CompanyDetailsProps) {
  return (
    <div className="space-y-4 p-4">
      <h2 className=" text-xl text-center text-uaq-terniary">Información general</h2>
      <div className="h-[1px] w-[596px] justify-self-center rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="Nombre comercial"
        name="companyName"
        type="text"
        description="Ingresa el nombre con el que se conoce publicamente la empresa"
        maxChars={100}
      />
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6 items-start content-start auto-rows-auto'>
        <div className='col-span-1 min-w-0 w-[500px]'>
            <FormInput
                control={control}
                label="Correo electrónico"
                name="companyEmail"
                type="email"
                description="Proporciona un correo electrónico de contacto oficial de la empresa"
                maxChars={244}
                className='flex flex-col justify-between'
            />
        </div>
        <div className='w-[260px] justify-self-end'>
            <FormComboBadgeSelector
            control={control}
            label="Giro de la empresa"
            name="companySector"
            options={sector}
            description="Seleccione la opción que mejor se adapte a tu empresa"
            className='col-span-1 min-w-0 justify-self-end'
            multiple={false}
            />
        </div>
        
        

    </div>

      <FormInput
        control={control}
        label="Descripción"
        name="companyDescription"
        type="textarea"
        description="Describe brevemente a qué se dedica la empresa, productos o servicios que ofrece"
        maxChars={1200}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6 items-start content-start auto-rows-auto'>
        <FormComboBadgeSelector
          control={control}
          label="País de inversión"
          name="companyInvestmentCountry"
          options={country}
          description="Selecciona el país desde el cual provienen los recursos o capital de inversión"
          className='flex flex-col justify-between'
          multiple={false}
        />

        <FormInput
        control={control}
        label="Número de trabajadores"
        name="companyEmlpoyeesNumber"
        type="text"
        description="Indica cuántos empleados tiene actualmente la empresa"
        maxChars={5}
        className='flex flex-col justify-between'
      />
      

    </div>

      <h2 className=" text-xl text-center text-uaq-terniary">Datos fiscales</h2>
      <div className="h-[1px] w-[596px] justify-self-center rounded bg-gray-300"></div>

      <FormInput
        control={control}
        label="RFC"
        name="companyRFC"
        type="text"
        maxChars={13}
        description='Escribe el Registro Federal de Contribuyentes (RFC) con homoclave de la empresa'
      />

      <FormInput
        control={control}
        label="Razón social"
        name="companyRazonSocial"
        type="text"
        maxChars={100}
        description='Ingresa la denominación legal completa de la empresa tal como aparece en documentos fiscales'
      />

      <h2 className=" text-xl text-center text-uaq-terniary">Ubicación</h2>
      <div className="h-[1px] w-[596px] justify-self-center rounded bg-gray-300"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6 items-start content-start auto-rows-auto">
       
        <FormComboBadgeSelector
          control={control}
          label="País"
          name="companyAddressCountry"
          options={country}
          description="Selecciona el país donde se ubica la empresan"
          className='flex flex-col justify-between '
          multiple={false}
        />
        <FormComboBadgeSelector
          control={control}
          label="Estado"
          name="companyAddressState"
          options={states}
          description="Elige el estado o entidad federativa correspondiente a la ubicación de la empresa"
          className='flex flex-col justify-between '
          multiple={false}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-6 items-start content-start auto-rows-auto">
        <FormInput
            control={control}
            label="Municipio"
            name="companyAddressMunicipality"
            type="text"
            maxChars={100}
            description='Escribe el municipio o delegación donde está localizada la empresa'
            className='flex-2 w-[383px]'
        />
        <FormInput
            control={control}
            label="Colonia"
            name="companyAddressColonia"
            type="text"
            maxChars={100}
            description='Escribe el nombre de la colonia o barrio donde se encuentra la empresa'
            className='flex-2 w-[383px]'
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6 items-start content-start auto-rows-auto">
        <FormInput
            control={control}
            label="Calle"
            name="companyAddressStreet"
            type="text"
            maxChars={100}
            description='Indica el nombre de la calle donde está ubicada la empresa'
        />
        <FormInput
            control={control}
            label="C.P."
            name="companyAddressZip"
            type="text"
            maxChars={10}
            description='Escribe el código postal correspondiente a la dirección'
        />
        <FormInput
            control={control}
            label="No. Exterior"
            name="companyAddressNo"
            type="text"
            maxChars={5}
            description='No. exterior del inmueble'

        />
      </div>
    </div>
  );
}
