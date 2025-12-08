'use client';

import { useState } from 'react';
import { MinimalisticMagnifer } from '@solar-icons/react';
import { filterType } from '@/interfaces/table';
import { MultiFilter } from '../toreview/MultiFilter';
import { Input } from './input';

interface TableSearchBarProps {
  filters: filterType[];
  table: {
    getColumn: (columnId: string) =>
      | {
          getFilterValue: () => unknown;
          setFilterValue: (value: unknown) => void;
        }
      | undefined;
  };
  onSearch?: (value: string) => void;
  onFilterChange?: (key: string, value: any) => void;
}

function TableSearchBar({ filters, table, onSearch, onFilterChange }: TableSearchBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <Input
        type="text"
        placeholder="Buscar..."
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          table?.getColumn('name')?.setFilterValue(value);
          onSearch?.(value); 
        }}
        className="h-fit w-full"
        icon={MinimalisticMagnifer}
        filter={isFilterOpen}
        handleFilter={handleFilterToggle}
        onClear={() => table.getColumn('name')?.setFilterValue('')}
      />
      <div className="flex flex-wrap gap-2">
        {isFilterOpen &&
          filters.map((filter, index) => (
            <MultiFilter
              key={index}
              variant={filter.isDate ? 'date' : 'checkbox'}
              label={filter.name}
              options={filter.options}
              value={table.getColumn(filter.value)?.getFilterValue() ?? []}
              onChange={(value) => {
                table?.getColumn(filter.value)?.setFilterValue(value);
                onFilterChange?.(filter.value, value);
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default TableSearchBar;
