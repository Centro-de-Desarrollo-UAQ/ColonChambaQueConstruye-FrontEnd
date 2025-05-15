'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function Toggle() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-fit flex-col gap-4 rounded-2xl bg-white p-4 shadow">
      {[0, 1].map((index) => (
        <button
          key={index}
          onClick={() => setActive(index)}
          className={`flex h-10 w-10 items-center justify-center rounded-full shadow transition-all duration-200 ${active === index ? 'bg-[#2563eb] text-white' : 'bg-[#6b7280] text-white'}`}
        >
          <Plus size={16} />
        </button>
      ))}
    </div>
  );
}
