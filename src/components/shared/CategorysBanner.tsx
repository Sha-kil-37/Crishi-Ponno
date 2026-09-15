"use client";

import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { useGetAllCategoryQuery } from "@/store/services/categoryApi";
import { useMemo } from "react";

function CategorysBanner() {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoryQuery();

  const filteredCategories = useMemo(
    () =>
      (categories ?? []).filter((category) => category.status === "Published"),
    [categories],
  );

  if (isCategoriesLoading) {
    return (
      <main
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        aria-label="Loading categories"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-52 animate-pulse rounded-2xl bg-[#F5F5F5]"
            />
          ))}
        </div>
      </main>
    );
  }

  if (isCategoriesError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-[#64746a]">
          Categories are temporarily unavailable. Please try again shortly.
        </p>
      </main>
    );
  }

  if (!filteredCategories.length) {
    return null;
  }

  return (
    <main className="relative overflow-hidden py-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#e4f1d8] opacity-70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c27b1a]">
              <Leaf size={15} strokeWidth={2.5} />
              <span>Fresh from the source</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-[#163b2a] sm:text-4xl">
              Explore our categories
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#64746a] sm:text-base">
              Find trusted agricultural products, tools, and essentials for
              every growing season.
            </p>
          </div>

          <Link
            href="/?view=categories"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[#1f7a1f] transition hover:text-[#0f3d2e] sm:flex"
          >
            View all
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Category cards */}
        {/* Category cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {filteredCategories.slice(0, 5).map((category) => (
            <div key={category._id} className="group">
              {/* Image Card */}
              <Link
                href={`/?category=${encodeURIComponent(category.slug)}`}
                className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[#dcebdc] shadow-sm transition-all duration-300"
              >
                {/* Image */}
                {category.image?.url ? (
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(140deg,#dcebdc,#a9cf9a)]" />
                )}

                {/* Subtle border */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />

                {/* Arrow */}
                <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-[#1f7a1f] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={17} />
                </span>
              </Link>

            
              <div className="mt-3 px-1">
                <Link
                  href={`/?category=${encodeURIComponent(category.slug)}`}
                  className="block text-base  text-[#163b2a] transition-colors duration-200 hover:text-[#1f7a1f] sm:text-lg"
                >
                  {category.name.toUpperCase()}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <Link
          href="/?view=categories"
          className="mt-5 flex items-center justify-center gap-1 text-sm font-semibold text-[#1f7a1f] sm:hidden"
        >
          View all categories
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </main>
  );
}

export default CategorysBanner;
