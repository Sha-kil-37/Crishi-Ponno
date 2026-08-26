//
"use client";
import { useState } from "react";
import { ImagePlus, Plus, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductCategorySelect, {
  ProductCategory,
} from "@/components/shared/admin/ProductCategorySelect";
import ProductBrandSelect, {
  ProductBrand,
} from "@/components/shared/admin/ProductBrandSelect";
import ProductStatusSelect, {
  ProductStatus,
} from "@/components/shared/admin/ProductStatusSelect";
import ProductUnitSelect from "@/components/shared/admin/ProductUnitSelect";
// product category bellow
const categories: ProductCategory[] = [
  { _id: "1", name: "Seeds" },
  { _id: "2", name: "Fertilizers" },
  { _id: "3", name: "Pesticides" },
  { _id: "4", name: "Agricultural Tools" },
];
// product unit bellow
const productUnits = [
  { _id: "1", name: "kg" },
  { _id: "2", name: "g" },
  { _id: "3", name: "L" },
  { _id: "4", name: "ml" },
  { _id: "5", name: "pcs" },
  { _id: "6", name: "box" },
  { _id: "7", name: "bag" },
  { _id: "8", name: "bundle" },
  { _id: "9", name: "set" },
  { _id: "10", name: "roll" },
  { _id: "11", name: "pack" },
  { _id: "12", name: "dozen" },
  { _id: "13", name: "pair" },
  { _id: "14", name: "bottle" },
  { _id: "15", name: "tube" },
  { _id: "16", name: "jar" },
  { _id: "17", name: "carton" },
  { _id: "18", name: "sachet" },
  { _id: "19", name: "pouch" },
  { _id: "20", name: "container" },
];
// product brands bellow
const brands: ProductBrand[] = [
  { _id: "1", name: "Brand A" },
  { _id: "2", name: "Brand B" },
  { _id: "3", name: "AgriGrow" },
];
// product status bellow
const statuses: ProductStatus[] = [
  { _id: "1", name: "In Stock" },
  { _id: "2", name: "Out of Stock" },
  { _id: "3", name: "Discontinued" },
];

export default function Page() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ category, brand, status });
  };
  //
  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#1f7a1f]">
            Product management
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Add new product
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="product-form"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1f7a1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#145a14]"
          >
            <Save size={16} />
            Save Product
          </button>
        </div>
      </div>

      <form
        id="product-form"
        name="product-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <section className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
          <div className="space-y-6 rounded-2xl border border-[#dfeadf] bg-white p-5 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="product-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Product name
                </label>
                <input
                  name="product-name"
                  id="product-name"
                  type="text"
                  required
                  placeholder="e.g. Premium rice seed"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  required
                  placeholder="Describe the product, benefits, and usage guidance..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label
                  htmlFor="product-category"
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  htmlFor="sku"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  SKU
                </label>
                <input
                  name="sku"
                  id="sku"
                  required
                  type="text"
                  placeholder="AG-1024"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label
                  htmlFor="qty"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Quantity
                </label>
                <input
                  name="quantity"
                  id="qty"
                  type="number"
                  required
                  // defaultValue={120}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>
                <ProductStatusSelect
                  statuses={statuses}
                  value={status}
                  onValueChange={setStatus}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Price (৳)
                </label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  required
                  // defaultValue={480}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label
                  htmlFor="sale-price"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Sale price (৳)
                </label>
                <input
                  name="sale-price"
                  id="sale-price"
                  required
                  type="number"
                  // defaultValue={420}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label
                  htmlFor="discount"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Discount (%)
                </label>
                <input
                  name="discount"
                  id="discount"
                  type="number"
                  required
                  // defaultValue={12}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>
              <div>
                <label
                  htmlFor="unit"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Unit
                </label>
                <ProductUnitSelect
                  units={productUnits}
                  value={unit}
                  onValueChange={setUnit}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Tags
              </label>
              <input
                name="tags"
                id="tags"
                type="text"
                placeholder="organic, high-yield, irrigation"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-[#dfeadf] bg-white p-5 shadow-sm">
            <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1f7a1f] shadow-sm">
                <ImagePlus size={20} />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-700">
                Upload product image
              </p>
              <p className="mt-1 text-xs text-slate-500">
                PNG, JPG, WEBP up to 10MB
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1f7a1f] px-3 py-2 text-xs font-semibold text-white"
              >
                <Plus size={14} />
                Add Photo
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles size={16} className="text-[#f59e0b]" />
                Quick tips
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  • Use clear product names for easier search and filtering.
                </li>
                <li>
                  • Add realistic pricing and stock numbers to improve vendor
                  accuracy.
                </li>
                <li>• Include seasonal tags to support discovery by buyers.</li>
              </ul>
            </div>
          </aside>
        </section>
      </form>
    </main>
  );
}
