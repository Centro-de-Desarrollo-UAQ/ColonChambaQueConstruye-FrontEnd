'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { MinimalisticMagnifer } from '@solar-icons/react';
import { filterType } from '@/interfaces/table';
import { MultiFilter } from '@/components/toreview/MultiFilter';
import { Input } from '@/components/ui/input';

interface LinkerSearchProps {
  filters: filterType[];
}

export function LinkerSearch({ filters }: LinkerSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setInputValue(searchParams.get('search') || '');
  }, [searchParams]);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const updateQueryParams = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (!value || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else {
      if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }
    }
    
    // Al realizar una nueva búsqueda o filtro, regresamos a la primera página si existe paginación
    params.delete('offset');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateQueryParams('search', inputValue);
    }
  };

  const getFilterValue = (key: string) => {
    const val = searchParams.get(key);
    if (!val) return [];
    return val.split(',');
  };

  return (
    <div className="flex w-full flex-col items-start gap-3 mb-4">
      <Input
        type="text"
        placeholder="Buscar..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-fit w-full"
        icon={MinimalisticMagnifer}
        filter={isFilterOpen}
        handleFilter={handleFilterToggle}
        onClear={() => {
          setInputValue('');
          updateQueryParams('search', '');
        }}
      />
      <div className="flex flex-wrap gap-2">
        {isFilterOpen &&
          filters.map((filter, index) => (
            <MultiFilter
              key={index}
              variant={filter.isDate ? 'date' : 'checkbox'}
              label={filter.name}
              options={filter.options}
              value={getFilterValue(filter.value)}
              onChange={(value) => {
                updateQueryParams(filter.value, value as string | string[]);
              }}
            />
          ))}
      </div>
    </div>
  );
}
