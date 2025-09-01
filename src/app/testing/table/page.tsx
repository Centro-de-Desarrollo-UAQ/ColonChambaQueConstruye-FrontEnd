import React from 'react';
import { testDataCandidate } from '@/data/testDataCandidate';
import { testDataFilters } from '@/data/testDataFilters';
import { candidateColumns } from '@/components/tables/schemas/Vacancy';
import { testDataCompany } from '@/data/testDataCompany';
import { companyColumns } from '@/components/tables/schemas/CompanyRequest';
import { Company, Candidate } from '@/interfaces';
import SearchBar from '@/components/common/SearchBar';

import { DataTable } from '@/components/tables/layouts/DateTable';

async function getData(): Promise<Candidate[]> {
  // Simulate fetching data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testDataCandidate);
    }, 1000);
  });
}

async function getDataCompany(): Promise<Company[]> {
  // Simulate fetching company data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testDataCompany);
    }, 1000);
  });
}

export default async function page() {
  const data = await getData();
  const dataCompany = await getDataCompany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Candidatos</h1>
      <DataTable columns={candidateColumns} data={data} />
      <div className="mt-4">
        <SearchBar filters={testDataFilters} />
      </div>
      <h1 className="mb-4 text-2xl font-bold">Solicitudes de empresa</h1>
      <DataTable columns={companyColumns} data={dataCompany} />
    </div>
  );
}
