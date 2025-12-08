'use client';
import { useState, useEffect } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { ShieldKeyholeMinimalistic } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/app/store/useUserInfoStore';
export default function Control() {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    email: '',
    phone: '',
    password: '', 
    confirmPassword: '', 
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        email: user.email || '',
        phone: user.phone || '',
        password: '', 
        confirmPassword: '',
      }));
    }
  }, [user]);

  const sectionConfig = {
    access: {
      icon: <ShieldKeyholeMinimalistic size={24} weight="Bold" />,
      title: 'ACCESO Y SEGURIDAD',
      description: 'Administre la información de acceso a su cuenta',
    },
  };

  const handleChange = (key: string, value: string) => {
    if (key === 'phone') {
      const sanitized = value.replace(/\D/g, '');
      setForm((prev) => ({ ...prev, [key]: sanitized }));
    } else {
      setForm((prev) => ({ ...prev, [key]: value }));
    }
    setErrors((prev) => ({ ...prev, [key]: '' }));
    
    if (key === 'password' || key === 'confirmPassword') {
       setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.email.trim()) newErrors.email = 'El correo es requerido';
    if (!form.phone.trim()) newErrors.phone = 'El teléfono es requerido';
    
    if (form.password.length > 0) {
      if (form.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsEditing(true);
      return;
    }

    const payload = {
      email: form.email,
      phone: form.phone,
      password: form.password === '' ? undefined : form.password
    };

    console.log('Guardando cambios de acceso:', payload);

    setErrors({});
    setIsEditing(false);
    setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        email: user.email || '',
        phone: user.phone || '',
        password: '',
        confirmPassword: '',
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        <div className="animate-pulse">Cargando datos de seguridad...</div>
      </div>
    );
  }

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      <TitleSection sections={sectionConfig} currentSection="access" />

      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Acceso"
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
            title="Correo electrónico"
            valueinput={form.email}
            isTitle={false}
            placeholder="correo@ejemplo.com"
            isEditable={false} 
            editInput={false}
            onValueChange={(v) => handleChange('email', v)}
            externalError={errors.email}
          />
          
        </div>

        <div className="px-6">
          <ConfigRow
            title="Número telefónico"
            valueinput={form.phone}
            isTitle={false}
            placeholder="1234567890"
            isEditable={isEditing}
            editInput={isEditing}
            inputType="tel"
            onValueChange={(v) => handleChange('phone', v)}
            externalError={errors.phone}
          />
        </div>

        <div className="px-6">
          <ConfigRow
            title="Contraseña"
            valueinput={isEditing ? form.password : '*************'}
            isTitle={false}
            placeholder={isEditing ? "Escriba nueva contraseña" : ""}
            isEditable={isEditing} 
            editInput={isEditing}
            inputType="password"
            onValueChange={(v) => handleChange('password', v)}
            externalError={errors.password}
          />
        </div>

        {isEditing && (
          <div className="px-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <ConfigRow
              title="Confirmar"
              valueinput={form.confirmPassword}
              isTitle={false}
              placeholder="Escribela nuevamente"
              isEditable={true}
              editInput={true}
              inputType="password"
              onValueChange={(v) => handleChange('confirmPassword', v)}
              externalError={errors.confirmPassword}
            />
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end gap-3 px-6 py-4">
            <Button variant="primary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}