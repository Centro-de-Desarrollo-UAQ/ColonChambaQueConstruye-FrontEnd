"use client";
import { useState } from "react";
import { Search, Filter, SortAsc } from "lucide-react";

type SearchBarProps = {
  showFilter?: boolean;
  showSort?: boolean;
};

export default function SearchBar({ showFilter = false, showSort = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 bg-[#F4F4F5] rounded-md border px-3 py-2 w-full max-w-2xl">
      {/* Ícono de búsqueda */}
      <Search className="text-gray-500" size={20} />

      {/* Input */}
      <input
        type="text"
        placeholder="¿Qué puesto estas buscando?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
      />

      {/* Opcional: Íconos de filtros */}
      {showFilter && (
        <button className="text-gray-600 hover:text-black transition">
          <Filter size={18} />
        </button>
      )}

      {showSort && (
        <button className="text-gray-600 hover:text-black transition">
          <SortAsc size={18} />
        </button>
      )}

      {/* Botón de búsqueda */}
      <button className="ml-2 bg-[#2F53A3] hover:bg-[#1e3d80] text-white text-sm font-semibold px-4 py-1.5 rounded-md">
        Buscar
      </button>
    </div>
  );
}
