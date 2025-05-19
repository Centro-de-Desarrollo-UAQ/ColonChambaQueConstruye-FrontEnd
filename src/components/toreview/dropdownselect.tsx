//! This component is incorrectly implemented, it must be refactored
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type DropdownSelectProps = {
  color?: 'gray' | 'blue';
};

export default function DropdownSelect({ color = 'gray' }: DropdownSelectProps) {
  const [selected, setSelected] = useState('Text');
  const [open, setOpen] = useState(false);
  const options = ['Text', 'Image', 'Video'];

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
  };

  const borderColor = color === 'blue' ? 'border-blue-500' : 'border-gray-300';
  const textColor = color === 'blue' ? 'text-blue-500' : 'text-black';
  const hoverBg = color === 'blue' ? 'hover:bg-blue-50' : 'hover:bg-gray-100';

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-between rounded-full border ${borderColor} ${textColor} min-w-[100px] px-4 py-1.5 text-sm shadow-sm ${hoverBg}`}
      >
        <span>{selected}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
