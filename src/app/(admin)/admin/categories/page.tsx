//
"use client";
//
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FolderTree,
  Layers3,
  Plus,
  Search,
  ShoppingBasket,
} from "lucide-react";
import Category from "@/components/shared/admin/Category";
import { useGetAllCategoryQuery } from "@/store/services/categoryApi";

export default function Page() {
  const { data, isLoading, isFetching, isError } = useGetAllCategoryQuery();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All status");
  const filteredCategories = useMemo(
    () =>
      data?.filter((category) => {
        const matchesQuery = `${category.name} ${category.description}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return (
          matchesQuery &&
          (status === "All status" || category.status === status)
        );
      }) ?? [],
    [data, query, status],
  );

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load categories.</p>;
  }
  //
  //
  return (
    <main className="space-y-6">
      {isFetching && <p>Updating categories...</p>}
      <section className="relative overflow-hidden rounded-2xl bg-[#0f3d2e] px-6 py-7 text-white shadow-sm sm:px-8">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f6c453]">
              Catalogue structure
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Keep your categories growing
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/75">
              Organise the marketplace so customers can find the right products
              for their next harvest.
            </p>
          </div>
          <Link
            href="/admin/categories/create"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#f6c453] px-4 py-2.5 text-sm font-bold text-[#163b1b] transition hover:bg-[#ffd875]"
          >
            <Plus size={17} />
            Add category
          </Link>
        </div>
        <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-30 border-emerald-700/40" />
        <div className="absolute -bottom-24 right-40 h-40 w-40 rounded-full border-20 border-[#f6c453]/15" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total categories",
            value: "12",
            icon: FolderTree,
            color: "bg-emerald-100 text-emerald-700",
          },
          {
            label: "Subcategories",
            value: "28",
            icon: Layers3,
            color: "bg-amber-100 text-amber-700",
          },
          {
            label: "Products organised",
            value: "624",
            icon: ShoppingBasket,
            color: "bg-sky-100 text-sky-700",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-[#dfeadf] bg-white p-4 shadow-sm"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}
            >
              <Icon size={21} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[#dfeadf] bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">All categories</h2>
            <p className="mt-1 text-sm text-slate-500">
              A clear home for every product line.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative min-w-0 sm:w-72">
              <span className="sr-only">Search categories</span>
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search categories"
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#1f7a1f] focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label>
              <span className="sr-only">Filter by status</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1f7a1f] sm:w-36"
              >
                <option>All status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {filteredCategories?.map((category) => (
            <Category key={category.slug} category={category} />
          ))}
        </div>
        {filteredCategories?.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">
            No categories match your search.
          </p>
        )}
      </section>
    </main>
  );
}
