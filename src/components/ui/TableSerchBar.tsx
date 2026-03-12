'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
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
  
  const filterValue = (table.getColumn('name')?.getFilterValue() as string) ?? '';
  const [inputValue, setInputValue] = useState(filterValue);

  useEffect(() => {
    setInputValue(filterValue);
  }, [filterValue]);

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      table?.getColumn('name')?.setFilterValue(inputValue);
      onSearch?.(inputValue);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-3">
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
          table.getColumn('name')?.setFilterValue('');
          onSearch?.('');
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
