"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function Toggle() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow w-fit">
      {[0, 1].map((index) => (
        <button
          key={index}
          onClick={() => setActive(index)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow 
            ${active === index ? "bg-[#2563eb] text-white" : "bg-[#6b7280] text-white"}`}
        >
          <Plus size={16} />
        </button>
      ))}
    </div>
  );
}
