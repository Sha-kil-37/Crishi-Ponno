"use client";
//
import Link from "next/link";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useMemo } from "react";
import { useGetAllProductQuery } from "@/store/services/productApi";
import { Product } from "@/types/product/product";
import Image from "next/image";
//
interface ProductProps {
  product: Product;
}
//
const FALLBACK_IMAGE = "/public/meta/logo.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

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

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="aspect-square animate-pulse bg-gray-100" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-gray-100" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-gray-100" />
        <div className="h-3 w-full animate-pulse rounded-full bg-gray-100" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: ProductProps) {
  const imageUrl = product.image?.url || FALLBACK_IMAGE;

  return (
    <motion.article variants={itemVariants} className="group">
      <div className="overflow-hidden rounded-xl transition hover:-translate-y-1 hover:shadow-lg">
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

export default function Products() {
  //
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductQuery();

  const productList = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products],
  );
  // console.log(productList);
  return (
    <main className="mx-auto w-7xl">
      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && isError && (
        <div>
          <Package className="mx-auto h-10 w-10 text-red-400" />
          <h3>Unable to load products</h3>
          <p>Something went wrong while loading the products.</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-5 rounded-full bg-[#F5F5F5]"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && productList.length === 0 && (
        <div>
          <Package />
          <h3>No products available</h3>
          <p>
            There are currently no products to display. Please check again
            later.
          </p>
        </div>
      )}

      {/* Products */}
      {!isLoading && !isError && productList.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.05,
          }}
          className="grid grid-cols-4 gap-4"
        >
          {productList.map((product, i) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </motion.div>
      )}
    </main>
  );
}
