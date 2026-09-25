"use client";

import { ALPHABET } from "@/lib/shop/productFilters";

interface AlphabetFilterProps {
  value: string;
  onChange: (value: string | null) => void;
}

export default function AlphabetFilter({
  value,
  onChange,
}: AlphabetFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Alphabet</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
            !value
              ? "border-[#1f7a1f] bg-[#1f7a1f] text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
          }`}
          aria-pressed={!value}
          aria-label="Show all products"
        >
          All
        </button>

        {ALPHABET.map((letter) => {
          const isActive = value === letter;
          return (
            <button
              key={letter}
              type="button"
              onClick={() => onChange(isActive ? null : letter)}
              className={`min-w-8 rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "border-[#1f7a1f] bg-[#1f7a1f] text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
              aria-pressed={isActive}
              aria-label={`Filter by name starting with ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
