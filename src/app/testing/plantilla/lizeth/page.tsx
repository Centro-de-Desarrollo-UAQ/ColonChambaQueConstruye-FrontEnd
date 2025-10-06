'use client';

import { Control, FormProvider, useForm } from 'react-hook-form';
import Headersimple from '@/components/ui/header-simple';
import { ApplicantFormType } from '@/validations/applicantSchema';
import { useState } from 'react';
import ApplicantSignUpTwo from '@/components/applicant/ApplicantSignUpTwo';

interface ApplicantSchoolInfoProps {
    control: Control<ApplicantFormType>;
}

export default function SignUpDos({ control }: ApplicantSchoolInfoProps) {
    const [uploadedFiles, setUploadedFiles] = useState<{
        spanishCV: File | null;
      }>({ spanishCV: null});

      const handleModalSave = (files: { spanishCV: File | null; englishCV: File | null }) => {
        setUploadedFiles(files);
        setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <div className="flex min-h-screen flex-col">
        <Headersimple />
        <div
            className="flex min-h-screen flex-col items-center justify-center py-15"
            style={{
                backgroundImage: 'url("/backgroundSignUp.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
            }}
        >
            <main className="flex h-fit flex-col items-center justify-center gap-10">

                    <div className="mb-6 space-y-4">
                        <ApplicantSignUpTwo />
                    </div>
            </main>
        </div>
    </div>
  );
}
function setIsModalOpen(arg0: boolean) {
    throw new Error('Function not implemented.');
}

