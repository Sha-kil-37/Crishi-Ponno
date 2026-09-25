"use client";

import { MAX_PRICE, MIN_PRICE } from "@/lib/shop/productFilters";

interface PriceFilterProps {
  minValue: number | null;
  maxValue: number | null;
  onChange: (next: {
    minPrice: number | null;
    maxPrice: number | null;
  }) => void;
}

export default function PriceFilter({
  minValue,
  maxValue,
  onChange,
}: PriceFilterProps) {
  const currentMin = Math.max(minValue ?? MIN_PRICE, MIN_PRICE);
  const currentMax = Math.min(maxValue ?? MAX_PRICE, MAX_PRICE);

  const handleMinSliderChange = (value: number) => {
    const nextMin = Math.min(value, currentMax);
    onChange({ minPrice: nextMin, maxPrice: currentMax });
  };

  const handleMaxSliderChange = (value: number) => {
    const nextMax = Math.max(value, currentMin);
    onChange({ minPrice: currentMin, maxPrice: nextMax });
  };

  const applyNumericChange = (type: "min" | "max", value: string) => {
    const nextValue = Number(value);
    if (!Number.isFinite(nextValue) || nextValue < MIN_PRICE) {
      return;
    }

    if (type === "min") {
      const safeMin = Math.min(Math.max(nextValue, MIN_PRICE), currentMax);
      onChange({ minPrice: safeMin, maxPrice: currentMax });
      return;
    }

    const safeMax = Math.max(Math.min(nextValue, MAX_PRICE), currentMin);
    onChange({ minPrice: currentMin, maxPrice: safeMax });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Price Range</h3>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>৳{currentMin.toLocaleString()}</span>
          <span>৳{currentMax.toLocaleString()}</span>
        </div>

        <div className="space-y-3">
          <div className="relative h-2 rounded-full bg-slate-200">
            <div
              className="absolute h-2 rounded-full bg-[#1f7a1f]"
              style={{
                left: `${(currentMin / MAX_PRICE) * 100}%`,
                width: `${((currentMax - currentMin) / MAX_PRICE) * 100}%`,
              }}
            />
          </div>

          <div className="relative h-6">
            <input
              aria-label="Minimal price"
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={10}
              value={currentMin}
              onChange={(event) =>
                handleMinSliderChange(Number(event.target.value))
              }
              className="pointer-events-none absolute inset-0 h-2 w-full appearance-none bg-transparent accent-[#1f7a1f]"
            />
            <input
              aria-label="Maximum price"
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={10}
              value={currentMax}
              onChange={(event) =>
                handleMaxSliderChange(Number(event.target.value))
              }
              className="pointer-events-none absolute inset-0 h-2 w-full appearance-none bg-transparent accent-[#1f7a1f]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1.5 text-xs font-medium text-slate-700">
          <span>Min Price</span>
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={currentMin}
            onChange={(event) => applyNumericChange("min", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 focus:border-[#1f7a1f] focus:outline-none focus:ring-2 focus:ring-[#1f7a1f]/20"
          />
        </label>

        <label className="space-y-1.5 text-xs font-medium text-slate-700">
          <span>Max Price</span>
          <input
            type="number"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={currentMax}
            onChange={(event) => applyNumericChange("max", event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-800 focus:border-[#1f7a1f] focus:outline-none focus:ring-2 focus:ring-[#1f7a1f]/20"
          />
        </label>
      </div>
    </div>
  );
}
