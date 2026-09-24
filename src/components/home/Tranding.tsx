"use client";
//
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useGetAllProductQuery } from "@/store/services/admin/productApi";
import type { Product } from "@/types/product/product";
//
/* =========================================================
   HELPERS
========================================================= */

const FALLBACK_IMAGE = "/meta/logo.png";

type TrendingProduct = Omit<Product, "category" | "image"> & {
  id?: string;
  image?: Product["image"] | string;
  images?: Array<string | { url?: string }>;
  category?: Product["category"] | string;
  salesCount?: number | string;
};

function getImage(product: TrendingProduct) {
  const image = product?.image;

  if (
    typeof image === "object" &&
    typeof image?.url === "string" &&
    image.url.length > 0
  ) {
    return image.url;
  }

  if (typeof image === "string" && image.length > 0) {
    return image;
  }

  if (Array.isArray(product?.images) && typeof product.images[0] === "string") {
    return product.images[0];
  }

  return FALLBACK_IMAGE;
}

function getCategory(product: TrendingProduct) {
  if (typeof product?.category === "object") {
    return product.category?.name || "Agriculture";
  }

  return "Agriculture";
}

function getSlug(product: TrendingProduct) {
  return product?.slug || product?._id || product?.id;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(price || 0));
}

/* =========================================================
   FEATURED PRODUCT
========================================================= */

function FeaturedProduct({ product }: { product?: TrendingProduct }) {
  // console.log(product.image.url);
  if (!product) return null;

  const image = getImage(product);
  const category = getCategory(product);
  const slug = getSlug(product);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#eef5e9] sm:min-h-[600px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={product?.name || "Featured agricultural product"}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /> */}

      {/* Category */}
      <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-green-800 backdrop-blur-md sm:left-8 sm:top-8">
        <Leaf className="h-3.5 w-3.5" />
        {category}
      </div>

      {/* Product information */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
        <div className="max-w-lg">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-green-200">
            Featured this week
          </p>

          <h3 className="max-w-md text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {product?.name || "Fresh Agricultural Product"}
          </h3>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-2xl font-bold text-white">
              {formatPrice(product?.price)}
            </span>

            <Link
              href={`/products/${slug}`}
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white transition-transform duration-300 hover:scale-110"
              aria-label={`View ${product?.name || "product"}`}
            >
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   SECONDARY PRODUCT
========================================================= */

function SecondaryProduct({
  product,
  index,
}: {
  product?: TrendingProduct;
  index: number;
}) {
  if (!product) return null;

  const image = getImage(product);
  const slug = getSlug(product);
  const category = getCategory(product);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
      }}
      className="group relative flex min-h-[285px] overflow-hidden rounded-[2rem] bg-zinc-900 p-6 sm:min-h-[290px]"
    >
      <Image
        src={image}
        alt={product?.name || "Agricultural product"}
        fill
        sizes="(max-width: 1024px) 100vw, 35vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" /> */}

      {/* Number */}
      <span className="absolute left-6 top-6 z-10 text-xs font-semibold tracking-[0.2em] text-white/70">
        0{index + 1}
      </span>

      {/* Content */}
      <div className="relative z-10 mt-auto max-w-[55%]">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-green-200">
          {category}
        </p>

        <h3 className="line-clamp-2 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
          {product?.name || "Agricultural Product"}
        </h3>

        <div className="mt-4 flex items-center gap-3">
          <span className="font-semibold text-white">
            {formatPrice(product?.price)}
          </span>

          <Link
            href={`/products/${slug}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm transition-all duration-300 group-hover:bg-green-700 group-hover:text-white"
            aria-label={`View ${product?.name || "product"}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function TrendingLoading() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-4">
          <div className="h-4 w-28 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-12 w-80 animate-pulse rounded-xl bg-zinc-200" />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="min-h-[500px] animate-pulse rounded-[2rem] bg-zinc-100" />

          <div className="space-y-5">
            <div className="h-[240px] animate-pulse rounded-[2rem] bg-zinc-100" />
            <div className="h-[240px] animate-pulse rounded-[2rem] bg-zinc-100" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Trending() {
  const { data: products = [], isLoading, isError } = useGetAllProductQuery();

  const [currentPage, setCurrentPage] = useState(0);

  /*
   * For now we create the trending collection from the
   * products returned by your API.
   *
   * Later you can replace this with:
   * product.isTrending === true
   * or salesCount / viewCount based ranking.
   */

  const trendingProducts = useMemo(() => {
    return ([...products] as TrendingProduct[])
      .filter(
        (product) =>
          product?.status !== "Out of Stock" &&
          product?.status !== "Discontinued",
      )
      .sort((a, b) => Number(b?.salesCount || 0) - Number(a?.salesCount || 0));
  }, [products]);

  const pageSize = 3;

  const totalPages = Math.max(1, Math.ceil(trendingProducts.length / pageSize));
  //
  const visibleProducts = useMemo(() => {
    const start = currentPage * pageSize;
    //
    return trendingProducts.slice(start, start + pageSize);
  }, [trendingProducts, currentPage]);
  //
  const featuredProduct = visibleProducts[0];

  const secondaryProducts = visibleProducts.slice(1, 3);
  //
  if (isLoading) {
    return <TrendingLoading />;
  }

  if (isError) {
    return null;
  }

  if (!trendingProducts.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="trending-heading"
      className="overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-green-700"
            >
              <TrendingUp className="h-4 w-4" />
              Trending now
            </motion.div>

            <motion.h2
              id="trending-heading"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl lg:text-6xl"
            >
              What&apos;s growing
              <br />
              <span className="text-zinc-400">right now.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {/* Navigation */}
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-all hover:border-zinc-950 hover:bg-zinc-950 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              aria-label="Previous trending products"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages - 1, page + 1))
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-all hover:border-zinc-950 hover:bg-zinc-950 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              aria-label="Next trending products"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <Link
              href="/products"
              className="group ml-2 hidden items-center gap-2 text-sm font-semibold text-zinc-900 sm:flex"
            >
              Explore all
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"
        >
          {/* Large Product */}
          <FeaturedProduct product={featuredProduct} />

          {/* Small Products */}
          <div className="grid gap-5">
            {secondaryProducts.map((product, index) => (
              <SecondaryProduct
                key={product?._id || product?.id || index}
                product={product}
                index={index + 1}
              />
            ))}
          </div>
        </motion.div>

        {/* =================================================
            MOBILE EXPLORE
        ================================================= */}

        <div className="mt-8 sm:hidden">
          <Link
            href="/products"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-4 text-sm font-semibold text-white"
          >
            Explore all products
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* =================================================
            PAGINATION INDICATOR
        ================================================= */}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to trending products page ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "w-8 bg-zinc-950"
                    : "w-1.5 bg-zinc-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
