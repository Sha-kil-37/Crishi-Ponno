//
"use client";
//
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product/product";
//
const FALLBACK_IMAGE = "/public/meta/logo.png";

interface ProductProps {
  product: Product;
}
//
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};
//
function Product({ product }: ProductProps) {
  const imageUrl = product.image?.url || FALLBACK_IMAGE;

  //
  return (
    <motion.article variants={itemVariants} className="group">
      <div className="overflow-hidden rounded-xl transition ">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
            <Image
              height={100}
              width={100}
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
            />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#1f7a1f] shadow-sm">
              {product.category?.name || "Agriculture"}
            </span>
          </div>
        </Link>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="truncate text-xs font-semibold uppercase tracking-wide text-[#1f7a1f]">
              {product.brand?.name || "Fresh produce"}
            </p>
            <span
              className={`rounded-full px-2 ${
                product?.status === "In Stock" ? "bg-green-400" : "bg-[#f5f5f5]"
              }`}
            >
              {product.status}
            </span>
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="truncate text-base font-bold transition-colors group-hover:text-[#1f7a1f]">
              {product.name}
            </h3>
          </Link>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold ">
              ৳{product.price.toLocaleString()}
            </p>
            <span className="">per {product.unit}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default Product;
