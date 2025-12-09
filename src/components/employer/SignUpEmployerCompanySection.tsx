'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CompanyFormType, companySchema } from '@/validations/companySchema';
import CompanyDetails from './CompanyDetails';
import { Button } from '@/components/ui/button';

interface SignUpEmployerCompanySectionProps {
  onSuccess?: () => void;
}

export default function SignUpEmployerCompanySection({
  onSuccess,
}: SignUpEmployerCompanySectionProps) {
  const methods = useForm<CompanyFormType>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: '',
      companyEmail: '',
      companySector: '',
      companyDescription: '',
      companyInvestmentCountry: '',
      companyEmlpoyeesNumber: '',
      companyRFC: '',
      companyRazonSocial: '',
      companyAddressCountry: '',
      companyAddressState: '',
      companyAddressMunicipality: '',
      companyAddressColonia: '',
      companyAddressStreet: '',
      companyAddressZip: '',
      companyAddressNo: '',
    },
    mode: 'onSubmit',
  });

  const { control, handleSubmit } = methods;

  // helper to log validation errors when submit fails (debug)
  const onError = (errors: any) => {
    console.log('SignUpEmployerCompanySection: validation errors on submit:', errors);
  };

  const onSubmit = async (data: CompanyFormType) => {
    try {
      console.log('Datos de empresa:', data);
      console.log('SignUpEmployerCompanySection: calling onSuccess if provided');
      // TODO: llamada real al backend

      onSuccess?.();
    } catch (err) {
      console.error('Error registrando empresa:', err);
      // aquí puedes meter toast.error
    }
  };

  return (
    <FormProvider {...methods}>
      {/* OJO: ya no card, solo estructura interna */}
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Si quieres puedes dejar solo este subtítulo */}
        <p className="text-center text-sm leading-5 text-gray-600">
          Por favor, completa la información general, fiscal y de ubicación de tu
          empresa para continuar con el registro.
        </p>

        <CompanyDetails control={control} />

        <div className="mt-4 flex justify-center">
          <Button type="submit" className="px-10">
            Registrarse
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
