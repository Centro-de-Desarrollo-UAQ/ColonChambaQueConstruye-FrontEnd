'use client';

import React, { useMemo, useState, useEffect } from 'react'
import ApplicantCard from '../../../../components/linker/ApplicantCard';
import { UserBlockRounded, UsersGroupTwoRounded } from '@solar-icons/react';
import TitleSection from '@/components/common/TitleSection';
import SearchBar from '@/components/toreview/searchbar';
import FormOptions from '@/components/forms/FormOptions';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { states } from '@/constants';
import { apiService } from '@/services/api.service';

const sectionConfig = {
    talents: {
        icon: <UsersGroupTwoRounded size={24} weight="Bold" className='justify+selfend' />,
        title: 'CARTERA DE USUARIOS',
        description: ''
    },
};

type Filters = {
  modality: string;
  workdayType: string;
  state: string;
};

export default function UserLists() {
    const methods = useForm<Filters>({
        defaultValues: {
            modality: '',
            workdayType: '',
            state: ''
        },
    });

    const { control } = methods;
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTags, setSearchTags] = useState<string[]>([]);

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

    const normalize = (s = '') =>
        s.normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
            .trim();

    const handleSearch = (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) {
            setSearchTags([]);
            return;
        }

        const tags = trimmed
            .split(/[,\s]+/)
            .map((t) => t.trim())
            .filter(Boolean);

        setSearchTags(tags);
    };

    const filteredUsers = useMemo(() => {
        const tags = searchTags.map(normalize);
        
        return users.filter((u) => {
            if (!searchTags.length) return true;
            const haystack = normalize(
                [u.firstName, u.lastName, u.careerSummary]
                    .filter(Boolean)
                    .join(' ')
            );
            return tags.some((t) => haystack.includes(t));
        });
    }, [users, searchTags]);

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
        <main className='flex flex-col items-center mt-[100px]'>
            <div className='w-8/12 align-center flex flex-col'>
                <TitleSection sections={sectionConfig} currentSection='talents' />
                <br />
                <SearchBar onSearch={handleSearch} placeholder='Escribe palabras clave para encontrar el talento que necesitas' showFilter />
                
                <div className='mt-5'>
                    <FormProvider {...methods}>
                        <Form className='flex gap-3'>
                            <FormOptions
                                control={control}
                                name="modality"
                                type="select"
                                placeholder="Modalidad"
                                options={[
                                    { value: "presencial", label: "Presencial" },
                                    { value: "hibrido", label: "Híbrido" },
                                    { value: "remoto", label: "Remoto" },
                                ]}
                                className='rounded-full !text-brand border-brand bg-uaq-white-ghost font-medium'
                            />
                            <FormOptions
                                control={control}
                                name="workdayType"
                                type="select"
                                placeholder="Tipo de Jornada"
                                options={[
                                    { value: "completa", label: "Tiempo completo" },
                                    { value: "media", label: "Medio tiempo" },
                                    { value: "flexible", label: "Flexible" },
                                ]}
                                className='rounded-full !text-brand border-brand bg-uaq-white-ghost font-medium'
                            />
                            <FormOptions
                                control={control}
                                name="state"
                                type="combobox"
                                placeholder="Estado"
                                options={states}
                                color="brand"
                            />
                        </Form>
                    </FormProvider>
                </div>
                
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => <ApplicantCard key={user.id} user={user} />)
                ) : (
                    <div className="text-center py-10 text-zinc-300 align-center mt-15 items-center content-center">
                        <UserBlockRounded className='w-[203px] h-[206px] justify-self-center'/>
                        <p>NO SE ENCONTRARON BUSCADORES DE EMPLEO QUE CUMPLAN CON LA DESCRIPCIÓN</p>
                    </div>
                )}
                <br />
            </div>
        </main>
    )
}