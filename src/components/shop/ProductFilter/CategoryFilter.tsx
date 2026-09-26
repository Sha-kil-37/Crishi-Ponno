"use client";

import { useGetAllCategoryQuery } from "@/redux/rtkQuery/admin/category/categoryApi";
import { useMemo, useState } from "react";

interface CategoryFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function CategoryFilter({
  value,
  onChange,
}: CategoryFilterProps) {
  const { data: categories = [], isLoading } = useGetAllCategoryQuery();
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = useMemo(() => {
    if (showAll || categories.length <= 6) {
      return categories;
    }

    return categories.slice(0, 6);
  }, [categories, showAll]);

  const toggleCategory = (slug: string) => {
    const next = value.includes(slug)
      ? value.filter((item) => item !== slug)
      : [...value, slug];

    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Category</h3>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading categories...</p>
      ) : (
        <div className="space-y-2">
          {visibleCategories.map((category) => {
            const checked = value.includes(category.slug);
            return (
              <label
                key={category._id}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category.slug)}
                  className="h-4 w-4 rounded border-slate-300 text-[#1f7a1f] focus:ring-[#1f7a1f]"
                />
                <span>{category.name}</span>
              </label>
            );
          })}

          {categories.length > 6 && (
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
