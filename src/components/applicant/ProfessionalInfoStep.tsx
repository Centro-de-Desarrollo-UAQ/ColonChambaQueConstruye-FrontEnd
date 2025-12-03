'use client';

import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import FormInput from '../forms/FormInput';
import { Control } from 'react-hook-form';
import { ApplicantFormType } from '@/validations/applicantSchema'; 
import UploadModal from '../common/UploadModal';
import FormComboBadgeSelector from '../forms/FormComboBadgeSelector';
import { educationLevels } from '@/constants';
import CurriculumSection from '../ui/Curriculum';
import { useApplicantStore } from '@/app/store/authApplicantStore';

interface ApplicantDetailsStepProps {
  control: Control<ApplicantFormType>;
}

// Tipo para la respuesta de la API del CV
interface CurriculumData {
  id: string;
  title: string;
  curriculumUrl: string;
}

export default function ProfessionalInfoStep({ control }: ApplicantDetailsStepProps) {
  const { id: userId, token } = useApplicantStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado local para el CV (visualización)
  const [cvData, setCvData] = useState<CurriculumData | null>(null);
  const [isLoadingCv, setIsLoadingCv] = useState(false);

  // 1. Cargar CV existente al montar el componente (GET normal)
  useEffect(() => {
    const fetchCurriculum = async () => {
      if (!userId || !token) return;
      setIsLoadingCv(true);
      try {
        const response = await fetch(`/api/v1/users/${userId}/curriculum`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.data) setCvData(result.data);
        } else if (response.status === 404) {
          setCvData(null); // No hay CV
        }
      } catch (e) {
        console.error("Error al cargar curriculum:", e);
      } finally {
        setIsLoadingCv(false);
      }
    };
    fetchCurriculum();
  }, [userId, token]);

  // 2. Eliminar CV (DELETE normal)
  const handleRemoveCv = async () => {
    if (!cvData || !userId || !token) return;
    if (!confirm("¿Estás seguro de eliminar tu currículum?")) return;

    try {
        const response = await fetch(`/api/v1/users/${userId}/curriculum`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            setCvData(null);
        } else {
            alert("No se pudo eliminar el archivo.");
        }
    } catch (error) {
        console.error("Error eliminando CV", error);
    }
  };

  // 3. Subir CV (POST a /upload)
  const handleModalSave = async ({ spanishCV }: { spanishCV: File | null }) => {
    if (!spanishCV || !userId || !token) return;
    
    setIsModalOpen(false);
    setIsLoadingCv(true);

    try {
        const formData = new FormData();
        formData.append('file', spanishCV); 

        // Definimos la URL explícita para subir
        const uploadUrl = `/api/v1/users/${userId}/curriculum/upload`;
        
        console.log(`📤 Subiendo CV a: ${uploadUrl}`); // Debug para verificar ruta

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                // No poner Content-Type, fetch lo gestiona para FormData
            },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log("✅ CV subido con éxito:", result);
            // Según tu schema, los datos útiles están anidados
            const newCvData = result.data?.data || result.data;
            setCvData(newCvData);
        } else {
            console.error("Error API:", response.status, response.statusText);
            alert("Error al subir el currículum.");
        }
    } catch (error) {
        console.error("Error subiendo CV", error);
    } finally {
        setIsLoadingCv(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="mt-0 mb-4 flex items-center justify-between">
        <h3 className="text-uaq-terniary p-0 font-light text-xl">Perfil profesional</h3>
      </div>

      <Separator />

      <div className="space-y-4 py-6">
        
        {/* Selector de Escolaridad */}
        <FormComboBadgeSelector
          control={control}
          label="Escolaridad"
          name="schooling"
          options={educationLevels}
          description="Selecciona tu nivel máximo de escolaridad"
          className="flex flex-col justify-between"
          multiple={false}
        />

        <FormInput
          control={control}
          name="career"
          label="Carrera o especialidad"
          description="Indica tu área de formación o especialidad."
          type="text"
        />

        <FormInput
          control={control}
          name="professionalSummary"
          label="Descripción o experiencia previa"
          description="Resume tu trayectoria, habilidades o logros relevantes."
          type="text"
        />

        <FormInput
          control={control}
          name="jobLocationPreference" 
          label="Puesto de interés"
          description="Especifica el puesto o área en la que deseas trabajar."
          type="text"
        />

        <div className="mt-8">
            <p className="font-medium">Currículum</p>
            <span className="font-light text-sm text-gray-500">
              Añade tu currículum, recuerda que debe ser en formato PDF y no mayor a 2MB.
            </span>
            <Separator className="mt-4" />

            <CurriculumSection 
                cvData={cvData}
                isLoading={isLoadingCv}
                onUpload={openModal}
                onRemove={handleRemoveCv}
            />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <UploadModal onSave={handleModalSave} onClose={closeModal} />
        </div>
      )}
    </div>
  );
}