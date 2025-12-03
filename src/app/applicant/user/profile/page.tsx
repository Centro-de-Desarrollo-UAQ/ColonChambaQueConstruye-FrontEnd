'use client';
import { useState, useEffect } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { UserCircle } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/app/store/useUserInfoStore';
import { useApplicantStore } from '@/app/store/authApplicantStore';

export default function Profile() {
  // 1. HOOKS Y STORE
  const { user, updateLocalUser } = useUserStore();
  const { token, id: userId } = useApplicantStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    fechaNacimiento: '',
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // 2. SINCRONIZACIÓN STORE -> FORMULARIO LOCAL
  useEffect(() => {
    if (user) {
      setForm({
        nombre: user.firstName || '',
        apellido: user.lastName || '',
        direccion: user.address || '',
        fechaNacimiento: user.birthDate || '', 
      });
    }
  }, [user]);

  const sectionConfig = {
    profile: {
      icon: <UserCircle size={24} weight="Bold" />,
      title: 'INFORMACIÓN DE CONTACTO',
      description: 'Consulte y actualice su información personal',
    },
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setProfileErrors((e) => ({ ...e, [key]: '' }));
  };

  const validateProfileFields = () => {
    const errors: Record<string, string> = {};
    const requiredFields = ['nombre', 'apellido', 'direccion', 'fechaNacimiento'];
    requiredFields.forEach((k) => {
      const v = (form as any)[k];
      if (!v || (typeof v === 'string' && v.trim() === '')) {
        errors[k] = 'No puede quedar vacío';
      }
    });
    return errors;
  };

  // 3. LOGICA DE GUARDADO (UPDATE)
  const handleSave = async () => {
    // A. Validaciones locales
    const errors = validateProfileFields();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      setIsEditing(true);
      return;
    }

    setIsSaving(true);

    try {
      // B. Preparar Payload (Formulario -> API JSON)
      const payload = {
        firstName: form.nombre.trim(),
        lastName: form.apellido.trim(),
        address: form.direccion.trim(),
        birthDate: form.fechaNacimiento,
      };

      console.log('Enviando actualización:', payload);

      // C. Petición a la API (PATCH)
      const response = await fetch(`/api/v1/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      const result = await response.json();
      console.log('✅ Actualización exitosa:', result);

      // D. Actualizar el Store Global (Optimistic Update)
      updateLocalUser({
        firstName: payload.firstName,
        lastName: payload.lastName,
        address: payload.address,
        birthDate: payload.birthDate
      });

      setProfileErrors({});
      setIsEditing(false);

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Hubo un problema al guardar los cambios. Intente nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handler para cancelar y revertir cambios
  const handleCancel = () => {
    if (user) {
      setForm({
        nombre: user.firstName || '',
        apellido: user.lastName || '',
        direccion: user.address || '',
        fechaNacimiento: user.birthDate || '', 
      });
    }
    setProfileErrors({});
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        <div className="animate-pulse">Cargando información...</div>
      </div>
    );
  }

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      <TitleSection sections={sectionConfig} currentSection="profile" />

      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Perfil"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            if (isEditing) handleCancel();
            else setIsEditing(true);
          }}
        />

        <div className="px-6">
          <ConfigRow
            title="Nombre"
            valueinput={form.nombre}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditing}
            editInput={isEditing}
            onValueChange={(v) => handleChange('nombre', v)}
            externalError={profileErrors.nombre}
          />
        </div>

        <div className="px-6">
          <ConfigRow
            title="Apellido"
            valueinput={form.apellido}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditing}
            editInput={isEditing}
            onValueChange={(v) => handleChange('apellido', v)}
            externalError={profileErrors.apellido}
          />
        </div>

        <div className="px-6">
          <ConfigRow
            title="Dirección"
            valueinput={form.direccion}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditing}
            editInput={isEditing}
            onValueChange={(v) => handleChange('direccion', v)}
            externalError={profileErrors.direccion}
          />
        </div>

        <div className="px-6">
          <ConfigRow
            title="Fecha de nacimiento"
            valueinput={form.fechaNacimiento}
            isTitle={false}
            placeholder="Contenido"
            isEditable={isEditing}
            editInput={false}
            onValueChange={(v) => handleChange('fechaNacimiento', v)}
            externalError={profileErrors.fechaNacimiento}
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 px-6 py-4">
            <Button variant="primary" onClick={handleCancel} disabled={isSaving}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}