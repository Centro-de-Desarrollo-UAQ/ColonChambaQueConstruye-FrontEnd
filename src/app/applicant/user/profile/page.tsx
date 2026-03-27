'use client';
import { useState, useEffect } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { UserCircle } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/app/store/useUserInfoStore';
import { useApplicantStore } from '@/app/store/authApplicantStore';

import Alert from '@/components/ui/Alerts'; // <-- Ajustado para que coincida con tu import y uso

export default function Profile() {
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

  // Adaptado para almacenar todo lo que el componente Alert necesita
  const [alertConfig, setAlertConfig] = useState<{
    isVisible: boolean;
    type: 'error' | 'warning';
    title: string;
    description: string;
  }>({ isVisible: false, type: 'error', title: '', description: '' });

  useEffect(() => {
    if (!user) return;
    setForm({
      nombre: user.firstName || '',
      apellido: user.lastName || '',
      direccion: user.address || '',
      fechaNacimiento: user.birthDate || '',
    });
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

  const handleSave = async () => {
    const errors = validateProfileFields();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      setIsEditing(true);
      return;
    }

    setIsSaving(true);
    setAlertConfig(prev => ({ ...prev, isVisible: false }));

    try {
      const payload = {
        firstName: form.nombre.trim(),
        lastName: form.apellido.trim(),
        address: form.direccion.trim(),
        birthDate: form.fechaNacimiento,
      };

      const response = await fetch(`/api/v1/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al actualizar el perfil');

      await response.json().catch(() => null);

      updateLocalUser({
        firstName: payload.firstName,
        lastName: payload.lastName,
        address: payload.address,
        birthDate: payload.birthDate,
      });

      setProfileErrors({});
      setIsEditing(false);
      
      // Ojo: Si tu Alert no soporta 'success', usamos 'warning' temporalmente
      // Si ya le agregaste 'success' a tu Alert.tsx, puedes cambiarlo aquí
      setAlertConfig({ 
        isVisible: true, 
        type: 'warning', // o 'success'
        title: 'Éxito', 
        description: 'Perfil actualizado correctamente' 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlertConfig({ 
        isVisible: true, 
        type: 'error', 
        title: 'Error', 
        description: 'Hubo un problema al guardar los cambios.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

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
    setAlertConfig(prev => ({ ...prev, isVisible: false }));
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

      {/* Renderizado correcto de Alert según su interfaz */}
      <Alert 
        isVisible={alertConfig.isVisible}
        onClose={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
        type={alertConfig.type}
        title={alertConfig.title}
        description={alertConfig.description}
      />

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
            valueinput={form.fechaNacimiento ? form.fechaNacimiento.split('T')[0].split('-').reverse().join('/') : ''}
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