"use client";
//
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { useGetAllCategoryQuery } from "@/store/services/categoryApi";
import { useMemo } from "react";
import Image from "next/image";

function BannerCategorys() {
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

  /*
   * Duplicate the categories.
   *
   * The first set and second set are identical.
   * When the first set finishes moving, the second
   * set is already in exactly the same position.
   *
   * This creates the seamless infinite effect.
   */
  const sliderCategories = [...filteredCategories, ...filteredCategories];
  //
  return (
    <main className="relative overflow-hidden py-15">
      <div className="relative w-full">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between gap-4 mx-auto w-7xl">
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
            href="/products"
            className="group hidden items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f7a3a] transition hover:bg-lime-100 sm:inline-flex"
          >
            View all
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* =====================================================
            INFINITE CATEGORY SLIDER
        ====================================================== */}

        <div className="slider-viewport relative overflow-hidden">
          {/* Moving track */}
          <div className="flex w-max gap-1 animate-category-slider">
            {sliderCategories.map((category, index) => (
              <div
                key={`${category._id}-${index}`}
                className="group/card w-[210px] shrink-0 sm:w-[240px] lg:w-[260px]"
              >
                {/* Image */}
                <Link
                  href={`/?category=${encodeURIComponent(category.slug)}`}
                  className="relative block aspect-[4/3] overflow-hidden  bg-[#dcebdc] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {category.image?.url ? (
                    <Image
                      src={category.image?.url}
                      alt={category.name}
                      width={100}
                      height={100}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(140deg,#dcebdc,#a9cf9a)]" />
                  )}

                  {/* Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover/card:bg-black/5" />

                  {/* Border */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />

                  {/* Arrow */}
                  <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-[#1f7a1f] opacity-0 shadow-md backdrop-blur-sm transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                    <ArrowUpRight size={17} />
                  </span>
                </Link>

                {/* Category name */}
                <div className="mt-3 px-1">
                  <Link
                    href={`/?category=${encodeURIComponent(category.slug)}`}
                    className="block truncate text-base font-medium text-[#163b2a] transition-colors duration-200 hover:text-[#1f7a1f] sm:text-lg"
                  >
                    {category.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
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

      {/* =====================================================
          INFINITE SLIDER ANIMATION
      ====================================================== */}

      <style jsx>{`
        @keyframes category-slider {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 10px));
          }
        }

        .animate-category-slider {
          animation: category-slider 55s linear infinite;
          will-change: transform;
        }

        .slider-viewport:hover .animate-category-slider {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-category-slider {
            animation-play-state: paused;
          }
        }
      `}</style>
    </main>
  );
}

export default BannerCategorys;
