"use client";

import { useGetAllBrandQuery } from "@/redux/rtkQuery/admin/brandApi";
import { useMemo, useState } from "react";

interface BrandFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function BrandFilter({ value, onChange }: BrandFilterProps) {
  const { data: brands = [], isLoading } = useGetAllBrandQuery();
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const visibleBrands = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? brands.filter((brand) => brand.name.toLowerCase().includes(normalized))
      : brands;

    if (showAll || filtered.length <= 6) {
      return filtered;
    }

    return filtered.slice(0, 6);
  }, [brands, query, showAll]);

  const toggleBrand = (slug: string) => {
    const next = value.includes(slug)
      ? value.filter((item) => item !== slug)
      : [...value, slug];

    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Brand</h3>
      </div>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search brands..."
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1f7a1f] focus:outline-none focus:ring-2 focus:ring-[#1f7a1f]/20"
      />

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading brands...</p>
      ) : (
        <div className="space-y-2">
          {visibleBrands.map((brand) => {
            const checked = value.includes(brand.slug);
            return (
              <label
                key={brand._id}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBrand(brand.slug)}
                  className="h-4 w-4 rounded border-slate-300 text-[#1f7a1f] focus:ring-[#1f7a1f]"
                />
                <span>{brand.name}</span>
              </label>
            );
          })}

          {brands.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="text-sm font-medium text-[#1f7a1f] hover:text-[#145d14]"
            >
              {showAll ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
