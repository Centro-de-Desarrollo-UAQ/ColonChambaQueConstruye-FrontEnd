'use client';

import { Control, FormProvider, useForm } from 'react-hook-form';
import Headersimple from '@/components/ui/header-simple';
import { ApplicantFormType } from '@/validations/applicantSchema';
import { useState } from 'react';
import LogoutModal from '@/components/ui/modal/LogoutModal';
import { Button } from '@/components/ui/button';
import CloseVacancyModal from '@/components/ui/modal/CloseVacancyModal';
import AllowCompanyModal from '@/components/ui/modal/AllowCompanyModal';
import AllowVacancyModal from '@/components/ui/modal/AllowVacancy';
import AllowUserModal from '@/components/ui/modal/AllowUserModal';
import RejectCompanyModal from '@/components/ui/modal/RejectCompany';
import RejectVacancyModal from '@/components/ui/modal/RejectVacancyModal';

interface ApplicantSchoolInfoProps {
    control: Control<ApplicantFormType>;
}

export default function testModals({ control }: ApplicantSchoolInfoProps) {

  const [showLogout, setShowLogout] = useState(false);
  const [showCloseVacancy, setShowCloseVacancy] = useState(false);
  const [showAllowCompany, setShowAllowCompany] = useState(false);
  const [showAllowVacancy, setShowAllowVacancy] = useState(false);
  const [showAllowUser, setShowAllowUser] = useState(false);

  const company = 'Kreiger Inc';
  const role = 'Senior Marketing Manager';

  const [showRejectCompany, setShowRejectCompany] = useState(false);
  const [showRejectVacancy, setShowRejectVacancy] = useState(false);


  const handleLogoutConfirm = () => {
    setShowLogout(false);
  };

    const handleCloseVacancyConfirm = () => {
    setShowCloseVacancy(false);
  };

  const handleAllowCompanyConfirm = () => {
    setShowAllowCompany(false);
  };

  const handleAllowVacancyConfirm = () => {
    setShowAllowVacancy(false);
  };

  const handleAllowUserConfirm = () => {
    setShowAllowUser(false);
  };

  const handleRejectCompanyConfirm = () => {
    setShowRejectCompany(false);
  };

  const handleRejectVacancyConfirm = () => {
    setShowRejectVacancy(false);
  };

  const openLogoutModal = () => setShowLogout(true);
  const closeLogoutModal = () => setShowLogout(false);

  const openCloseVacancyModal = () => setShowCloseVacancy(true);
  const closeCloseVacancyModal = () => setShowCloseVacancy(false);

  const openAllowCompanyModal = () => setShowAllowCompany(true);
  const closeAllowCompanyModal = () => setShowAllowCompany(false);

  const openAllowVacancyModal = () => setShowAllowVacancy(true);
  const closeAllowVacancyModal = () => setShowAllowVacancy(false);

  const openAllowUserModal = () => setShowAllowUser(true);
  const closeAllowUserModal = () => setShowAllowUser(false);
  
  const openRejectCompanyModal = () => setShowRejectCompany(true);
  const closeRejectCompanyModal = () => setShowRejectCompany(false);

  const openRejectVacancyModal = () => setShowRejectVacancy(true);
  const closeRejectVacancyModal = () => setShowRejectVacancy(false);

  return (
    <div className="flex min-h-screen flex-col">
        <Headersimple />
        <div className="flex min-h-screen flex-col items-center justify-center py-15">
            <main className="flex h-fit flex-col items-center justify-center gap-10">
                <div className='items-center justify-center'>
                    <h1 className="font-bold pb-4 text-center">Modales Administrador</h1>
                    <div className='flex gap-3'>
                        <Button type="button" variant="primary" color="gray" className="flex-1 h-[60px] [&_svg]:!w-12 [&_svg]:!h-12" onClick={openAllowUserModal}>
                            Aprobar cuenta de usuario
                        </Button>
                        <Button type="button" variant="primary" color="gray" className="flex-1 h-[60px] [&_svg]:!w-12 [&_svg]:!h-12" onClick={openAllowCompanyModal}>
                            Aprobar cuenta de la empresa
                        </Button>
                        <Button type="button" variant="primary" color="gray" className="flex-1 h-[60px] [&_svg]:!w-12 [&_svg]:!h-12" onClick={openAllowVacancyModal}>
                            Aprobar vacante
                        </Button>
                        <Button type="button" variant="primary" color="gray" className="flex-1 h-[60px] [&_svg]:!w-12 [&_svg]:!h-12" onClick={openRejectCompanyModal}>
                            Rechazar cuenta de la empresa
                        </Button>
                        <Button type="button" variant="primary" color="gray" className="flex-1 h-[60px] [&_svg]:!w-12 [&_svg]:!h-12" onClick={openRejectVacancyModal}>
                            Rechazar vacante
                        </Button>
                    </div>
                </div>
                <div className='items-center justify-center'>
                    <h1 className="font-bold pb-4 text-center">Modales Usuario</h1>
                    <div className='flex gap-3'>
                        <Button type="button" variant="primary" color="gray" className="flex-1 h-[60px] [&_svg]:!w-12 [&_svg]:!h-12" onClick={openLogoutModal}>
                        Cerrar sesión
                    </Button>
                    </div>
                </div>
                <div className='items-center justify-center'>
                    <h1 className="font-bold pb-4 text-center">Modales Usuario</h1>
                    <div className='flex gap-3'>
                        <Button type="button" variant="primary" color="gray" className="flex-1 h-[60px] [&_svg]:!w-12 [&_svg]:!h-12" onClick={openCloseVacancyModal}>
                            Cerrar vacante
                        </Button>
                    </div>                     
                </div>
                {/* Modales de aprobación para administrador */}
                <div className="mb-6 space-y-4">
                    {showAllowUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <AllowUserModal onConfirm={handleAllowUserConfirm} onClose={closeAllowUserModal} />
                        </div>
                    )}
                </div> 
                <div className="mb-6 space-y-4">
                    {showAllowVacancy && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <AllowVacancyModal onConfirm={handleAllowVacancyConfirm} onClose={closeAllowVacancyModal} />
                        </div>
                    )}
                </div>  
                <div className="mb-6 space-y-4">
                    {showAllowCompany && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <AllowCompanyModal onConfirm={handleAllowCompanyConfirm} onClose={closeAllowCompanyModal} />
                        </div>
                    )}
                </div> 
                {/*Modales de rechazo para administrador */}
                <div className="mb-6 space-y-4">
                    {showRejectCompany && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <RejectCompanyModal 
                            onConfirm={handleRejectCompanyConfirm} 
                            onClose={closeRejectCompanyModal}
                            companyName={company} />
                        </div>
                    )}
                </div>
                <div className="mb-6 space-y-4">
                    {showRejectVacancy && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <RejectVacancyModal
                                onConfirm={handleRejectVacancyConfirm}
                                onClose={closeRejectVacancyModal}
                                companyName={company}
                                roleTitle={role}
                            />
                        </div>
                    )}
                </div>
                {/* Modales de usuario */}  
                <div className="mb-6 space-y-4">
                    {showLogout && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <LogoutModal onConfirm={handleLogoutConfirm} onClose={closeLogoutModal} />
                        </div>
                    )}
                </div>
                {/*Modales de empresa*/}
                <div className="mb-6 space-y-4">
                    {showCloseVacancy && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <CloseVacancyModal onConfirm={handleCloseVacancyConfirm} onClose={closeCloseVacancyModal} />
                        </div>
                    )}
                </div>    
            </main>
        </div>
    </div>
  );
}
function setIsModalOpen(arg0: boolean) {
    throw new Error('Function not implemented.');
}

