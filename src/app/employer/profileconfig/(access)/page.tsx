'use client';

import React, { useState, useEffect } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { UserCircle } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useEmployerProfile } from '../layout';
import { apiService } from '@/services/api.service';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import Alerts from '@/components/ui/Alerts';
import ConfirmChangePasswordModal from '@/components/ui/modal/ConfirmChangePasswordModal';

import { applicantSchema } from '@/validations/applicantSchema'; 

const DEFAULT_ERROR_MESSAGE = 'Este campo es requerido';

export default function Page() {
  const router = useRouter();
  const { companyAccount, loading, error } = useEmployerProfile();

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    puesto: '',
    celular: '',
    telfijo: '',
    correo: '',
    contrasena: '',
  });

  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>({});
  const [accessErrors, setAccessErrors] = useState<Record<string, string>>({});

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  
  const [lastPassword, setLastPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [alertConfig, setAlertConfig] = useState<{
    isVisible: boolean;
    type: 'error' | 'warning';
    title: string;
    description: string;
  }>({ isVisible: false, type: 'error', title: '', description: '' });

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [isPatchingPassword, setIsPatchingPassword] = useState(false);

  const sectionConfig = {
    profile: {
      title: 'DATOS DE ACCESO',
      icon: <UserCircle size={24} weight="Bold" />,
      description: 'Consulte la información de sus datos de acceso',
    },
  };

  const ReadOnlyRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex w-full items-center justify-between px-6 py-4 border-b border-zinc-100 min-h-[60px]">
      <span className="text-zinc-900 font-medium shrink-0">{label}</span>
      <span className="text-zinc-600 text-sm text-right flex-1 pl-8 break-words">
        {value || '-'}
      </span>
    </div>
  );

  useEffect(() => {
    if (!companyAccount) return;

    setForm({
      nombres: companyAccount.firstName || '',
      apellidos: companyAccount.lastName || '',
      puesto: companyAccount.jobTitle || '',
      celular: companyAccount.cellPhone || '',
      telfijo: companyAccount.landlinePhone || '',
      correo: companyAccount.email || '',
      contrasena: '',
    });
    setLastPassword('');
    setConfirmPassword('');
    setPersonalErrors({});
    setAccessErrors({});
    setAlertConfig(prev => ({ ...prev, isVisible: false }));
    setOpenConfirmModal(false);
    setIsPatchingPassword(false);
  }, [companyAccount]);

  const handleChange = (key: string, value: string) => {
    if ((key === 'celular' || key === 'telfijo') && /\D/.test(value)) {
      setPersonalErrors((e) => ({
        ...e,
        [key]: 'Solo se permiten números',
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [key]: value }));
    setPersonalErrors((e) => ({ ...e, [key]: '' }));
    setAccessErrors((e) => ({ ...e, [key]: '' }));
  };

  const validatePersonalFields = () => {
    const errors: Record<string, string> = {};
    const keys: (keyof typeof form)[] = [
      'nombres',
      'apellidos',
      'puesto',
      'celular',
      'telfijo',
    ];

    keys.forEach((k) => {
      const raw = form[k];
      const v = typeof raw === 'string' ? raw.trim() : raw;

      if (!v || (typeof v === 'string' && v === '')) {
        errors[k] = 'No puede quedar vacío';
      }

      if (
        (k === 'celular' || k === 'telfijo') &&
        typeof v === 'string' &&
        !/^\+?\d*$/.test(v)
      ) {
        errors[k] = 'Debe contener solo números y un "+" inicial';
      }
    });

    return errors;
  };

  const validateAccessFields = () => {
    const errors: Record<string, string> = {};

    const correo = form.correo.trim();
    const newPass = form.contrasena.trim();
    const confirm = confirmPassword.trim();
    const lastPass = lastPassword.trim();

    if (!correo) {
      errors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      errors.correo = 'Correo inválido';
    }

    if (newPass || confirm || lastPass) {
      if (!lastPass) {
        errors.lastPassword = 'Debes ingresar tu contraseña actual';
      }

      if (!newPass) {
        errors.contrasena = DEFAULT_ERROR_MESSAGE;
      }
      if (!confirm) {
        errors.confirmPassword = DEFAULT_ERROR_MESSAGE;
      }

      const baseObjectSchema = applicantSchema instanceof z.ZodEffects 
        ? applicantSchema.innerType() 
        : applicantSchema;
      
      const passwordSchema = (baseObjectSchema as any).pick({ password: true, confirmPassword: true });
      const result = passwordSchema.safeParse({ password: newPass, confirmPassword: confirm });

      if (!result.success) {
        const zodErrors = result.error.format();
        if (zodErrors.password?._errors.length) {
          errors.contrasena = zodErrors.password._errors[0];
        }
        if (zodErrors.confirmPassword?._errors.length) {
          errors.confirmPassword = zodErrors.confirmPassword._errors[0];
        }
      }

      if (!errors.contrasena && !errors.confirmPassword && newPass !== confirm) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    return errors;
  };

  const patchAccount = async (payload: any) => {
    const companyId = localStorage.getItem('companyId');
    const accountId = companyAccount?.id;

    if (!companyId || !accountId) {
      throw new Error('No se encontró companyId o accountId');
    }

    const res = await apiService.patch(
      `/companies/${companyId}/account/${accountId}`,
      payload,
    );

    if (!res) {
      throw new Error('Sin respuesta del servidor');
    }

    if (!res.ok) {
      let errText = `Error ${res.status}`;
      try {
        const errJson = await res.json();
        if (Array.isArray(errJson.message)) {
          errText = errJson.message.join(', ');
        } else {
          errText = errJson.message || errText;
        }
      } catch {
      }
      throw new Error(errText);
    }
  };

  const clearCompanySession = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('companyId');
      localStorage.removeItem('accountId');
    } catch {
    }
  };

  const handleSavePersonal = async () => {
    const errors = validatePersonalFields();
    if (Object.keys(errors).length > 0) {
      setPersonalErrors(errors);
      return;
    }

    const payload = {
      firstName: form.nombres.trim(),
      lastName: form.apellidos.trim(),
      jobTitle: form.puesto.trim(),
      cellPhone: form.celular.trim(),
      landlinePhone: form.telfijo.trim(),
    };

    try {
      await patchAccount(payload);
      setForm((prev) => ({
        ...prev,
        nombres: prev.nombres.trim(),
        apellidos: prev.apellidos.trim(),
        puesto: prev.puesto.trim(),
        celular: prev.celular.trim(),
        telfijo: prev.telfijo.trim(),
      }));
      setPersonalErrors({});
      setIsEditingPersonal(false);
    } catch (err: any) {
      setPersonalErrors((prev) => ({
        ...prev,
        global: 'No se pudieron actualizar los datos personales.',
      }));
    }
  };

  const handleSaveGeneral = async () => {
    setAlertConfig(prev => ({ ...prev, isVisible: false }));

    const errors = validateAccessFields();
    if (Object.keys(errors).length > 0) {
      setAccessErrors(errors);
      return;
    }

    setAccessErrors({});
    
    if (form.contrasena.length > 0) {
      setOpenConfirmModal(true);
    } else {
      executeSaveContact(); 
    }
  };

  const executeSaveContact = async () => {
    const payload = {
      firstName: form.nombres.trim(),
      lastName: form.apellidos.trim(),
      jobTitle: form.puesto.trim(),
      cellPhone: form.celular.trim(),
      landlinePhone: form.telfijo.trim(),
    };
    try {
      await patchAccount(payload);
      setIsEditingGeneral(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmChangePassword = async () => {
    const payload = {
      firstName: form.nombres.trim(),
      lastName: form.apellidos.trim(),
      jobTitle: form.puesto.trim(),
      cellPhone: form.celular.trim(),
      landlinePhone: form.telfijo.trim(),
      lastPassword: lastPassword.trim(),
      newPassword: form.contrasena.trim(),
    };

    try {
      setIsPatchingPassword(true);
      await patchAccount(payload);

      clearCompanySession();
      router.replace('/login/company');
    } catch (err: any) {
      console.error(err);

      let customErrorMessage = 'Datos incorrectos, inténtalo nuevamente.';
      const backendError = err.message || '';

      if (backendError.includes('Current password is incorrect')) {
        customErrorMessage = 'La contraseña actual es incorrecta.';
      } else if (backendError.includes('New password must be different from last password')) {
        customErrorMessage = 'La contraseña actual y nueva deben ser diferentes.';
      }

      setAlertConfig({
        isVisible: true,
        type: 'error',
        title: 'Error al cambiar contraseña',
        description: customErrorMessage,
      });

      setIsEditingGeneral(true);
    } finally {
      setIsPatchingPassword(false);
      setOpenConfirmModal(false);
    }
  };

  if (loading) {
    return (
      <div className="mr-20 space-y-6 p-4 md:p-6">
        <p>Cargando datos de acceso...</p>
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

  if (!companyAccount) {
    return (
      <div className="mr-20 space-y-6 p-4 md:p-6">
        <p>No se encontró información del contacto de la empresa.</p>
      </div>
    );
  }

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6 relative">
      <TitleSection sections={sectionConfig} currentSection="profile" />

      <Alerts
        isVisible={alertConfig.isVisible}
        onClose={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
        type={alertConfig.type}
        title={alertConfig.title}
        description={alertConfig.description}
      />

      {/* BLOQUE DATOS GENERALES */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Información general"
          valueinput=""
          isTitle={true}
          isEditable={true}
          editInput={false}
          onEditClick={() => setIsEditingPersonal(!isEditingPersonal)}
        />

        <div className="w-full">
          {isEditingPersonal ? (
            <div className="px-6">
              <ConfigRow
                title="Nombres"
                valueinput={form.nombres}
                isTitle={false}
                isEditable={true}
                editInput={true}
                onValueChange={(v) => handleChange('nombres', v)}
                externalError={personalErrors.nombres}
              />
            </div>
          ) : (
            <ReadOnlyRow label="Nombres" value={form.nombres} />
          )}
        </div>

        <div className="w-full">
          {isEditingPersonal ? (
            <div className="px-6">
              <ConfigRow
                title="Apellidos"
                valueinput={form.apellidos}
                isTitle={false}
                isEditable={true}
                editInput={true}
                onValueChange={(v) => handleChange('apellidos', v)}
                externalError={personalErrors.apellidos}
              />
            </div>
          ) : (
            <ReadOnlyRow label="Apellidos" value={form.apellidos} />
          )}
        </div>

        <div className="w-full">
          {isEditingPersonal ? (
            <div className="px-6">
              <ConfigRow
                title="Puesto"
                valueinput={form.puesto}
                isTitle={false}
                isEditable={true}
                editInput={true}
                onValueChange={(v) => handleChange('puesto', v)}
                externalError={personalErrors.puesto}
              />
            </div>
          ) : (
            <ReadOnlyRow label="Puesto" value={form.puesto} />
          )}
        </div>

        <div className="w-full">
          {isEditingPersonal ? (
            <div className="px-6">
              <ConfigRow
                title="Celular"
                valueinput={form.celular}
                isTitle={false}
                isEditable={true}
                editInput={true}
                onValueChange={(v) => handleChange('celular', v)}
                externalError={personalErrors.celular}
              />
            </div>
          ) : (
            <ReadOnlyRow label="Celular" value={form.celular} />
          )}
        </div>

        <div className="w-full">
          {isEditingPersonal ? (
            <div className="px-6">
              <ConfigRow
                title="Teléfono fijo"
                valueinput={form.telfijo}
                isTitle={false}
                isEditable={true}
                editInput={true}
                onValueChange={(v) => handleChange('telfijo', v)}
                externalError={personalErrors.telfijo}
              />
            </div>
          ) : (
            <ReadOnlyRow label="Teléfono fijo" value={form.telfijo} />
          )}
        </div>

        {personalErrors.global && (
          <p className="px-6 pb-2 text-sm text-red-600">{personalErrors.global}</p>
        )}

        {isEditingPersonal && (
          <div className="flex justify-end px-6 pb-4 pt-2">
            <Button variant="primary" onClick={handleSavePersonal}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>

      {/* BLOQUE DATOS DE ACCESO */}
      <div className="rounded-lg border border-zinc-300 shadow-sm mt-6 bg-white">
        <ConfigRow
          title="Información de acceso"
          valueinput=""
          isTitle={true}
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            setAlertConfig(prev => ({ ...prev, isVisible: false }));
            setAccessErrors({});
            setLastPassword('');
            setConfirmPassword('');
            setForm((p) => ({ ...p, contrasena: '' }));
            setIsEditingGeneral((s) => !s);
          }}
        />

        <div className="px-6">
          <ConfigRow
            title="Correo electrónico"
            valueinput={form.correo}
            placeholder="ejemplo@correo.com"
            isEditable={false}
            editInput={false}
            externalError={accessErrors.correo}
          />
        </div>

        {!isEditingGeneral && (
          <div className="px-6">
            <ConfigRow
              title="Contraseña"
              valueinput="*************"
              isTitle={false}
              placeholder=""
              isEditable={false}
              editInput={false}
              inputType="text"
            />
          </div>
        )}

        {isEditingGeneral && (
          <>
            <div className="px-6">
              <ConfigRow
                title="Contraseña actual"
                inputType="password"
                valueinput={lastPassword}
                placeholder="Ingresa tu contraseña actual"
                isEditable={true}
                editInput={true}
                onValueChange={(v) => {
                  setLastPassword(v);
                  setAccessErrors(e => ({ ...e, lastPassword: '' }));
                }}
                externalError={accessErrors.lastPassword}
              />
            </div>

            <div className="px-6">
              <ConfigRow
                title="Nueva contraseña"
                inputType="password"
                valueinput={form.contrasena}
                placeholder="Nueva contraseña"
                isEditable={true}
                editInput={true}
                onValueChange={(v) => handleChange('contrasena', v)}
                externalError={accessErrors.contrasena}
              />
            </div>

            <div className="px-6">
              <ConfigRow
                title="Repite contraseña"
                inputType="password"
                valueinput={confirmPassword}
                placeholder="Repite tu nueva contraseña"
                isEditable={true}
                editInput={true}
                onValueChange={(v) => {
                  setConfirmPassword(v);
                  setAccessErrors(e => ({ ...e, confirmPassword: '' }));
                }}
                externalError={accessErrors.confirmPassword}
              />
            </div>
          </>
        )}

        {accessErrors.global && (
          <p className="px-6 pb-2 text-sm text-red-600">{accessErrors.global}</p>
        )}

        {isEditingGeneral && (
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 px-6 pb-4 pt-2">
            <Button variant="primary" onClick={handleSaveGeneral}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>

      <ConfirmChangePasswordModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={handleConfirmChangePassword}
      />
    </div>
  );
}