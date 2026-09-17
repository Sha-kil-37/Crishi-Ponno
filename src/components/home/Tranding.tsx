"use client";

import Link from "next/link";
import { ArrowUpRight, Flame, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { useGetAllProductQuery } from "@/store/services/productApi";
import Image from "next/image";
//
function Tranding() {
  const { data: products, isLoading, isError } = useGetAllProductQuery();

  const trendingProducts = useMemo(
    () =>
      (products ?? [])
        .filter((product) => product.status === "Published")
        .sort(
          (firstProduct, secondProduct) =>
            new Date(secondProduct.createdAt).getTime() -
            new Date(firstProduct.createdAt).getTime(),
        )
        .slice(0, 6),
    [products],
  );

  if (isLoading) {
    return (
      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        aria-label="Loading trending products"
      >
        <div className="mb-7 h-16 w-72 animate-pulse rounded-lg bg-[#eaf3e8]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl bg-[#f1f6ef]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !trendingProducts.length) {
    return null;
  }

  const [featuredProduct, ...supportingProducts] = trendingProducts;

  return (
    <section className="relative overflow-hidden bg-[#f6fbf4] py-14 sm:py-18">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#e4f1d8] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c27b1a]">
              <Flame size={15} strokeWidth={2.5} />
              <span>What shoppers are noticing</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#163b2a] sm:text-4xl">
              Trending now
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#64746a] sm:text-base">
              Fresh picks from trusted sellers, ready for your next growing
              season.
            </p>
          </div>
          <Link
            href="/products"
            className="group hidden items-center gap-2 rounded-full bg-[#163b2a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f7a3a] sm:inline-flex"
          >
            Browse all
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr]">
          <ProductCard product={featuredProduct} featured />
          {supportingProducts.slice(0, 2).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {supportingProducts.length > 2 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportingProducts.slice(2).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  featured = false,
}: {
  product: NonNullable<
    ReturnType<typeof useGetAllProductQuery>["data"]
  >[number];
  featured?: boolean;
}) {
  return (
    <Link
      href={`/?product=${encodeURIComponent(product.slug)}`}
      className={`group relative block overflow-hidden rounded-2xl border border-[#dcebdc] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${featured ? "min-h-90" : "min-h-75"}`}
    >
      <div className="absolute inset-0 bg-[#dcebdc]">
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(140deg,#dcebdc,#a9cf9a)] text-5xl font-bold text-[#1f7a3a]">
            {product.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-[#102f21] via-[#102f21]/25 to-transparent" />
      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-[#f8c15a] px-3 py-1 text-xs font-bold text-[#513408]">
        <TrendingUp size={13} />
        New pick
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
          {product.category?.name ?? "Agriculture"}
        </p>
        <h3
          className={`${featured ? "text-2xl" : "text-xl"} mt-1 truncate font-semibold`}
        >
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-bold text-[#f8c15a]">
            ৳{product.price.toLocaleString()}{" "}
            <span className="text-sm font-medium text-white/70">
              / {product.unit}
            </span>
          </p>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#163b2a] transition group-hover:bg-[#f8c15a]">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Tranding;
