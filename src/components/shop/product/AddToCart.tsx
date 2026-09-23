"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { addItem } from "@/store/cartSlice";
import type { AppDispatch } from "@/store/store";
import QuantitySelector from "./QuantitySelector";

type AddToCartProps = {
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    unit: string;
    imageUrl?: string;
    quantity: number;
    status: string;
  };
};

export default function AddToCart({ product }: AddToCartProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const unavailable =
    product.quantity < 1 ||
    product.status === "Out of Stock" ||
    product.status === "Discontinued";

  const handleAddToCart = async () => {
    if (isAdding || unavailable) return;
    setIsAdding(true);
    try {
      dispatch(
        addItem({
          productId: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          unit: product.unit,
          imageUrl: product.imageUrl,
          quantity,
          availableStock: product.quantity,
        }),
      );
      toast.success(`${product.name} added to your cart`);
    } catch {
      toast.error("Could not add this product to your cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-[#dcebdc] pt-6 sm:flex-row sm:items-center">
      <QuantitySelector
        quantity={quantity}
        maxQuantity={product.quantity || undefined}
        onChange={setQuantity}
      />
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding || unavailable}
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#0f3d2e] px-6 font-semibold text-white transition hover:bg-[#1f7a1f] disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <ShoppingCart className="size-5" />
        {isAdding ? "Adding..." : unavailable ? "Unavailable" : "Add to cart"}
      </button>
    </div>
  );
}
