'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { sector as sectorOptions } from '@/constants/companyData';
import { Buildings } from '@solar-icons/react';
import { Button } from '@/components/ui/button';

import { useEmployerProfile } from '../layout';
import { useCompanyForm } from '@/components/forms/hooks/useCompanyForm';

import ModalNoticeReview from '@/components/ui/modal/employer/ModalNoticeReview';
import ConfirmChangeModal from '@/components/ui/modal/employer/ConfirmChangeModal';

import { CountryDropdown } from '@/components/employer/CompanyDetails';
import { useCompanyStore } from '@/app/store/authCompanyStore';

import { companySchema } from '@/validations/companySchema';

export default function CompanyPage() {
  const router = useRouter();
  const clearCompanySession = useCompanyStore((s) => s.clearCompanySession);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { company, loading, error: contextError } = useEmployerProfile();

  const {
    form,
    errors,
    isEditingInfo,
    setIsEditingInfo,
    isEditingFiscales,
    setIsEditingFiscales,
    handleChange,
    handleSaveInfo,
    handleSaveFiscales,
  } = useCompanyForm(company);

  const [showModal, setShowModal] = useState(false);
  const [showModalFiscales, setShowModalFiscales] = useState(false);

  // Estado local para manejar el error específico del RFC validado con Zod
  const [rfcLocalError, setRfcLocalError] = useState<string>('');

  const handleEditClick = () => setShowModal(true);
  const handleEditFiscalesClick = () => setShowModalFiscales(true);

  const handleModalClose = (confirmEdit = false) => {
    setShowModal(false);
    if (confirmEdit) setIsEditingInfo(true);
  };

  const handleModalFiscalesClose = (confirmEdit = false) => {
    setShowModalFiscales(false);
    if (confirmEdit) setIsEditingFiscales(true);
  };

  const confirmAndSave = async () => {
    // Evitamos guardar si hay un error de validación en el RFC
    if (rfcLocalError) return;

    if (isEditingInfo) await handleSaveInfo();
    if (isEditingFiscales) await handleSaveFiscales();

    clearCompanySession();
    router.replace('/login/waiting');
  };

  // Función para manejar exclusivamente los cambios del RFC
  const handleRfcChange = (value: string) => {
    // 1. Forzamos mayúsculas y máximo 13 caracteres
    const formattedRfc = value.toUpperCase().slice(0, 13);
    handleChange('rfc', formattedRfc);

    // 2. Validamos en tiempo real extrayendo solo la regla del RFC del esquema
    if (formattedRfc.length > 0) {
      const result = companySchema.shape.companyRFC.safeParse(formattedRfc);
      if (!result.success) {
        setRfcLocalError(result.error.errors[0].message);
      } else {
        setRfcLocalError('');
      }
    } else {
      setRfcLocalError('Este es un campo requerido.');
    }
  };

  const ReadOnlyBlockRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex flex-col w-full px-6 py-4 border-b border-zinc-100">
      <span className="text-zinc-900 font-medium mb-2">{label}</span>
      <span className="text-zinc-600 text-sm whitespace-pre-wrap break-words w-full leading-relaxed">
        {value || '-'}
      </span>
    </div>
  );

  const sectionConfig = {
    profile: {
      icon: <Buildings size={24} weight="Bold" />,
      title: 'INFORMACIÓN EMPRESARIAL',
      description: 'Consulte y actualice la información de su empresa',
    },
  };

  if (loading) return <div className="p-6">Cargando...</div>;
  if (contextError) return <div className="p-6 text-red-600">{contextError}</div>;
  if (!company) return <div className="p-6">No se encontró información.</div>;

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6 relative">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <ModalNoticeReview
            open={showModal}
            onClose={() => handleModalClose(false)}
            onConfirm={() => handleModalClose(true)}
          />
        </div>
      )}

      {showModalFiscales && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <ModalNoticeReview
            open={showModalFiscales}
            onClose={() => handleModalFiscalesClose(false)}
            onConfirm={() => handleModalFiscalesClose(true)}
          />
        </div>
      )}

      <TitleSection sections={sectionConfig} currentSection="profile" />

      <div className="rounded-lg border border-zinc-300 shadow-sm bg-white">
        <ConfigRow
          title="Información de la empresa"
          valueinput=""
          isTitle
          isEditable={!isEditingInfo}
          editInput={false}
          onEditClick={handleEditClick}
        />

        {isEditingInfo ? (
          <>
            <div className="px-2">
              <ConfigRow
                title="Nombre comercial"
                valueinput={form.nombreEmpresa}
                isEditable
                editInput
                onValueChange={(v) => handleChange('nombreEmpresa', v)}
                externalError={errors.info?.nombreEmpresa}
              />
            </div>

            
            

            <div className="px-2">
              <ConfigRow
                title="Descripción"
                valueinput={form.descripcion}
                isEditable
                editInput
                onValueChange={(v) => handleChange('descripcion', v)}
                externalError={errors.info?.descripcion}
              />
            </div>

            <div className="px-6 py-2">
              <p className="min-w-[150px] py-3">Sector de trabajo</p>
              <Select
                value={form.sectorTrabajo || ''}
                onValueChange={(v) => handleChange('sectorTrabajo', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectorOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.info?.sectorTrabajo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.info.sectorTrabajo}
                </p>
              )}
            </div>

            <div className="px-2">
              <ConfigRow
                title="Código postal"
                valueinput={form.codigoPostal}
                isEditable
                editInput
                onValueChange={(v) => handleChange('codigoPostal', v)}
                externalError={errors.info?.codigoPostal}
              />
            </div>

            <div className="px-6">
              <CountryDropdown
                value={form.pais || ''}
                onChange={(v) => handleChange('pais', v)}
              />
              {errors.info?.pais && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.info.pais}
                </p>
              )}
            </div>

            <div className="px-2">
              <ConfigRow
                title="Dirección"
                valueinput={form.direccion}
                isEditable
                editInput
                onValueChange={(v) => handleChange('direccion', v)}
                externalError={errors.info?.direccion}
              />
            </div>
            <div className="px-2 pb-2">
              <ConfigRow
                title="RFC"
                valueinput={form.rfc}
                isEditable
                editInput
                onValueChange={handleRfcChange}
                externalError={rfcLocalError || errors.info?.rfc}
              />
              
            </div>
            <div className="px-2">
              <ConfigRow
                title="Razón social"
                valueinput={form.razonSocial}
                isEditable
                editInput
                onValueChange={(v) => handleChange('razonSocial', v)}
                externalError={errors.info?.razonSocial}
              />
            </div>

          </>
        ) : (
          <>
            <ReadOnlyBlockRow label="Nombre comercial" value={form.nombreEmpresa} />
            <ReadOnlyBlockRow label="Razón social" value={form.razonSocial} />
            <ReadOnlyBlockRow label="RFC" value={form.rfc} />
            <ReadOnlyBlockRow label="Descripción" value={form.descripcion} />
            <ReadOnlyBlockRow label="Sector de trabajo" value={form.sectorTrabajo} />
            <ReadOnlyBlockRow label="Correo electrónico" value={form.correoContacto} />
            <ReadOnlyBlockRow label="Código postal" value={form.codigoPostal} />
            <ReadOnlyBlockRow label="País" value={form.pais} />
            <ReadOnlyBlockRow label="Dirección" value={form.direccion} />
          </>
        )}
      </div>

      {(isEditingInfo || isEditingFiscales) && (
        <div className="flex justify-end px-6 py-8">
          <Button 
            onClick={() => setShowConfirmModal(true)}
            disabled={!!rfcLocalError}
          >
            Guardar Cambios
          </Button>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <ConfirmChangeModal
            open={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={async () => {
              setShowConfirmModal(false);
              await confirmAndSave();
            }}
          />
        </div>
      )}
    </div>
  );
}