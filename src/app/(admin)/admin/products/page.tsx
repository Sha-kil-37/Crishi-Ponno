"use client";
//

import SearchBar from "@/components/shared/admin/SearchBar";
import ProductCategorySelect, {
  ProductCategory,
} from "@/components/shared/admin/ProductCategorySelect";
import { useState } from "react";
import ProductBrandSelect, {
  ProductBrand,
} from "@/components/shared/admin/ProductBrandSelect";
import ProductStatusSelect, {
  ProductStatus,
} from "@/components/shared/admin/ProductStatusSelect";
import Link from "next/link";
// product brands
const brands: ProductBrand[] = [
  {
    _id: "1",
    name: "Brand A",
  },
  {
    _id: "2",
    name: "Brand B",
  },
];
// product categories
const categories: ProductCategory[] = [
  {
    _id: "1",
    name: "Seeds",
  },
  {
    _id: "2",
    name: "Fertilizers",
  },
  {
    _id: "3",
    name: "Pesticides",
  },
  {
    _id: "4",
    name: "Agricultural Tools",
  },
];
// product statuses
const statuses: ProductStatus[] = [
  {
    _id: "1",
    name: "In Stock",
  },
  {
    _id: "2",
    name: "Out of Stock",
  },
  {
    _id: "3",
    name: "Discontinued",
  },
];
//

export default function Page() {
  //
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  //
  console.log(category);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productData = {
      category,
    };

    console.log(productData);
  };

  //

  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Manage your agricultural products
        </h1>
        <Link
          href="/admin/products/create"
          className="px-3 py-2 bg-[#1f7a1f] text-white cursor-pointer font-bold"
        >
          Add Product
        </Link>
      </div>
      <div className="flex justify-between items-center mt-5">
        <SearchBar />
        <form onSubmit={handleSubmit} className="w-full flex gap-x-4">
          <div>
            <label htmlFor="product-category" className="text-sm font-medium">
              Category
            </label>
            <ProductCategorySelect
              categories={categories}
              value={category}
              onValueChange={setCategory}
            />
          </div>
          <div>
            <label htmlFor="product-brand" className="text-sm font-medium">
              Brand
            </label>
            <ProductBrandSelect
              brands={brands}
              value={brand}
              onValueChange={setBrand}
            />
          </div>
          <div>
            <label htmlFor="product-status" className="text-sm font-medium">
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
    </main>
  );
}
