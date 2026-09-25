"use client";

import { parseListParam } from "@/lib/shop/productFilters";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  params: URLSearchParams;
  onRemove: (key: string, value?: string) => void;
  onClear: () => void;
}

const formatLabel = (key: string, value: string) => {
  if (key === "search") return `Search: ${value}`;
  if (key === "letter") return `A–Z: ${value}`;
  if (key === "minPrice") return `Min: ৳${Number(value).toLocaleString()}`;
  if (key === "maxPrice") return `Max: ৳${Number(value).toLocaleString()}`;
  if (key === "status") return value;
  if (key === "category") return value.replace(/-/g, " ");
  if (key === "brand") return value;
  if (key === "sort") return `Sort: ${value}`;
  return value;
};

export default function ActiveFilters({
  params,
  onRemove,
  onClear,
}: ActiveFiltersProps) {
  const chips: Array<{ key: string; value: string; label: string }> = [];

  params.forEach((value, key) => {
    if (["page", "limit"].includes(key)) {
      return;
    }

    if (["status", "category", "brand"].includes(key)) {
      parseListParam(value).forEach((item) => {
        chips.push({ key, value: item, label: formatLabel(key, item) });
      });
      return;
    }

    chips.push({ key, value, label: formatLabel(key, value) });
  });

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-700">Filters:</span>
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          type="button"
          onClick={() => onRemove(chip.key, chip.value)}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300"
          aria-label={`Remove ${chip.label} filter`}
        >
          <span>{chip.label}</span>
          <X className="size-3.5" />
        </button>
      ))}

      <button
        type="button"
        onClick={onClear}
        className="text-sm font-medium text-[#1f7a1f] hover:text-[#145d14]"
      >
        Clear all
      </button>
    </div>
  );
}
