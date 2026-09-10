"use client";
//
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, PencilLine, Plus, Trash2 } from "lucide-react";
//
import SearchBar from "@/components/shared/admin/SearchBar";
import ProductCategorySelect, {
  ProductCategory,
} from "@/components/shared/admin/ProductCategorySelect";
import ProductBrandSelect, {
  ProductBrand,
} from "@/components/shared/admin/ProductBrandSelect";
import ProductStatusSelect, {
  ProductStatus,
} from "@/components/shared/admin/ProductStatusSelect";

const brands: ProductBrand[] = [
  { _id: "1", name: "Brand A" },
  { _id: "2", name: "Brand B" },
  { _id: "3", name: "AgriGrow" },
];

const categories: ProductCategory[] = [
  { _id: "1", name: "Seeds" },
  { _id: "2", name: "Fertilizers" },
  { _id: "3", name: "Pesticides" },
  { _id: "4", name: "Agricultural Tools" },
];

const statuses: ProductStatus[] = [
  { _id: "1", name: "In Stock" },
  { _id: "2", name: "Out of Stock" },
  { _id: "3", name: "Discontinued" },
];

const products = [
  {
    name: "Hybrid Rice Seed",
    category: "Seeds",
    brand: "AgriGrow",
    stock: 120,
    price: 480,
    status: "In Stock",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Organic Compost",
    category: "Fertilizers",
    brand: "Brand A",
    stock: 48,
    price: 760,
    status: "Low Stock",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Neem Spray",
    category: "Pesticides",
    brand: "Brand B",
    stock: 84,
    price: 390,
    status: "In Stock",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Garden Hoe",
    category: "Agricultural Tools",
    brand: "AgriGrow",
    stock: 14,
    price: 920,
    status: "Out of Stock",
    color: "bg-rose-100 text-rose-700",
  },
];

export default function Page() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1f7a1f]">
            Inventory control
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage your agricultural products
          </h1>
        </div>

        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f7a1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#145a14]"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

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
            <SearchBar />
          </div>

          <form className="grid w-full gap-3 md:grid-cols-3 xl:max-w-2xl">
            <div>
              <label
                htmlFor="product-category"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Category
              </label>
              <ProductCategorySelect
                categories={categories}
                value={category}
                onValueChange={setCategory}
              />
            </div>

            <div>
              <label
                htmlFor="product-brand"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Brand
              </label>
              <ProductBrandSelect
                brands={brands}
                value={brand}
                onValueChange={setBrand}
              />
            </div>

            <div>
              <label
                htmlFor="product-status"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Status
              </label>
              <ProductStatusSelect
                statuses={statuses}
                value={status}
                onValueChange={setStatus}
              />
            </div>
          </form>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[#dfeadf] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Products list
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
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {products.map((product) => (
                <tr key={product.name} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-lime-100 text-lg font-bold text-emerald-700">
                        {product.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">{product.category}</td>
                  <td className="px-5 py-4">{product.stock}</td>
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    ৳{product.price}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${product.color}`}
                    >
                      {product.status}
                    </span>
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
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
