
import { Input } from "../input";
import { Textarea } from "../textArea";
import React from "react";

interface EmployerDetailsStepProps {
  formData: { [key: string]: any };
  onFormDataChange: (name: string, value: any) => void;
}

export default function EmployerDetailsStep({ formData, onFormDataChange }: EmployerDetailsStepProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onFormDataChange(name, value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-right text-sm font-normal text-zinc-500">
          <span className="text-red-500">*</span> Campos Obligatorios
        </label>
        <h2 className="text-xl font-bold mt-2">Información de la empresa</h2>
        <div className="w-full h-[1px] bg-gray-300 rounded my-4"></div>
        <label>
          Nombre de la empresa<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='Text'
          className='mx-[-2px] mt-2'
          required
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}></Input>
        <label className='block text-sm text-zinc-500'>
          Nombre con el que opera la empresa
        </label>
      </div>

      <div>
        <label>
          Correo electrónico empresarial<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='Email'
          className='mx-[-2px] mt-2'
          required
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleChange}></Input>
        <label className='block text-sm text-zinc-500'>
          Correo oficial para contactar con la empresa
        </label>
      </div>

      <h2 className="text-xl font-bold mt-2">Descripción</h2>
      <div className="w-full h-[1px] bg-gray-300 rounded my-4"></div>
      <div>
        <label>
          Descripción de la empresa<span className="text-uaq-danger">*</span>
        </label>
        <Textarea 
          required
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
        ></Textarea>
        <label className='block text-sm text-zinc-500'>
          Breve descripción de la empresa (misión, visión, servicios, etc.).
        </label>
      </div>

      <h2 className="text-xl font-bold mt-2">Dirección</h2>
      <div className="w-full h-[1px] bg-gray-300 rounded my-4"></div>
      <div>
        <label>
          Calle<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='Text'
          className='mx-[-2px] mt-2'
          required
          name="companyAddressStreet"
          value={formData.companyAddressStreet}
          onChange={handleChange}></Input>
      </div>
      <div>
        <label>
          Código Postal<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='Text'
          className='mx-[-2px] mt-2'
          required
          name="companyAddressZip"
          value={formData.companyAddressZip}
          onChange={handleChange}></Input>
      </div>
      <div className="flex gap-4">
        <div className='w-full'>
          <label>
            Estado<span className="text-uaq-danger">*</span>
          </label>
          <Input
            type='Text'
            className='mx-[-2px] mt-2'
            required
            name="companyAddressState"
            value={formData.companyAddressState}
            onChange={handleChange}></Input>
        </div>
        <div className='w-full'>
          <label>
            Pais<span className="text-uaq-danger">*</span>
          </label>
          <Input
            type='Text'
            className='mx-[-2px] mt-2'
            required
            name="companyAddressCountry"
            value={formData.companyAddressCountry}
            onChange={handleChange}></Input>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-2">Datos Fiscales</h2>
      <div className="w-full h-[1px] bg-gray-300 rounded my-4"></div>
      <div>
        <label>
          RFC<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='RFC'
          className='mx-[-2px] mt-2'
          required
          name="companyRFC"
          value={formData.companyRFC}
          onChange={handleChange}></Input>
      </div>
      <div className="flex gap-4">
        <div className='w-full'>
          <label>
            Razón Social<span className="text-uaq-danger">*</span>
          </label>
          <Input
            type='Text'
            className='mx-[-2px] mt-2'
            required
            name="companyRazonSocial"
            value={formData.companyRazonSocial}
            onChange={handleChange}></Input>
          <label className='block text-sm text-zinc-500'>
            Nombre legal registrado ante la ley.
          </label>
        </div>
        <div className='w-full'>
          <label>
            Sector
          </label>
          <Input
            type='Text'
            className='mx-[-2px] mt-2'
            required
            name="companySector"
            value={formData.companySector}
            onChange={handleChange}></Input>
          <label className='block text-sm text-zinc-500'>
            Industria relacionada
          </label>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-2">Informacion del Empleador</h2>
      <label className='block'>
        Ingrese aquí la información del propietario de la cuenta (Empleador)
      </label>
      <div className="w-full h-[1px] bg-gray-300 rounded my-4"></div>

      <div>
        <label>
          Nombre(s)<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='Text'
          className='mx-[-2px] mt-2'
          required
          name="employerName"
          value={formData.employerName}
          onChange={handleChange}></Input>
      </div>
      <div>
        <label>
          Apellido(s)<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='Text'
          className='mx-[-2px] mt-2'
          required
          name="employerLastName"
          value={formData.employerLastName}
          onChange={handleChange}></Input>
      </div>
      <div>
        <label>
          Correo electrónico del empleador<span className="text-uaq-danger">*</span>
        </label>
        <Input
          type='Email'
          className='mx-[-2px] mt-2'
          required
          name="employerEmail"
          value={formData.employerEmail}
          onChange={handleChange}></Input>
      </div>
      <label>
        Teléfono del empleador<span className="text-uaq-danger">*</span>
      </label>
      <div className="flex gap-4">
        <div className=' w-5%'>
          <Input
            type='Text'
            className='mx-[-2px] mt-2'
            required
            name="employerPhoneCode"
            value={formData.employerPhoneCode}
            onChange={handleChange}></Input>
        </div>
        <div className='w-full'>
          <label>
          </label>
          <Input
            type='Text'
            className='mx-[-2px] mt-2'
            required
            name="employerPhone"
            value={formData.employerPhone}
            onChange={handleChange}></Input>
        </div>
      </div>
      <div className="flex gap-4">
        <div className='w-full'>
          <label>
            Contraseña<span className="text-uaq-danger">*</span>
          </label>
          <Input
            type='password'
            className='mx-[-2px] mt-2 w-10%'
            required
            name="accountPassword"
            value={formData.accountPassword}
            onChange={handleChange}></Input>
        </div>
        <div className='w-full'>
          <label>
            Confirmar contraseña<span className="text-uaq-danger">*</span>
          </label>
          <Input
            type='password'
            className='mx-[-2px] mt-2'
            required
            name="accountPasswordConfirm"
            value={formData.accountPasswordConfirm}
            onChange={handleChange}></Input>
        </div>
      </div>
    </div>
  );
}