'use client';

import React, { useState, useEffect } from 'react'
import ApplicantCard from '../../../../components/linker/ApplicantCard';
import { FileRemove, UsersGroupTwoRounded } from '@solar-icons/react';
import TitleSection from '@/components/common/TitleSection';
import { apiService } from '@/services/api.service';
import UniversalCardsFilter from '@/components/ui/UniversalCardFilter';
import { filtersApplicant } from '@/data/filtersApplicants';
import { testDataCandidate } from '@/data/testDataCandidate';
import { testDataUser } from '@/data/testDataUsers';

const sectionConfig = {
    talents: {
        icon: <UsersGroupTwoRounded size={24} weight="Bold" className='justify-self-end' />,
        title: 'CARTERA DE USUARIOS',
        description: ''
    },
};

export default function UserLists() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const endpoint = '/companies/68f7ce84522a0c72b7a0c126/users';
                const result = await apiService.getTestWithToken(endpoint);
                
                const transformedUsers = result.map((item: any) => ({
                    id: item.User.id,
                    firstName: item.User.firstName,
                    lastName: item.User.lastName,
                    email: item.User.email,
                    phoneNumber: item.User.cellPhone,
                    careerSummary: item.User.jobExperience,
                    photoURL: item.User.photoURL || '/default-user.png',
                    academicLevel: item.User.academicLevel,
                    status: item.User.status,
                    registeredAt: item.User.registeredAt
                }));
                
                setUsers(transformedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <main className='flex flex-col items-center mt-[100px]'>
                <div className='w-8/12 align-center flex flex-col'>
                    <p>Cargando usuarios...</p>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className='flex flex-col items-center mt-[100px]'>
                <div className='w-8/12 align-center flex flex-col'>
                    <p>Cargando usuarios...</p>
                </div>
            </main>
        );
    }

    return (
        <main className='flex flex-col items-center mt-15'>
            <div className='w-8/12 align-center flex flex-col'>
                <TitleSection sections={sectionConfig} currentSection='talents' />
                <UniversalCardsFilter<any>
                    items={testDataUser}
                    filters={filtersApplicant}
                    accessors={{
                        name: (u) =>
                            `${u.firstName} ${u.lastName} ${u.email} ${u.careerSummary}`,
                        academicLevel: (u) => u.academicLevel,
                        workShift: (u) => u.status,
                        state: (u) => u.status,
                    }}
                    render={(filtered) => (
                        <div className="space-y-4">
                            {!filtered.length && (
                                <div className="flex flex-col items-center justify-center gap-4 m-10 text-gray-300 font-bold">
                                    <FileRemove className="w-50 h-50 text-gray-300" />
                                    <h1>NO SE ENCONTRARON RESULTADOS PARA TU BÚSQUEDA</h1>
                                    <h1>INTENTA CON OTRAS PALABRAS CLAVE O REVISA SI HAY ERRORES DE ESCRITURA</h1>
                                </div>
                            )}
                            {filtered.map((user) => (
                                <ApplicantCard key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                    multiMode='OR'
                />
            </div>
        </main>
    );
}