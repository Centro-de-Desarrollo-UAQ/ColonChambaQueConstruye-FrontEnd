'use client';
import { useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { ShieldKeyholeMinimalistic } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';

export default function Control() {
  const sectionConfig = {
    profile: {
      icon: <ShieldKeyholeMinimalistic size={24} weight="Bold" />,
      title: 'ACCESO Y SEGURIDAD',
      description: 'Administre la información de acceso a su cuenta',
    },
  };

  type EditingState = { access: boolean };
  const [editing, setEditing] = useState<EditingState>({ access: false });

  const setEditingSection = (section: keyof EditingState, value: boolean, exclusive = false) => {
    setEditing((prev) => (exclusive ? { [section]: value } as EditingState : { ...prev, [section]: value }));
  };

  const [form, setForm] = useState({
    email: 'bryanbona0406@gmail.com',
    phone: '4423464978',
    password: '*************',
  });

  const methods = useForm({
    defaultValues: form,
  });

  const [phoneError, setPhoneError] = useState('');

  const handleToggleEdit = () => {
    methods.reset(form);
    setEditingSection('access', !editing.access);
    setPhoneError('');
  };

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAccess = async () => {
    // Fuerza validación de campos registrados en RHF
    const valid = await methods.trigger();
    if (!valid) return;

    const data = methods.getValues();
    // Trim valores de texto
    const trimmed = {
      email: typeof data.email === 'string' ? data.email.trim() : data.email,
      phone: typeof data.phone === 'string' ? data.phone.trim() : data.phone,
      password: typeof data.password === 'string' ? data.password.trim() : data.password,
    };

    // Validar teléfono: no vacío y solo dígitos (si está en modo editable)
    if (editing.access) {
      if (!trimmed.phone || trimmed.phone === '') {
        setPhoneError('El teléfono es requerido');
        return;
      }
      if (!/^\d+$/.test(trimmed.phone)) {
        setPhoneError('El número telefónico solo debe contener números.');
        return;
      }
    }

    setPhoneError('');
    setForm((prev) => ({ ...prev, ...trimmed }));
    console.log('Saving access data:', trimmed);
    setEditingSection('access', false);
    methods.reset(trimmed);
  };

  // Define which rows are editable at all
  const emailEditable = false; // si es false nunca se activará el editor para esta fila
  const phoneEditable = true;
  const passwordEditable = false;

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de Acceso */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Acceso"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={handleToggleEdit}
        />

        <FormProvider {...methods}>
          {/* Fila 1 - Correo electrónico */}
          <div className="px-6">
            <ConfigRow
              name="email"
              title="Correo electrónico"
              valueinput={form.email}
              isTitle={false}
              placeholder="Contenido"
              isEditable={emailEditable}
              editInput={editing.access && emailEditable}
              rules={{
                required: editing.access ? 'El correo es requerido' : false,
                validate: (v: any) => (typeof v === 'string' ? v.trim() !== '' : !!v) || 'No puede quedar vacío',
              }}
              onValueChange={(v) =>
                editing.access ? methods.setValue('email', v) : handleChange('email', v)
              }
            />
          </div>

          {/* Fila 2 - Número telefónico */}
          <div className="px-6">
            <ConfigRow
              name="phone"
              title="Número telefónico"
              valueinput={form.phone}
              isTitle={false}
              placeholder="Contenido"
              isEditable={phoneEditable}
              editInput={editing.access && phoneEditable}
              inputType="tel"
              rules={
                editing.access
                  ? {
                      required: 'El teléfono es requerido',
                      pattern: { value: /^\d+$/, message: 'Solo se permiten números' },
                      validate: (v: any) => (typeof v === 'string' ? v.trim() !== '' : !!v) || 'No puede quedar vacío',
                    }
                  : undefined
              }
              onValueChange={(v) => {
                // sanitizar: permitir solo dígitos mientras se escribe
                const sanitized = v.replace(/\D/g, '');
                if (editing.access) {
                  methods.setValue('phone', sanitized);
                } else {
                  handleChange('phone', sanitized);
                }
                if (phoneError) setPhoneError('');
              }}
            />
            {editing.access && phoneError && <div className="mt-2 text-sm text-red-600">{phoneError}</div>}
          </div>

          {/* Fila 3 - Contraseña */}
          <div className="px-6">
            <ConfigRow
              name="password"
              title="Contraseña"
              valueinput={form.password}
              isTitle={false}
              placeholder="Contenido"
              isEditable={passwordEditable}
              editInput={editing.access && passwordEditable}
              rules={
                editing.access && passwordEditable
                  ? {
                      required: 'La contraseña es requerida',
                      validate: (v: any) => (typeof v === 'string' ? v.trim() !== '' : !!v) || 'No puede quedar vacío',
                    }
                  : undefined
              }
              onValueChange={(v) =>
                editing.access ? methods.setValue('password', v) : handleChange('password', v)
              }
            />
          </div>
        </FormProvider>

        {editing.access && (
          <div className="flex justify-end px-6 py-4">
            <Button variant="primary" onClick={handleSaveAccess}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
