"use client";
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { useGetAllCategoryQuery } from "@/store/services/categoryApi";
import { useMemo } from "react";
//
function CategorysBanner() {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoryQuery();
  //
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
              className="h-52 animate-pulse rounded-2xl bg-[#e7f0e2]"
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
  //
  return (
    <main className="relative overflow-hidden bg-[#f7fbf3]">
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#e4f1d8] opacity-70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c27b1a]">
              <Leaf size={15} strokeWidth={2.5} />
              <span>Fresh from the source</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#163b1b] sm:text-4xl">
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
            View all <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {filteredCategories.slice(0, 5).map((category, index) => (
            <Link
              key={category._id}
              href={`/?category=${encodeURIComponent(category.slug)}`}
              className="group relative isolate flex min-h-52 overflow-hidden rounded-2xl bg-[#dcebdc] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {category.image?.url ? (
                <img
                  src={category.image.url}
                  alt={category.name}
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(140deg,#dcebdc,#a9cf9a)]" />
              )}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0f3d2e]/90 via-[#0f3d2e]/15 to-transparent" />
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#1f7a1f] opacity-0 shadow-sm transition group-hover:opacity-100">
                <ArrowUpRight size={16} />
              </span>
              <div className="mt-auto w-full p-4 sm:p-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[#f6d28b]">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/80">
                    {category.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default CategorysBanner;
