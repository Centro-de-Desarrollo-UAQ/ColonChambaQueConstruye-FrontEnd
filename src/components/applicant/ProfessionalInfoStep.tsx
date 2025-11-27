'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import FormInput from '../forms/FormInput';
import { Button } from '@/components/ui/button';
import { FileSmile, FileSend, CloseSquare } from '@solar-icons/react';
import { Control } from 'react-hook-form';
import { ApplicantProfInfoFormType } from '@/validations/applicantSchemaProfessionalInfo';
import UploadModal from '../common/UploadModal';
import { UploadedFile } from '../common/UploadedFile';
import FormOptions from '../forms/FormOptions';
import FormComboBadgeSelector from '../forms/FormComboBadgeSelector';
import { educationLevels } from '@/constants';

interface ApplicantDetailsStepProps {
  control: Control<ApplicantProfInfoFormType>;
}

export default function ProfessionalInfoStep({ control }: ApplicantDetailsStepProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File | null>(null);

  const handleModalSave = ({ spanishCV }: { spanishCV: File | null }) => {
    setUploadedFiles(spanishCV);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      <div className="mt-0 mb-4 flex items-center justify-between">
        <h3 className="text-uaq-terniary p-0 font-light">Perfil profesional</h3>
      </div>

      <Separator />

      <div className="space-y-4 py-6">
        
        <FormComboBadgeSelector
          control={control}
          label="Escolaridad"
          name="schooling"
          options={educationLevels}
          description="Selecciona tu nivel maximo de escolaridad"
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
          name="position"
          label="Puesto de interés"
          description="Especifica el puesto o área en la que deseas trabajar."
          type="text"
        />

        <p className="font-medium">Currículum</p>
        <span className="font-light">
          Añade tu currículum, recuerda que debe ser en formato pdf y no mayor a 2MB.
        </span>
        <Separator className="mt-4" />

        <div className="mt-10 flex gap-4">
          {uploadedFiles == null ? (
            <>
              <Button
                type="button"
                variant="primary"
                color="gray"
                className="h-[60px] flex-1 [&_svg]:!h-12 [&_svg]:!w-12"
                onClick={openModal}
              >
                <div className="m-0 w-[48px]">
                  <FileSend weight="Bold" className="h-full w-full shrink-0" />
                </div>
                <div className="pl-[20px] text-center leading-tight font-light">
                  <p className="text-base font-semibold">Sube tu Curriculum</p>
                  <p className="text-sm text-zinc-500">Sube tu CV en formato PDF</p>
                </div>
              </Button>
            </>
          ) : (
            <>
              <UploadedFile
                file={uploadedFiles}
                defaultFileName="CV_ESP.pdf"
                action="upload"
                onRemove={() => setUploadedFiles(null)}
              />
            </>
          )}
        </div>
      </div>

      {/* Renderizar modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <UploadModal onSave={handleModalSave} onClose={closeModal} />
        </div>
      )}
    </div>
  );
}
