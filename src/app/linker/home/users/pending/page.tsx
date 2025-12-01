'use client';

import React, { useState, useMemo } from 'react'; // 1. Importar useMemo
import TitleSection from '@/components/common/TitleSection';
import EmptyDisplay from '@/components/empty-display/EmptyDisplay';
import { InboxIn } from '@solar-icons/react';
import { DataTableCustomSearchBar } from '@/components/tables/layouts/DateTableCustomSearchBar';
import { DataVacancies } from '@/data/testDataVacancies';
import NoteRemove from '@/components/common/hugeIcons';
import { companySearchFilters, getCompanySearchColumns } from '@/components/linker/CompanySearchEmploy';
import { testDataUser } from '@/data/testDataUsers';

import { UserReviewDrawer} from '@/components/ui/UserReviewDrawer';
import { UserCandidate } from '@/interfaces/usercandidates';

const accountStatus: 'approved' | 'reviewed' | 'rejected' = 'approved';

const sectionConfig = {
    profile: {
        icon: <InboxIn size={24} weight="Bold" />,
        title: 'SOLICITUDES PENDIENTES DE BUSCADORES DE EMPLEO',
        description: '',
    },
};

interface VacanciesContentProps {
    hasData: boolean;
    accountStatus: 'approved' | 'reviewed' | 'rejected';
    onUserSelect: (user: any) => void; 
}

const VacanciesContent = ({
    hasData,
    accountStatus,
    onUserSelect
}: VacanciesContentProps) => {
    
    const columns = useMemo(() => getCompanySearchColumns(onUserSelect), [onUserSelect]);

    const commonEmptyState = (
        <div className="flex w-full flex-col items-center justify-center text-center">
            <EmptyDisplay
                icon={<NoteRemove color="#D4D4D8" width={158} height={166} />}
                firstLine="Todavía no has publicado alguna vacante."
                secondline="Utiliza las opciones..."
            />
        </div>
    );

    const statusComponents = {
        approved: hasData ? (
            <div className='flex flex-col gap-4'>
                <DataTableCustomSearchBar
                    columns={columns}
                    data={testDataUser}
                    filters={companySearchFilters}
                />
            </div>
        ) : (
            <div className="flex w-full flex-col items-center justify-center text-center">
               {commonEmptyState}
            </div>
        ),
        reviewed: (
            <> {/* ... contenido reviewed ... */} </>
        ),
        rejected: (
             <> {/* ... contenido rejected ... */} </>
        ),
    };

    return statusComponents[accountStatus] || null;
};

export default function tablillaPage() {
    const hasData = DataVacancies.length > 0;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserCandidate | null>(null);

    const handleUserSelect = (rawUser: any) => {
        console.log("Usuario seleccionado:", rawUser); 
        const formattedUser: UserCandidate = {
            id: rawUser.id,
            name: `${rawUser.firstName} ${rawUser.lastName}`, 
            email: rawUser.email,
            birthDate: "Sin dato",
            address: "Sin dato", 
            phone: rawUser.phoneNumber,
            educationLevel: rawUser.academicLevel,
            desiredPosition: rawUser.recentPosition, 
            experience: rawUser.careerSummary, 
            registrationDate: new Date(rawUser.createdAt).toLocaleDateString(),
            career: "N/A" 
        };

        setSelectedUser(formattedUser);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedUser(null);
    };

    const handleApprove = (user: UserCandidate) => {
        console.log("Aprobado ID:", user.id);
        handleCloseDrawer();
    };

    const handleReject = (user: UserCandidate) => {
        console.log("Rechazado ID:", user.id);
        handleCloseDrawer();
    };

    return (
        <>
            <div className="mx-32 flex flex-col gap-5 mt-20">
                <div className="">
                    <TitleSection sections={sectionConfig} currentSection={'profile'} />
                </div>

                <VacanciesContent 
                    hasData={hasData} 
                    accountStatus={accountStatus} 
                    onUserSelect={handleUserSelect}
                />
            </div>

            <UserReviewDrawer 
                isOpen={isDrawerOpen}
                user={selectedUser}
                onClose={handleCloseDrawer}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </>
    );
}