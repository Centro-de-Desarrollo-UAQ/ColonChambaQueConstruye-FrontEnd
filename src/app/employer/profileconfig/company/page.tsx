'use client';

import React, { useEffect, useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { Buildings } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useEmployerProfile } from '../layout';
import { apiService } from '@/services/api.service';

export default function CompanyPage() {
  const { company, loading, error } = useEmployerProfile();

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingFiscales, setIsEditingFiscales] = useState(false);

 
  const [form, setForm] = useState({
    nombreEmpresa: '',
    descripcion: '',
    sectorTrabajo: '',
    correoContacto: '',
    codigoPostal: '',
    pais: '',
    direccion: '',
    rfc: '',
    razonSocial: '',
  });

  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [fiscalErrors, setFiscalesErrors] = useState<Record<string, string>>({});

  const sectionConfig = {
    profile: {
      icon: <Buildings size={24} weight="Bold" />,
      title: 'INFORMACIÓN EMPRESARIAL',
      description: 'Consulte y actualice la información de su empresa',
    },
  };


  useEffect(() => {
    if (!company) return;

    setForm({
      nombreEmpresa: company.tradeName || '',
      descripcion: company.description || '',
      sectorTrabajo: company.workSector || '',
      correoContacto: company.companyEmail || '',
      codigoPostal: company.zipCode || '',
      pais: company.country || '',
      direccion: `${company.street} ${company.streetNumber}, ${company.district}, ${company.municipality}, ${company.state}`,
      rfc: company.rfc || '',
      razonSocial: company.legalName || '',
    });
    setInfoErrors({});
    setFiscalesErrors({});
  }, [company]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setInfoErrors((e) => ({ ...e, [key]: '' }));
    setFiscalesErrors((e) => ({ ...e, [key]: '' }));
  };

  const validateInfoFields = () => {
    const errors: Record<string, string> = {};
    const keys: (keyof typeof form)[] = [
      'nombreEmpresa',
      'descripcion',
      'sectorTrabajo',
      'codigoPostal',
      'pais',
      'direccion',
    ];

    keys.forEach((k) => {
      const raw = form[k];
      const v = typeof raw === 'string' ? raw.trim() : raw;
      if (!v || (typeof v === 'string' && v === '')) {
        errors[k as string] = 'No puede quedar vacío';
      }
    });

    return errors;
  };

  const validateFiscalesFields = () => {
    const errors: Record<string, string> = {};
    const keys: (keyof typeof form)[] = ['rfc', 'razonSocial'];

    keys.forEach((k) => {
      const raw = form[k];
      const v = typeof raw === 'string' ? raw.trim() : raw;
      if (!v || (typeof v === 'string' && v === '')) {
        errors[k as string] = 'No puede quedar vacío';
      }
    });

    return errors;
  };


  const updateCompany = async () => {
    if (!company) throw new Error('No hay datos de company en el contexto');

    const companyId = localStorage.getItem('companyId');
    if (!companyId) {
      throw new Error('No se encontró companyId en localStorage');
    }

    // Usamos valores del form para lo editable y del company para lo demás
    const payload = {
      tradeName: form.nombreEmpresa.trim(),
      legalName: (form.razonSocial || company.legalName || '').trim(),
      zipCode: form.codigoPostal.trim(),
      street: company.street || '',
      streetNumber: company.streetNumber || '',
      state: company.state || '',
      district: company.district || '',
      municipality: company.municipality || '',
      country: form.pais.trim(),
      investmentCountry: company.investmentCountry || company.country || '',
      totalWorkers: company.totalWorkers ?? 0,
      rfc: (form.rfc || company.rfc || '').trim(),
      description: form.descripcion.trim(),
      companyEmail: company.companyEmail || '',
      workSector: form.sectorTrabajo.trim(),
    };

    const res = await apiService.put(`/companies/${companyId}`, payload);

    if (!res) {
      throw new Error('Sin respuesta del servidor');
    }

    if (!res.ok) {
      let errText = `Error ${res.status}`;
      try {
        const errJson = await res.json();
        console.error('Error PUT company', errJson);
        errText = errJson.message || errText;
      } catch {
        // ignore
      }
      throw new Error(errText);
    }
  };

  const handleSaveInfo = async () => {
    const errors = validateInfoFields();
    if (Object.keys(errors).length > 0) {
      setInfoErrors(errors);
      setIsEditingInfo(true);
      return;
    }

    try {
      await updateCompany();
      console.log('Información de la empresa actualizada ✅');

      setForm((prev) => ({
        ...prev,
        nombreEmpresa: prev.nombreEmpresa.trim(),
        descripcion: prev.descripcion.trim(),
        sectorTrabajo: prev.sectorTrabajo.trim(),
        codigoPostal: prev.codigoPostal.trim(),
        pais: prev.pais.trim(),
        direccion: prev.direccion.trim(),
      }));
      setInfoErrors({});
      setIsEditingInfo(false);
    } catch (err: any) {
      console.error(err);
      setInfoErrors((prev) => ({
        ...prev,
        global: 'No se pudo actualizar la información de la empresa.',
      }));
    }
  };

  const handleSaveFiscales = async () => {
    const errors = validateFiscalesFields();
    if (Object.keys(errors).length > 0) {
      setFiscalesErrors(errors);
      setIsEditingFiscales(true);
      return;
    }

    try {
      await updateCompany();
      console.log('Datos fiscales actualizados ✅');

      setForm((prev) => ({
        ...prev,
        rfc: prev.rfc.trim(),
        razonSocial: prev.razonSocial.trim(),
      }));
      setFiscalesErrors({});
      setIsEditingFiscales(false);
    } catch (err: any) {
      console.error(err);
      setFiscalesErrors((prev) => ({
        ...prev,
        global: 'No se pudieron actualizar los datos fiscales.',
      }));
    }
  };

  // Estados de carga / error
  if (loading) {
    return (
      <div className="mr-20 space-y-6 p-4 md:p-6">
        <p>Cargando información de la empresa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mr-20 space-y-6 p-4 md:p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="mr-20 space-y-6 p-4 md:p-6">
        <p>No se encontró información de la empresa.</p>
      </div>
    );
  }

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de Información */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Información de la empresa"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            setInfoErrors({});
            setIsEditingInfo((s) => !s);
          }}
        />

        {/* Nombre */}
        <div className="px-6">
          <ConfigRow
            title="Nombre"
            valueinput={form.nombreEmpresa}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('nombreEmpresa', v)}
            externalError={infoErrors.nombreEmpresa}
          />
        </div>

        {/* Descripción */}
        <div className="px-6">
          {isEditingInfo ? (
            <ConfigRow
              title="Descripción"
              valueinput={form.descripcion}
              isTitle={false}
              placeholder="Contenido"
              isEditable={isEditingInfo}
              editInput={isEditingInfo}
              onValueChange={(v) => handleChange('descripcion', v)}
              externalError={infoErrors.descripcion}
            />
          ) : (
            <div className="flex w-full items-center px-4 border-b border-zinc-100">
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center min-w-0">
                  <p className="min-w-[150px] py-3">Descripción</p>
                  <div className="flex-1">
                    <div className="text-sm text-zinc-600 whitespace-pre-wrap">
                      {form.descripcion}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-auto py-6 shrink-0" />
            </div>
          )}
        </div>

        {/* Sector */}
        <div className="px-6">
          <ConfigRow
            title="Sector de trabajo"
            valueinput={form.sectorTrabajo}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('sectorTrabajo', v)}
            externalError={infoErrors.sectorTrabajo}
          />
        </div>

        {/* Correo de contacto (solo lectura) */}
        <div className="px-6">
          <ConfigRow
            title="Correo electrónico"
            valueinput={form.correoContacto}
            isTitle={false}
            placeholder="Contenido"
            isEditable={false}
            editInput={false}
            externalError={infoErrors.correoContacto}
          />
        </div>

        {/* Código Postal */}
        <div className="px-6">
          <ConfigRow
            title="Código postal"
            valueinput={form.codigoPostal}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('codigoPostal', v)}
            externalError={infoErrors.codigoPostal}
          />
        </div>

        {/* País */}
        <div className="px-6">
          <ConfigRow
            title="País"
            valueinput={form.pais}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('pais', v)}
            externalError={infoErrors.pais}
          />
        </div>

        {/* Dirección */}
        <div className="px-6">
          <ConfigRow
            title="Dirección"
            valueinput={form.direccion}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingInfo}
            editInput={isEditingInfo}
            onValueChange={(v) => handleChange('direccion', v)}
            externalError={infoErrors.direccion}
          />
        </div>

        {infoErrors.global && (
          <p className="px-6 pb-2 text-sm text-red-600">
            {infoErrors.global}
          </p>
        )}

        {isEditingInfo && (
          <div className="flex justify-end px-6 py-4">
            <Button variant="primary" onClick={handleSaveInfo}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>

      {/* Datos fiscales */}
      <div className="rounded-lg border border-zinc-300 shadow-sm mt-6">
        <div>
          <ConfigRow
            title="Datos fiscales"
            valueinput=""
            isTitle={true}
            placeholder=""
            isEditable={true}
            editInput={false}
            onEditClick={() => {
              setFiscalesErrors({});
              setIsEditingFiscales((s) => !s);
            }}
          />
        </div>

        <div className="px-6">
          <ConfigRow
            title="RFC"
            valueinput={form.rfc}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingFiscales}
            editInput={isEditingFiscales}
            onValueChange={(v) => handleChange('rfc', v)}
            externalError={fiscalErrors.rfc}
          />
        </div>

        <div className="px-6">
          <ConfigRow
            title="Razón Social"
            valueinput={form.razonSocial}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditingFiscales}
            editInput={isEditingFiscales}
            onValueChange={(v) => handleChange('razonSocial', v)}
            externalError={fiscalErrors.razonSocial}
          />
        </div>

        {fiscalErrors.global && (
          <p className="px-6 pb-2 text-sm text-red-600">
            {fiscalErrors.global}
          </p>
        )}

        {isEditingFiscales && (
          <div className="flex justify-end px-6 py-4">
            <Button variant="primary" onClick={handleSaveFiscales}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
