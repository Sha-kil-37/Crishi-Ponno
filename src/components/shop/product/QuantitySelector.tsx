"use client";

import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  quantity: number;
  maxQuantity?: number;
  onChange: (quantity: number) => void;
};

export default function QuantitySelector({
  quantity,
  maxQuantity,
  onChange,
}: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(1, quantity - 1));
  const increase = () =>
    onChange(Math.min(maxQuantity ?? Number.MAX_SAFE_INTEGER, quantity + 1));

  return (
    <div
      className="inline-flex items-center rounded-full border border-[#cfe2cf] p-1"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="rounded-full p-2 text-[#0f3d2e] hover:bg-[#f0f7ef] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus className="size-4" />
      </button>
      <span
        className="min-w-10 text-center font-semibold text-[#0f3d2e]"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={maxQuantity !== undefined && quantity >= maxQuantity}
        aria-label="Increase quantity"
        className="rounded-full p-2 text-[#0f3d2e] hover:bg-[#f0f7ef] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
