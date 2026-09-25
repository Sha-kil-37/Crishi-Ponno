"use client";

import { Search } from "lucide-react";
import { useRef } from "react";

interface FilterSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSearch({ value, onChange }: FilterSearchProps) {
  const timeoutRef = useRef<number | null>(null);

  const handleChange = (nextValue: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onChange(nextValue);
    }, 400);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="shop-search"
        className="text-sm font-medium text-slate-700"
      >
        Search Products
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          id="shop-search"
          type="text"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Search by name..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3 pl-9 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1f7a1f] focus:outline-none focus:ring-2 focus:ring-[#1f7a1f]/20"
        />
      </div>
    </div>
  );
}
