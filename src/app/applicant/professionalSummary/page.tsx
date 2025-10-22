'use client';
import { useState } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { Diploma } from '@solar-icons/react';
import { Button } from '@/components/ui/button';

export default function ProfessionalSummary() {
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingCurriculum, setIsEditingCurriculum] = useState(false);

  const [form, setForm] = useState({
    escolaridad: 'Licenciatura',
    carrera: 'Ingeniería de software',
    resumen: '',
    experiencia: 'Mucha',
    puestoInteres: 'Gerente',
    curriculum: '',
  });

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [curriculumError, setCurriculumError] = useState<string | null>(null);

  const sectionConfig = {
    profile: {
      icon: <Diploma size={24} weight="Bold" />,
      title: 'PERFIL PROFESIONAL',
      description:
        'Edite los detalles de su experiencia profesional y habilidades destacadas, además de sus preferencias laborales',
    },
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // limpiar error del campo al editar
    setProfileErrors((e) => ({ ...e, [key]: '' }));
    if (key === 'curriculum') setCurriculumError(null);
  };

  const validateProfileFields = () => {
    const errors: Record<string, string> = {};
    const requiredFields = ['escolaridad', 'carrera', 'experiencia', 'puestoInteres'];
    requiredFields.forEach((k) => {
      const v = (form as any)[k];
      if (!v || (typeof v === 'string' && v.trim() === '')) {
        errors[k] = 'No puede quedar vacío';
      }
    });
    return errors;
  };

  const handleSaveProfile = () => {
    const errors = validateProfileFields();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      setIsEditingProfile(true); // mantener en edición
      return;
    }

    // Trim antes de guardar
    setForm((prev) => ({
      ...prev,
      escolaridad: prev.escolaridad.trim(),
      carrera: prev.carrera.trim(),
      resumen: prev.resumen.trim(),
      experiencia: prev.experiencia.trim(),
      puestoInteres: prev.puestoInteres.trim(),
    }));

    // Replace with API call later
    console.log('Saving profile data:', {
      escolaridad: form.escolaridad,
      carrera: form.carrera,
      resumen: form.resumen,
      experiencia: form.experiencia,
      puestoInteres: form.puestoInteres,
    });
    setProfileErrors({});
    setIsEditingProfile(false);
  };

  const handleSaveCurriculum = () => {
    const trimmed = form.curriculum?.trim() ?? '';
    if (trimmed === '') {
      setCurriculumError('No puede quedar vacío');
      setIsEditingCurriculum(true);
      return;
    }

    setForm((prev) => ({ ...prev, curriculum: trimmed }));

    // Replace with API call later
    console.log('Saving curriculum data:', { curriculum: trimmed });
    setCurriculumError(null);
    setIsEditingCurriculum(false);
  };

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      {/* Encabezado */}
      <TitleSection sections={sectionConfig} currentSection="profile" />

      {/* Sección de Perfil*/}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Mi perfil"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false} // mostrar botón de editar
          onEditClick={() => {
            setProfileErrors({});
            setIsEditingProfile((s) => !s);
          }} // toggle solo perfil
        />

        {/* Fila 1 - Escolaridad */}
        <div className="px-6">
          <ConfigRow
            title="Escolaridad"
            valueinput={form.escolaridad}
            isTitle={false}
            placeholder="Licenciatura"
            isEditable={isEditingProfile}
            editInput={isEditingProfile}
            onValueChange={(v) => handleChange('escolaridad', v)}
            externalError={profileErrors.escolaridad}
          />
        </div>

        {/* Fila 2 - Carrera */}
        <div className="px-6">
          <ConfigRow
            title="Carrera"
            valueinput={form.carrera}
            isTitle={false}
            placeholder="Ingeniería de Software"
            isEditable={isEditingProfile}
            editInput={isEditingProfile}
            onValueChange={(v) => handleChange('carrera', v)}
            externalError={profileErrors.carrera}
          />
        </div>

        {/* Fila 3 - Experiencia Previa */}
        <div className="px-6">
          <ConfigRow
            title="Experiencia Previa"
            valueinput={form.experiencia}
            isTitle={false}
            placeholder="Describa su experiencia profesional"
            isEditable={isEditingProfile}
            editInput={isEditingProfile}
            onValueChange={(v) => handleChange('experiencia', v)}
            externalError={profileErrors.experiencia}
          />
        </div>

        {/* Fila 4 - Puesto de interés */}
        <div className="px-6">
          <ConfigRow
            title="Puesto de interés"
            valueinput={form.puestoInteres}
            isTitle={false}
            placeholder="¿Qué puesto le interesa para trabajar?"
            isEditable={isEditingProfile}
            editInput={isEditingProfile}
            onValueChange={(v) => handleChange('puestoInteres', v)}
            externalError={profileErrors.puestoInteres}
          />
        </div>

        {isEditingProfile && (
          <div className="flex justify-end px-6 py-4">
            <Button variant="primary" onClick={handleSaveProfile}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>

      {/* Sección de Curriculum */}
      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Curriculum"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            setCurriculumError(null);
            setIsEditingCurriculum((s) => !s);
          }} // toggle solo curriculum
        />
        <div className="px-6">
          <ConfigRow
            title=""
            valueinput={form.curriculum}
            isTitle={false}
            placeholder="Seleccione una opción" // Archivo del Curriculum del usuario
            isEditable={isEditingCurriculum}
            editInput={isEditingCurriculum}
            onValueChange={(v) => handleChange('curriculum', v)}
            externalError={curriculumError ?? undefined}
          />
        </div>

        {isEditingCurriculum && (
          <div className="flex justify-end px-6 py-4">
            <Button variant="primary" onClick={handleSaveCurriculum}>
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}