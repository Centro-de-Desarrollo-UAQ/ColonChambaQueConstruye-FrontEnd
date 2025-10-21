'use client';
import { useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { UserCircle } from '@solar-icons/react';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  //Manejador de estado de los datos dentro de la configuración
  const [form, setForm] = useState({
    nombre: 'Jane',
    apellido: 'Daw',
    direccion: '88605 Shanelle Viaduct',
    fechaNacimiento: '27/10/2002',
  });

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  const sectionConfig = {
    profile: {
      icon: <UserCircle size={24} weight="Bold" />,
      title: 'INFORMACIÓN DE CONTACTO',
      description: 'Consulte y actualice su información personal',
    },
  };

  // Handlers for each field
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

  const handleSave = () => {
    const errors = validateProfileFields();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      setIsEditing(true); // mantener en edición
      return;
    }

    // Trim antes de guardar
    setForm((prev) => ({
      ...prev,
      nombre: prev.nombre.trim(),
      apellido: prev.apellido.trim(),
      direccion: prev.direccion.trim(),
      fechaNacimiento: prev.fechaNacimiento.trim(),
    }));

    // Replace with API call later
    console.log('Saving form data:', {
      nombre: form.nombre,
      apellido: form.apellido,
      direccion: form.direccion,
      fechaNacimiento: form.fechaNacimiento,
    });
    setProfileErrors({});
    setIsEditing(false);
  };

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de Perfil */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Perfil"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            setProfileErrors({});
            setIsEditing((s) => !s);
          }}
        />

        {/* Fila 1 - Nombre */}
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
          <div className="flex justify-end px-6 py-4">
            <Button variant="primary" onClick={handleSave}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}