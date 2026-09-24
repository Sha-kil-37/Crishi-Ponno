"use client";

import { useGetAllProductQuery } from "@/store/services/admin/productApi";

export default function ProductGrid() {
  const { data: products, isLoading, isError } = useGetAllProductQuery();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-slate-500">Loading products...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-red-600">Failed to load products.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1f7a1f]">
            Fresh from our marketplace
          </p>
          <h2 className="mt-1 text-2xl font-bold text-[#163b1b] sm:text-3xl">
            All products
          </h2>
        </div>
        <span className="text-sm text-slate-500">
          {products?.length ?? 0} products
        </span>
      </div>

      {products?.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <article
              key={product._id}
              className="group overflow-hidden rounded-md border border-[#dcebdc] transition p-2 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden rounded-md">
                {product.image?.url ? (
                  <img
                    src={product.image.url}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-200 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl font-bold text-[#1f7a1f]">
                    {product.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="mt-2">
                <p className="truncate text-sm text-slate-500">
                  {product.category?.name ?? "Agriculture"}
                </p>
                <h3 className="mt-1 truncate font-semibold text-[#163b1b]">
                  {product.name}
                </h3>
                <p className="mt-2 font-bold text-[#1f7a1f]">
                  ৳{product.price.toLocaleString()} / {product.unit}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-slate-500">No products found.</p>
      )}
    </section>
  );
}
