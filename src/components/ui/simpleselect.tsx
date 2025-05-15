'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SimpleSelect() {
  const [selected, setSelected] = useState('Text');
  const [open, setOpen] = useState(false);
  const options = ['Text', 'Image', 'Video'];

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="relative w-[220px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md bg-[#F4F4F5] px-3 py-1.5 text-sm text-gray-800"
      >
        <span>{selected}</span>
        <ChevronDown size={16} className="text-gray-700" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-sm">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-3 py-1.5 text-sm hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
