import React from 'react'
import { testDataCandidate, Candidate } from '@/data/testDataCandidate'
import { candidateColumns } from '@/components/tables/columns/vacancyColumns'
import { DataTable } from '@/components/tables/templates/date-table'

async function getData(): Promise<Candidate[]> {
    // Simulate fetching data
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(testDataCandidate)
        }, 1000)
    })
}

export default async function page() {
    const data = await getData()
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Candidatos</h1>
            <DataTable
                columns={candidateColumns}
                data={data}
            />
        </div>
    )
}