'use client';
import { useState } from 'react';
import { MinimalisticMagnifer, Filter, Sort } from '@solar-icons/react';
import { Button } from '@/components/ui/button';

type SearchBarProps = {
  showFilter?: boolean;
  showSort?: boolean;
  placeholder: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({
  showFilter = false,
  showSort = false,
  placeholder,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSearch();
    }
  };

  return (
    <div className="flex w-full items-center gap-4 rounded-md border h-[72px] px-3 py-2">
      <MinimalisticMagnifer className="text-gray-500" size={20} />

      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // 🔥 aquí el Enter
        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />

      {showFilter && (
        <button className="text-gray-600 transition hover:text-black">
          <Filter size={18} weight="Bold" />
        </button>
      )}

      {showSort && (
        <button className="text-gray-600 transition hover:text-black">
          <Sort size={18} />
        </button>
      )}

      <Button variant="primary" color="brand" onClick={handleSearch}>
        Buscar
      </Button>
    </div>
  );
}
