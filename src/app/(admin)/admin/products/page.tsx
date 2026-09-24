//
"use client";
//
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, PencilLine, Plus, Search, Trash2 } from "lucide-react";
import { useGetAllProductQuery } from "@/redux/rtkQuery/admin/productApi";

//
export default function Page() {
  const { data, isLoading, isFetching, isError } = useGetAllProductQuery();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All Status");
  const filteredProducts = useMemo(
    () =>
      data?.filter((product) => {
        const matchesQuery = `${product.name} ${product.description}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return (
          matchesQuery && (status === "All Status" || product.status === status)
        );
      }) ?? [],
    [data, query, status],
  );

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load products.</p>;
  }

  //
  return (
    <>
      {isFetching && <p>Updating products...</p>}
      <section className="relative overflow-hidden rounded-2xl bg-[#0f3d2e] px-6 py-7 text-white shadow-sm sm:px-8">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f6c453]">
              Catalogue structure
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Keep your product growing
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/75">
              Organise the marketplace so customers can find the right products
              for their next harvest.
            </p>
          </div>
          <Link
            href="/admin/products/create"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#f6c453] px-4 py-2.5 text-sm font-bold text-[#163b1b] transition hover:bg-[#ffd875]"
          >
            <Plus size={17} />
            Add product
          </Link>
        </div>
        <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-30 border-emerald-700/40" />
        <div className="absolute -bottom-24 right-40 h-40 w-40 rounded-full border-20 border-[#f6c453]/15" />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Products", value: "1,248", delta: "+12%" },
          { label: "Low Stock", value: "18", delta: "-4%" },
          { label: "Inventory Value", value: "$24.8k", delta: "+8%" },
          { label: "Published", value: "96%", delta: "+3%" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#dfeadf] bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{item.label}</span>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                {item.delta}
              </span>
            </div>
            <div className="mt-4 text-3xl font-bold text-slate-900">
              {item.value}
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[#dfeadf] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="w-full max-w-xl">
            <form className="w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <Search className="w-7 h-7 absolute left-0 top-[50%] transform translate-y-[-50%]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search for categories ...."
                  className="w-full h-full px-10 py-3 outline-none"
                />
              </div>
            </form>
          </div>

          <form className="">
            <div>
              <label
                htmlFor="product-status"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Status
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1f7a1f] sm:w-36"
              >
                <option>All Status</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
                <option>Low Stock</option>
                <option>Pre Order</option>
                <option>Discontinued</option>
              </select>
            </div>
          </form>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#dfeadf] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Product list
            </h2>
            <p className="text-sm text-slate-500">Latest inventory updates</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <ArrowUpRight size={16} />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm text-slate-600">
              <tr>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Quantity</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created At</th>
                <th className="px-5 py-3 font-medium">Last Updated</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {filteredProducts?.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 text-lg font-bold text-emerald-700">
                        {product.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {(product.shortDescription ?? "").slice(0, 20)}
                    {(product.shortDescription?.length ?? 0) > 20 && "..."}
                  </td>
                  <td className="px-5 py-4">{product.category?.name}</td>
                  <td className="px-5 py-4">{product.brand?.name}</td>
                  <td className="px-5 py-4">{product.quantity}</td>
                  <td className="px-5 py-4">{product.price}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        product.status === "In Stock"
                          ? "bg-emerald-200 text-white"
                          : product.status === "Out of Stock"
                            ? "bg-red-500 text-white"
                            : product.status === "Low Stock"
                              ? "bg-red-300 text-white"
                              : product.status === "Pre Order"
                                ? "bg-blue-300 text-white"
                                : product.status === "Discontinued"
                                  ? "bg-yellow-100 text-white"
                                  : ""
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {new Date(product.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-4">
                    {new Date(product.updatedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                        aria-label="Edit product"
                      >
                        <PencilLine size={16} />
                      </button>
                      <button
                        className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-600 transition hover:bg-rose-100"
                        aria-label="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-sm text-slate-500"
                  >
                    No products match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
