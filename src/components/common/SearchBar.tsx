'use client'

import { useState } from 'react'
import { Input } from '../ui/input'
import { MinimalisticMagnifer } from '@solar-icons/react'
import { MultiFilter } from '../toreview/MultiFilter'

type filterType = {
    value: string,
    name: string,
    options?: string[],
    isDate?: boolean,
}

interface SearchBarProps {
    filters: filterType[],
}

function SearchBar({ filters }: SearchBarProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }
    const handleFilterToggle = () => {
        if (isSortOpen) {
            setIsSortOpen(false)
        }
        setIsFilterOpen(!isFilterOpen)
    }
    const handleSortToggle = () => {
        if (isFilterOpen) {
            setIsFilterOpen(false)
        }
        setIsSortOpen(!isSortOpen)
    }
    return (
        <div className="flex flex-col items-start gap-3 ">
            <Input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full h-fit"
                icon={MinimalisticMagnifer}
                filter={isFilterOpen}
                handleFilter={handleFilterToggle}
                sort={isSortOpen}
                handleSort={handleSortToggle}
            />
            <div className='flex gap-2 flex-wrap'>
            {isFilterOpen && filters.map((filter, index) => (
                <MultiFilter
                    key={index}
                    variant={filter.isDate ? 'date' : 'checkbox'}
                    label={filter.name}
                    options={filter.options}
                />
            ))}  
            </div>
        </div>
    )
}

export default SearchBar