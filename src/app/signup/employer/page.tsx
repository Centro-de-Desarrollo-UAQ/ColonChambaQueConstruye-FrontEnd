'use client';

import { Control, FormProvider, useForm } from 'react-hook-form';
import Headersimple from '@/components/ui/header-simple';
import { EmployerFormType } from '@/validations/employerSchema';
import { useState } from 'react';
import ApplicantSignUpTwo from '@/components/applicant/ApplicantSignUpTwo';
import SignUpEmployer from '@/components/employer/SignUpEmployer';

interface EmployerInfoProps {
    control: Control<EmployerFormType>;
}

export default function SignUpEmployerPage({ control }: EmployerInfoProps) {
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
                        <SignUpEmployer />
                    </div>
            </main>
        </div>
    </div>
  );
}
function setIsModalOpen(arg0: boolean) {
    throw new Error('Function not implemented.');
}

