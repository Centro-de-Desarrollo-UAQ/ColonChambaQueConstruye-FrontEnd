import React from 'react'
import EditVacancyForm from '@/components/forms/vacancy/EditVacancyForm';
import { DataVacanciesU } from '@/data/testDataVacancies';

export default async function VacanciEditFormPage({ params }: { params: Promise<{ id: string }> })  {


    const idVacancy = (await params).id;


  return (
    <main className='flex flex-col bg-accent z-0 items-center py-13 !m-0'>
        <div className='w-7/12 align-center flex flex-col bg-white !z-0 rounded-lg border-1 border-zinc-300 pb-12'>
            {idVacancy ? (
              <EditVacancyForm idVacancy={idVacancy} />
            ) : (
              <div className="p-8 text-center text-sm text-zinc-600">
                Vacante no encontrada.
              </div>
            )}
        </div>
    </main>
  )
}
