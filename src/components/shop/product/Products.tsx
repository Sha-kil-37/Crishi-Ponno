"use client";
//
import ProductFilter from "@/components/shop/ProductFilter/ProductFilter";
import { parseListParam, SORT_OPTIONS } from "@/lib/shop/productFilters";
import { useGetAllProductQuery } from "@/redux/rtkQuery/shop/product/productApi";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Package, RefreshCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import Product from "./Product";
//
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};
// product skeleton
function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="aspect-square animate-pulse bg-slate-100" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-100" />
        <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
//
function Products() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const normalized = new URLSearchParams(searchParams.toString());
    return {
      search: normalized.get("search") ?? "",
      letter: normalized.get("letter") ?? "",
      minPrice: normalized.get("minPrice")
        ? Number(normalized.get("minPrice"))
        : null,
      maxPrice: normalized.get("maxPrice")
        ? Number(normalized.get("maxPrice"))
        : null,
      status: parseListParam(normalized.get("status")),
      category: parseListParam(normalized.get("category")),
      brand: parseListParam(normalized.get("brand")),
      sort: normalized.get("sort") ?? "recommended",
      page: Number(normalized.get("page") ?? "1"),
      limit: Number(normalized.get("limit") ?? "12"),
    };
  }, [searchParams]);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllProductQuery({
      search: params.search,
      letter: params.letter || undefined,
      minPrice: params.minPrice ?? undefined,
      maxPrice: params.maxPrice ?? undefined,
      status: params.status.length ? params.status.join(",") : undefined,
      category: params.category.length ? params.category.join(",") : undefined,
      brand: params.brand.length ? params.brand.join(",") : undefined,
      sort: params.sort,
      page: params.page,
      limit: params.limit,
    });

  const products = data?.data?.products ?? [];
  const pagination = data?.data?.pagination;

  const updateUrl = useCallback(
    (nextValues: Record<string, string | number | null | undefined>) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      Object.entries(nextValues).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          nextParams.delete(key);
          return;
        }

        nextParams.set(key, String(value));
      });

      if (!nextParams.has("page")) {
        nextParams.set("page", "1");
      }

      const queryString = nextParams.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setPage = useCallback(
    (nextPage: number) => {
      const safePage = Math.max(nextPage, 1);
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.set("page", String(safePage));
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleRemoveFilter = useCallback(
    (key: string, value?: string) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      if (key === "status" || key === "category" || key === "brand") {
        const items = parseListParam(nextParams.get(key));
        const remaining = items.filter((item) => item !== value);

        if (remaining.length > 0) {
          nextParams.set(key, remaining.join(","));
        } else {
          nextParams.delete(key);
        }
      } else {
        nextParams.delete(key);
      }

      nextParams.delete("page");
      nextParams.set("page", "1");
      router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const handleClearFilters = useCallback(() => {
    const nextParams = new URLSearchParams();
    nextParams.set("page", "1");
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [pathname, router]);

  const activeSort =
    SORT_OPTIONS.find((option) => option.value === params.sort)?.label ??
    "Recommended";
  //
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-5 md:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#1f7a1f]">
            Fresh produce
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
            Shop
          </h1>
        </div>
        <div className="flex items-center gap-3 md:justify-end">
          <p className="">
            {pagination
              ? `${pagination.total.toLocaleString()} Products`
              : "Loading..."}
          </p>
          <select
            aria-label="Sort products"
            value={params.sort}
            onChange={(event) =>
              updateUrl({ sort: event.target.value, page: 1 })
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-[#1f7a1f] focus:outline-none focus:ring-2 focus:ring-[#1f7a1f]/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600">Sort: </span>
        <span className="rounded-full bg-[#edf7ed] px-2.5 py-1 text-xs font-medium text-[#1f7a1f]">
          {activeSort}
        </span>
      </div>

      <div className="lg:grid lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start lg:gap-6">
        <div className="hidden lg:block lg:sticky lg:top-6">
          <ProductFilter
            params={searchParams}
            onUpdate={updateUrl}
            onRemove={handleRemoveFilter}
            onClear={handleClearFilters}
          />
        </div>

        <div className="lg:flex-1 lg:min-w-0">
          <div className="lg:hidden">
            <ProductFilter
              params={searchParams}
              onUpdate={updateUrl}
              onRemove={handleRemoveFilter}
              onClear={handleClearFilters}
            />
          </div>

          {isLoading && (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          )}

          {!isLoading && isError && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <Package className="mx-auto h-10 w-10 text-red-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Something went wrong
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                We couldn&apos;t load the products right now.
              </p>
              <button
                type="button"
                onClick={refetch}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1f7a1f] px-4 py-2 text-sm font-medium text-white hover:bg-[#145d14]"
              >
                <RefreshCcw className="size-4" />
                Try again
              </button>
            </div>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <Package className="mx-auto h-10 w-10 text-slate-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No products found
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Try changing or removing some filters.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 rounded-xl bg-[#1f7a1f] px-4 py-2 text-sm font-medium text-white hover:bg-[#145d14]"
              >
                Clear Filters
              </button>
            </div>
          )}

          {!isLoading && !isError && products.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            >
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </motion.div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage(pagination.page - 1)}
                disabled={!pagination.hasPreviousPage || isFetching}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>
              <span className="text-sm text-slate-600">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage(pagination.page + 1)}
                disabled={!pagination.hasNextPage || isFetching}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Products;
