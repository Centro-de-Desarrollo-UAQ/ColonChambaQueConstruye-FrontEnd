//! This component is incorrectly implemented, it must be refactored
'use client';
import { useState } from 'react';
import { MinimalisticMagnifer, Filter, Sort } from '@solar-icons/react';

type SearchBarProps = {
  showFilter?: boolean;
  showSort?: boolean;
};

export default function SearchBar({ showFilter = false, showSort = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  return (
    <div className="flex w-full max-w-2xl items-center gap-2 rounded-md border bg-[#F4F4F5] px-3 py-2">
      {/* Ícono de búsqueda */}
      <MinimalisticMagnifer className="text-gray-500" size={20} />

      {/* Input */}
      <input
        type="text"
        placeholder="¿Qué puesto estas buscando?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />

      {/* Opcional: Íconos de filtros */}
      {showFilter && (
        <button className="text-gray-600 transition hover:text-black">
          <Filter size={18} weight='Bold' />
        </button>
      )}

      {showSort && (
        <button className="text-gray-600 transition hover:text-black">
          <Sort size={18} />
        </button>
      )}

      {/* Botón de búsqueda */}
      <button className="ml-2 rounded-md bg-[#2F53A3] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#1e3d80]">
        Buscar
      </button>
    </div>
  );
}
