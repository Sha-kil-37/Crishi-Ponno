"use client";

import { PRODUCT_STATUS_OPTIONS } from "@/lib/shop/productFilters";

interface StatusFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  const toggleStatus = (status: string) => {
    const next = value.includes(status)
      ? value.filter((item) => item !== status)
      : [...value, status];

    onChange(next);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-800">Status</h3>
      <div className="space-y-2">
        {PRODUCT_STATUS_OPTIONS.map((status) => {
          const checked = value.includes(status);

          return (
            <label
              key={status}
              className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleStatus(status)}
                className="h-4 w-4 rounded border-slate-300 text-[#1f7a1f] focus:ring-[#1f7a1f]"
              />
              <span>{status}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
