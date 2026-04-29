'use client';

import { useState, useEffect } from 'react';
import TitleSection from '@/components/common/TitleSection';
import { ConfigRow } from '@/components/settings/ConfigRow';
import { Diploma } from '@solar-icons/react';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/app/store/useUserInfoStore';
import { useApplicantStore } from '@/app/store/authApplicantStore';
import CurriculumSection from '@/components/ui/Curriculum';
import ConfigRowSelect from '@/components/settings/ConfigRowDropDawn';
import { educationLevels } from '@/constants';
import UpdateCvModal from '@/components/applicant/UpdateCvModal';
import Alert from '@/components/ui/Alerts';

interface CurriculumData {
  id: string;
  title: string;
  curriculumUrl: string;
}

export default function ProfessionalSummary() {
  const { user, updateLocalUser } = useUserStore();
  const { token, id: userId } = useApplicantStore();

  const [cvData, setCvData] = useState<CurriculumData | null>(null);
  const [isLoadingCv, setIsLoadingCv] = useState(true);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 

  const [alertConfig, setAlertConfig] = useState<{
    isVisible: boolean;
    type: 'error' | 'warning' | 'success'; 
    title: string;
    description: string;
  }>({ isVisible: false, type: 'error', title: '', description: '' });

  const [form, setForm] = useState({
    status: '',
    escolaridad: '',
    carrera: '',
    resumen: '',
    experiencia: '',
    puestoInteres: '',
  });

  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  const fetchCurriculum = async () => {
    if (!userId || !token) return;

    setIsLoadingCv(true);
    try {
      const response = await fetch(`/api/v1/users/${userId}/curriculum`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setCvData(result.data ?? null);
      } else if (response.status === 404) {
        setCvData(null);
      }
    } catch (error) {
      console.error('Error obteniendo curriculum:', error);
    } finally {
      setIsLoadingCv(false);
    }
  };

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        escolaridad: user.scholarship || '',
        carrera: user.degree || '',
        resumen: user.summary || '',
        experiencia: user.experience || '',
        puestoInteres: user.interestJob || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchCurriculum();
  }, [userId, token]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setProfileErrors((e) => ({ ...e, [key]: '' }));
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

  const handleSaveProfile = async () => {
    const errors = validateProfileFields();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      setIsEditingProfile(true);
      return;
    }

    setIsSaving(true);
    setAlertConfig(prev => ({ ...prev, isVisible: false }));

    try {
      const payload = {
        academicLevel: form.escolaridad,
        degree: form.carrera.trim(),
        jobexperience: form.experiencia.trim(),
        desiredposition: form.puestoInteres.trim(),
      };

      const response = await fetch(`/api/v1/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al actualizar el perfil profesional');

      updateLocalUser({
        scholarship: payload.academicLevel,
        degree: payload.degree,
        experience: payload.jobexperience,
        interestJob: payload.desiredposition,
      });

      setProfileErrors({});
      setIsEditingProfile(false);
      
      setAlertConfig({
        isVisible: true,
        type: 'success', 
        title: 'Éxito',
        description: 'Perfil profesional actualizado correctamente.'
      });

    } catch (error) {
      console.error('Error updating professional profile:', error);
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

  const handleCancelProfile = () => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        escolaridad: user.scholarship || '',
        carrera: user.degree || '',
        resumen: user.summary || '',
        experiencia: user.experience || '',
        puestoInteres: user.interestJob || '',
      }));
    }
    setProfileErrors({});
    setIsEditingProfile(false);
    setAlertConfig(prev => ({ ...prev, isVisible: false }));
  };

  const openCvModal = () => setIsCvModalOpen(true);

  const sectionConfig = {
    profile: {
      icon: <Diploma size={24} weight="Bold" />,
      title: 'PERFIL PROFESIONAL',
      description: 'Edite los detalles de su experiencia profesional y habilidades.',
    },
  };

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        <div className="animate-pulse">Cargando perfil profesional...</div>
      </div>
    );
  }

  return (
    <div className="mr-20 space-y-6 p-4 md:p-6">
      <TitleSection sections={sectionConfig} currentSection="profile" />

      <Alert 
        isVisible={alertConfig.isVisible}
        onClose={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
        type={alertConfig.type as 'error' | 'warning'} 
        title={alertConfig.title}
        description={alertConfig.description}
      />

      <div className="rounded-lg border border-zinc-300 shadow-sm">
        <ConfigRow
          title="Mi perfil"
          valueinput=""
          isTitle={true}
          placeholder=""
          isEditable={true}
          editInput={false}
          onEditClick={() => {
            if (isEditingProfile) handleCancelProfile();
            else setIsEditingProfile(true);
          }}
        />

        <div className="px-6">
          <ConfigRowSelect
            title="Escolaridad"
            placeholder="Selecciona escolaridad"
            options={educationLevels}
            editInput={isEditingProfile}
            valueinput={form.escolaridad}
            onValueChange={(v) => handleChange('escolaridad', v)}
            externalError={profileErrors.escolaridad}
          />
        </div>

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
          <div className="flex justify-end gap-3 px-6 py-4">
            <Button variant="primary" onClick={handleCancelProfile} disabled={isSaving}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-zinc-300 shadow-sm p-6 bg-white">
        <div className="mb-2">
          <h3 className="font-semibold text-lg">Curriculum Vitae</h3>
          <p className="text-sm text-gray-500">Gestione su archivo PDF para aplicar a vacantes.</p>
        </div>

        <CurriculumSection
          cvData={cvData}
          isLoading={isLoadingCv}
          onUpload={openCvModal}
          onUpdate={openCvModal} 
        />
      </div>

      {token && userId && (
        <UpdateCvModal
          open={isCvModalOpen}
          onOpenChange={setIsCvModalOpen}
          userId={userId!}
          token={token!}
          onSuccess={fetchCurriculum}
        />
      )}
    </div>
  );
}