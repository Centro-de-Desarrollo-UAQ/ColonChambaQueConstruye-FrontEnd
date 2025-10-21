'use client';

import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { Button } from '@/components/ui/button'; // si tienes shadcn/ui
import { MinimalisticMagnifer } from '@solar-icons/react';

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = '¿Qué puesto estás buscando?',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const triggerSearch = () => {
    onSearch?.(searchTerm.trim()); // '' => que el padre muestre toda la data
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') triggerSearch();
  };

  return (
    <div className="w-8/12">
      <div className="flex items-center gap-2">
        {/* Input ocupa todo el espacio disponible */}
        <div className="flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="h-11 w-full"
            icon={MinimalisticMagnifer}
          />
        </div>

        {/* Botón a la derecha */}
        <Button
          type="button"
          onClick={triggerSearch}
          className="h-11 px-4 rounded-xl"
        >
          Buscar
        </Button>

      </div>
    </div>
  );
}
