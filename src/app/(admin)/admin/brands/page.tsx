// //
// "use client";
// //
// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   FolderTree,
//   Layers3,
//   Plus,
//   Search,
//   ShoppingBasket,
// } from "lucide-react";
// import Brand from "@/components/shared/admin/Brand";
// import { useGetAllBrandQuery } from "@/store/services/brandApi";
// //
// export default function Page() {
//   const { data, isLoading, isFetching, isError } = useGetAllBrandQuery();

//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All status");
//   const filteredBrands = useMemo(
//     () =>
//       data?.filter((brand) => {
//         const matchesQuery = `${brand.name} ${brand.description}`
//           .toLowerCase()
//           .includes(query.toLowerCase());

//         return (
//           matchesQuery && (status === "All status" || brand.status === status)
//         );
//       }) ?? [],
//     [data, query, status],
//   );

//   if (isLoading) {
//     return <p>Loading brands...</p>;
//   }

//   if (isError) {
//     return <p className="text-red-500">Failed to load brands.</p>;
//   }
//   //
//   //
//   return (
//     <main className="space-y-6">
//       {isFetching && <p>Updating brands...</p>}
//       <section className="relative overflow-hidden rounded-2xl bg-[#0f3d2e] px-6 py-7 text-white shadow-sm sm:px-8">
//         <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
//           <div className="max-w-2xl">
//             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f6c453]">
//               Catalogue structure
//             </p>
//             <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
//               Keep your brands growing
//             </h1>
//             <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/75">
//               Organise the marketplace so customers can find the right products
//               for their next harvest.
//             </p>
//           </div>
//           <Link
//             href="/admin/brands/create"
//             className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#f6c453] px-4 py-2.5 text-sm font-bold text-[#163b1b] transition hover:bg-[#ffd875]"
//           >
//             <Plus size={17} />
//             Add brand
//           </Link>
//         </div>
//         <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-30 border-emerald-700/40" />
//         <div className="absolute -bottom-24 right-40 h-40 w-40 rounded-full border-20 border-[#f6c453]/15" />
//       </section>

//       <section className="grid gap-4 sm:grid-cols-3">
//         {[
//           {
//             label: "Total brands",
//             value: "12",
//             icon: FolderTree,
//             color: "bg-emerald-100 text-emerald-700",
//           },
//           {
//             label: "Subbrands",
//             value: "28",
//             icon: Layers3,
//             color: "bg-amber-100 text-amber-700",
//           },
//           {
//             label: "Products organised",
//             value: "624",
//             icon: ShoppingBasket,
//             color: "bg-sky-100 text-sky-700",
//           },
//         ].map(({ label, value, icon: Icon, color }) => (
//           <div
//             key={label}
//             className="flex items-center gap-4 rounded-2xl border border-[#dfeadf] bg-white p-4 shadow-sm"
//           >
//             <div
//               className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}
//             >
//               <Icon size={21} />
//             </div>
//             <div>
//               <p className="text-sm text-slate-500">{label}</p>
//               <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
//             </div>
//           </div>
//         ))}
//       </section>

//       <section className="rounded-2xl border border-[#dfeadf] bg-white p-4 shadow-sm sm:p-5">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h2 className="text-lg font-bold text-slate-900">All brands</h2>
//             <p className="mt-1 text-sm text-slate-500">
//               A clear home for every product line.
//             </p>
//           </div>
//           <div className="flex flex-col gap-3 sm:flex-row">
//             <label className="relative min-w-0 sm:w-72">
//               <span className="sr-only">Search brands</span>
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <input
//                 value={query}
//                 onChange={(event) => setQuery(event.target.value)}
//                 placeholder="Search brands"
//                 className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#1f7a1f] focus:ring-2 focus:ring-emerald-100"
//               />
//             </label>
//             <label>
//               <span className="sr-only">Filter by status</span>
//               <select
//                 value={status}
//                 onChange={(event) => setStatus(event.target.value)}
//                 className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1f7a1f] sm:w-36"
//               >
//                 <option>All status</option>
//                 <option>Published</option>
//                 <option>Draft</option>
//               </select>
//             </label>
//           </div>
//         </div>

//         <div className="mt-5 grid gap-4 xl:grid-cols-2">
//           {filteredBrands?.map((brand) => (
//             <Brand key={brand.slug} brand={brand} />
//           ))}
//         </div>
//         {filteredBrands?.length === 0 && (
//           <p className="py-10 text-center text-sm text-slate-500">
//             No brands match your search.
//           </p>
//         )}
//       </section>
//     </main>
//   );
// }



//
"use client";
//
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  FolderTree,
  Layers3,
  PencilLine,
  Plus,
  Search,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useGetAllBrandQuery } from "@/store/services/brandApi";
//
export default function Page() {
  const { data, isLoading, isFetching, isError } = useGetAllBrandQuery();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All status");
  const filteredBrands = useMemo(
    () =>
      data?.filter((brand) => {
        const matchesQuery = `${brand.name} ${brand.description}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return (
          matchesQuery &&
          (status === "All status" || brand.status === status)
        );
      }) ?? [],
    [data, query, status],
  );

  if (isLoading) {
    return <p>Loading brands...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load brands.</p>;
  }
  //
  //
  return (
    <main className="space-y-6">
      {isFetching && <p>Updating brands...</p>}
      <section className="relative overflow-hidden rounded-2xl bg-[#0f3d2e] px-6 py-7 text-white shadow-sm sm:px-8">
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f6c453]">
              Catalogue structure
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Keep your brands growing
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/75">
              Organise the marketplace so customers can find the right products
              for their next harvest.
            </p>
          </div>
          <Link
            href="/admin/brands/create"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#f6c453] px-4 py-2.5 text-sm font-bold text-[#163b1b] transition hover:bg-[#ffd875]"
          >
            <Plus size={17} />
            Add brand
          </Link>
        </div>
        <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-30 border-emerald-700/40" />
        <div className="absolute -bottom-24 right-40 h-40 w-40 rounded-full border-20 border-[#f6c453]/15" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total brands",
            value: "12",
            icon: FolderTree,
            color: "bg-emerald-100 text-emerald-700",
          },
          {
            label: "Subbrands",
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
                <option>All status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </form>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#dfeadf] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Brand list
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
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created At</th>
                <th className="px-5 py-3 font-medium">Last Updated</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {filteredBrands?.map((brand) => (
                <tr key={brand.name} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 text-lg font-bold text-emerald-700">
                        {brand.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {brand.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {(brand.description ?? "").slice(0, 20)}
                    {(brand.description?.length ?? 0) > 20 && "..."}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                        brand.status === "Published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {brand.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {new Date(brand.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-4">
                    {new Date(brand.updatedAt).toLocaleDateString("en-GB")}
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
              {filteredBrands?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-sm text-slate-500"
                  >
                    No brands match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
