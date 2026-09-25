"use client";
//
import AlphabetFilter from "@/components/shop/ProductFilter/AlphabetFilter";
import ActiveFilters from "@/components/shop/ProductFilter/ActiveFilters";
import BrandFilter from "@/components/shop/ProductFilter/BrandFilter";
import CategoryFilter from "@/components/shop/ProductFilter/CategoryFilter";
import FilterSearch from "@/components/shop/ProductFilter/FilterSearch";
import MobileFilter from "@/components/shop/ProductFilter/MobileFilter";
import PriceFilter from "@/components/shop/ProductFilter/PriceFilter";
import StatusFilter from "@/components/shop/ProductFilter/StatusFilter";
import { parseListParam } from "@/lib/shop/productFilters";
import { useMemo } from "react";
//
interface ProductFilterProps {
  params: URLSearchParams;
  onUpdate: (
    nextValues: Record<string, string | number | null | undefined>,
  ) => void;
  onRemove: (key: string, value?: string) => void;
  onClear: () => void;
}

export default function ProductFilter({
  params,
  onUpdate,
  onRemove,
  onClear,
}: ProductFilterProps) {
  const search = params.get("search") ?? "";
  const letter = params.get("letter") ?? "";
  const minPrice = params.get("minPrice")
    ? Number(params.get("minPrice"))
    : null;
  const maxPrice = params.get("maxPrice")
    ? Number(params.get("maxPrice"))
    : null;
  const statuses = parseListParam(params.get("status"));
  const categories = parseListParam(params.get("category"));
  const brands = parseListParam(params.get("brand"));

  const formValues = useMemo(
    () => ({
      search,
      letter,
      minPrice,
      maxPrice,
      status: statuses.join(","),
      category: categories.join(","),
      brand: brands.join(","),
    }),
    [brands, categories, letter, maxPrice, minPrice, search, statuses],
  );

  const applyFilters = (
    updates: Record<string, string | number | null | undefined>,
  ) => {
    onUpdate({
      ...formValues,
      ...updates,
      page: 1,
    });
  };

  const resetFilters = () => {
    onClear();
  };

  return (
    <div className="space-y-5">
      <div className="hidden lg:block">
        <aside className="w-full max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <ActiveFilters
            params={params}
            onRemove={onRemove}
            onClear={resetFilters}
          />

          <div className="mt-5 mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-[#1f7a1f] hover:text-[#145d14]"
            >
              Reset
            </button>
          </div>

          <div className="space-y-6">
            <FilterSearch
              value={search}
              onChange={(nextValue) =>
                applyFilters({ search: nextValue, page: 1 })
              }
            />
            <AlphabetFilter
              value={letter}
              onChange={(nextValue) =>
                applyFilters({ letter: nextValue ?? "", page: 1 })
              }
            />
            <PriceFilter
              minValue={minPrice}
              maxValue={maxPrice}
              onChange={({ minPrice: nextMin, maxPrice: nextMax }) =>
                applyFilters({
                  minPrice: nextMin ?? "",
                  maxPrice: nextMax ?? "",
                  page: 1,
                })
              }
            />
            <StatusFilter
              value={statuses}
              onChange={(nextStatuses) =>
                applyFilters({ status: nextStatuses.join(","), page: 1 })
              }
            />
            <CategoryFilter
              value={categories}
              onChange={(nextCategories) =>
                applyFilters({ category: nextCategories.join(","), page: 1 })
              }
            />
            <BrandFilter
              value={brands}
              onChange={(nextBrands) =>
                applyFilters({ brand: nextBrands.join(","), page: 1 })
              }
            />
          </div>
        </aside>
      </div>

      <div className="lg:hidden">
        <ActiveFilters
          params={params}
          onRemove={onRemove}
          onClear={resetFilters}
        />

        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Products</h2>
          </div>
          <MobileFilter onClear={resetFilters} onApply={() => {}}>
            <FilterSearch
              value={search}
              onChange={(nextValue) =>
                applyFilters({ search: nextValue, page: 1 })
              }
            />
            <AlphabetFilter
              value={letter}
              onChange={(nextValue) =>
                applyFilters({ letter: nextValue ?? "", page: 1 })
              }
            />
            <PriceFilter
              minValue={minPrice}
              maxValue={maxPrice}
              onChange={({ minPrice: nextMin, maxPrice: nextMax }) =>
                applyFilters({
                  minPrice: nextMin ?? "",
                  maxPrice: nextMax ?? "",
                  page: 1,
                })
              }
            />
            <StatusFilter
              value={statuses}
              onChange={(nextStatuses) =>
                applyFilters({ status: nextStatuses.join(","), page: 1 })
              }
            />
            <CategoryFilter
              value={categories}
              onChange={(nextCategories) =>
                applyFilters({ category: nextCategories.join(","), page: 1 })
              }
            />
            <BrandFilter
              value={brands}
              onChange={(nextBrands) =>
                applyFilters({ brand: nextBrands.join(","), page: 1 })
              }
            />
          </MobileFilter>
        </div>
      </div>
    </div>
  );
}
