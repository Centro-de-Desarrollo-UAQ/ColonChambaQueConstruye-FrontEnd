'use client';

import React, { useEffect, useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { UserCircle } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useEmployerProfile } from '../layout';
import { apiService } from '@/services/api.service';

export default function Page() {
  const { companyAccount, loading, error } = useEmployerProfile();

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastPassword, setLastPassword] = useState('');

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    puesto: '',
    celular: '',
    telfijo: '',
    correo: '',
    contrasena: '', // nueva contraseña (newPassword)
  });

  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>(
    {},
  );
  const [accessErrors, setAccessErrors] = useState<Record<string, string>>({});

  const sectionConfig = {
    profile: {
      title: 'DATOS DE ACCESO',
      icon: <UserCircle size={24} weight="Bold" />,
      description: 'Consulte la información de sus datos de acceso',
    },
  };

  // Hidratar form con datos del backend
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
    setConfirmPassword('');
    setLastPassword('');
    setPersonalErrors({});
    setAccessErrors({});
  }, [companyAccount]);

  /* ---------------- helpers ---------------- */

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
      !/^\+?\d*$/.test(v)          // 👈 mismo patrón aquí
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
    const last = lastPassword.trim();

    if (!correo) {
      errors.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      errors.correo = 'Correo inválido';
    }

    if (!newPass) {
      errors.contrasena = 'La nueva contraseña es obligatoria';
    }

    if (!confirm) {
      errors.confirmPassword = 'Debes repetir la nueva contraseña';
    } else if (newPass && confirm && newPass !== confirm) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!last) {
      errors.lastPassword = 'Debes ingresar tu contraseña anterior';
    }

    return errors;
  };

  // helper para patch
  const patchAccount = async (payload: any) => {
    const companyId = localStorage.getItem('companyId');
    const accountId = companyAccount?.id;

    if (!companyId || !accountId) {
      console.error('Falta companyId o accountId');
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
        console.error('Error PATCH', errJson);
        errText = errJson.message || errText;
      } catch {
        // ignore
      }
      throw new Error(errText);
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
      console.log('Datos personales actualizados ');

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
      console.error(err);
      setPersonalErrors((prev) => ({
        ...prev,
        global: 'No se pudieron actualizar los datos personales.',
      }));
    }
  };

 

  const handleSaveGeneral = async () => {
    const errors = validateAccessFields();
    if (Object.keys(errors).length > 0) {
      setAccessErrors(errors);
      return;
    }

    const payload = {
      firstName: form.nombres.trim(),
      lastName: form.apellidos.trim(),
      jobTitle: form.puesto.trim(),
      cellPhone: form.celular.trim(),
      landlinePhone: form.telfijo.trim(),
      lastPassword: lastPassword.trim(),
      newPassword: form.contrasena.trim(),
      // si en el futuro el DTO acepta email, aquí podrías añadirlo
    };

    try {
      await patchAccount(payload);
      console.log('Datos de acceso actualizados ');

      setForm((prev) => ({
        ...prev,
        correo: prev.correo.trim(),
        contrasena: prev.contrasena.trim(),
      }));
      setLastPassword('');
      setConfirmPassword('');
      setAccessErrors({});
      setIsEditingGeneral(false);
    } catch (err: any) {
      console.error(err);
      setAccessErrors((prev) => ({
        ...prev,
        global: 'No se pudieron actualizar los datos de acceso.',
      }));
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
    <div className="mr-20 space-y-6 p-4 md:p-6">
      <TitleSection sections={sectionConfig} currentSection="profile" />

      
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Información general"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            setPersonalErrors({});
            setIsEditingPersonal((s) => !s);
          }}
        />

        <ConfigRow
          title="Nombres"
          valueinput={form.nombres}
          placeholder=""
          isEditable={isEditingPersonal}
          editInput={isEditingPersonal}
          onValueChange={(v) => handleChange('nombres', v)}
          externalError={personalErrors.nombres}
        />
        <ConfigRow
          title="Apellidos"
          valueinput={form.apellidos}
          placeholder=""
          isEditable={isEditingPersonal}
          editInput={isEditingPersonal}
          onValueChange={(v) => handleChange('apellidos', v)}
          externalError={personalErrors.apellidos}
        />
        <ConfigRow
          title="Puesto"
          valueinput={form.puesto}
          placeholder=""
          isEditable={isEditingPersonal}
          editInput={isEditingPersonal}
          onValueChange={(v) => handleChange('puesto', v)}
          externalError={personalErrors.puesto}
        />
        <ConfigRow
          title="Celular"
          valueinput={form.celular}
          placeholder=""
          isEditable={isEditingPersonal}
          editInput={isEditingPersonal}
          onValueChange={(v) => handleChange('celular', v)}
          externalError={personalErrors.celular}
        />
        <ConfigRow
          title="Teléfono fijo"
          valueinput={form.telfijo}
          placeholder=""
          isEditable={isEditingPersonal}
          editInput={isEditingPersonal}
          onValueChange={(v) => handleChange('telfijo', v)}
          externalError={personalErrors.telfijo}
        />

        {personalErrors.global && (
          <p className="px-6 pb-2 text-sm text-red-600">
            {personalErrors.global}
          </p>
        )}

        {isEditingPersonal && (
          <div className="flex justify-end px-6 pb-4 pt-2">
            <Button variant="primary" onClick={handleSavePersonal}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>

      {/* INFORMACIÓN DE ACCESO */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Información de acceso"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            setAccessErrors({});
            setConfirmPassword('');
            setLastPassword('');
            setIsEditingGeneral((s) => !s);
          }}
        />

        <ConfigRow
          title="Correo electrónico"
          valueinput={form.correo}
          placeholder="ejemplo@correo.com"
          isEditable={false}         // correo solo lectura por ahora
          editInput={false}
          externalError={accessErrors.correo}
        />

        <ConfigRow
          title="Nueva contraseña"
          inputType="password"
          valueinput={form.contrasena}
          isEditable={isEditingGeneral}
          editInput={isEditingGeneral}
          onValueChange={(v) => handleChange('contrasena', v)}
          externalError={accessErrors.contrasena}
        />

        {isEditingGeneral && (
          <>
            <ConfigRow
              title="Repite contraseña"
              valueinput={confirmPassword}
              placeholder="Repite tu nueva contraseña"
              isEditable={true}
              editInput={true}
              onValueChange={(v) => setConfirmPassword(v)}
              inputType="password"
              externalError={accessErrors.confirmPassword}
            />

            <ConfigRow
              title="Última contraseña"
              valueinput={lastPassword}
              placeholder="Tu contraseña anterior"
              isEditable={true}
              editInput={true}
              onValueChange={(v) => setLastPassword(v)}
              inputType="password"
              externalError={accessErrors.lastPassword}
            />
          </>
        )}

        {accessErrors.global && (
          <p className="px-6 pb-2 text-sm text-red-600">
            {accessErrors.global}
          </p>
        )}

        {isEditingGeneral && (
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 px-6 pb-4 pt-2">
            <Button variant="primary" onClick={handleSaveGeneral}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
