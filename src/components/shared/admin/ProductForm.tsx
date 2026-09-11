//
"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ImagePlus,
  Layers3,
  Save,
  Sprout,
} from "lucide-react";
import { productSchema } from "@/schemas/product.schema";
import { useGetAllBrandQuery } from "@/store/services/brandApi";
import { useGetAllCategoryQuery } from "@/store/services/categoryApi";

//

//
export default function ProductForm() {
  const {
    data: brands,
    isLoading: isBrandsLoading,
    isFetching: isBrandsFetching,
    isError: isBrandsError,
  } = useGetAllBrandQuery();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isFetching: isCategoriesFetching,
    isError: isCategoriesError,
  } = useGetAllCategoryQuery();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<
    "Out of Stock" | "In Stock" | "Low Stock" | "Pre Order" | "Discontinued"
  >();
  const [isSaved, setIsSaved] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<
    Partial<
      Record<
        | "name"
        | "description"
        | "shortDescription"
        | "price"
        | "status"
        | "brand"
        | "category"
        | "image",
        string
      >
    >
  >({});

  //
  // productInitial
  const productInitial = useMemo(
    () => name.trim().slice(0, 1).toUpperCase() || "C",
    [name],
  );
  //  handle product name
  const handleProductName = (value: string) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: undefined }));
  };
  // handle product description
  const handleProductDescription = (value: string) => {
    if (value.length <= 500) {
      setDescription(value);
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };
  // handle product short description
  const handleShortDescription = (value: string) => {
    if (value.length <= 100) {
      setShortDescription(value);
      setErrors((prev) => ({ ...prev, shortDescription: undefined }));
    }
  };
  // handle product price
  const handlePrice = (value: string) => {
    const priceValue = parseFloat(value);
    if (!isNaN(priceValue) && priceValue >= 0 && priceValue <= 1000000) {
      setPrice(priceValue);
      setErrors((prev) => ({ ...prev, price: undefined }));
    }
  };
  // handle product brand
  const handleProductBrand = (value: string) => {
    setBrand(value);
    setErrors((prev) => ({ ...prev, brand: undefined }));
  };
  // handle product category
  const handleProductCategory = (value: string) => {
    setCategory(value);
    setErrors((prev) => ({ ...prev, category: undefined }));
  };
  // handle product status
  const handleProductStatus = (value: string) => {
    if (
      value === "Out of Stock" ||
      value === "In Stock" ||
      value === "Low Stock" ||
      value === "Pre Order" ||
      value === "Discontinued"
    ) {
      setStatus(value);
      setErrors((prev) => ({ ...prev, status: undefined }));
    }
  };
  //  handle image input
  const handleProductImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const result = productSchema.shape.image.safeParse(file);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        image: result.error.issues[0]?.message,
      }));

      setImage(null);
      return;
    }

    setErrors((prev) => ({
      ...prev,
      image: undefined,
    }));

    setImage(file);
  };
  //  handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      name,
      description,
      shortDescription,
      price,
      status,
      image,
      brand,
      category,
    );
    try {
      event.preventDefault();
      const product = productSchema.safeParse({
        name: name.trim(),
        description: description.trim(),
        shortDescription: shortDescription.trim(),
        price: price,
        category: category,
        brand: brand,
        status: status,
        image: image,
      });
      console.log(product);
      // if (!product.success) {
      //   const fieldErrors = product.error.flatten().fieldErrors;
      //   setErrors({
      //     name: fieldErrors.name?.[0],
      //     description: fieldErrors.description?.[0],
      //     shortDescription: fieldErrors.shortDescription?.[0],
      //     price: fieldErrors.price?.[0],
      //     status: fieldErrors.status?.[0],
      //     image: fieldErrors.image?.[0],
      //   });
      //   return;
      // }
      // //

      // const formData = new FormData();
      // formData.append("name", product.data.name);
      // formData.append("description", product.data.description);
      // formData.append("status", product.data.status);
      // formData.append("image", product.data.image);
      // try {
      //   // await addCategory(formData).unwrap();
      //   setName("");
      //   setDescription("");
      //   setShortDescription("");
      //   setPrice(0);
      //   setStatus("In Stock");
      //   setImage(null);
      //   setErrors({});
      //   setIsSaved(true);
      //   setTimeout(() => {
      //     setIsSaved(false);
      //   }, 3000);
      // } catch (error) {
      //   const result = error as {
      //     data?: { error?: string | Record<string, string[]> };
      //   };
      //   const fieldError = result.data?.error;
      //   const message =
      //     typeof fieldError === "string"
      //       ? fieldError
      //       : fieldError?.name?.[0] || "Unable to create product.";

      //   setErrors({ name: message });
      // }
    } catch (error) {
      console.error("Error submitting product form:", error);
      setErrors({
        name: "An error occurred while submitting the form.",
      });
    }
  };
  //

  return (
    <main className="px-10 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/products"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1f7a1f] hover:text-[#145a14]"
          >
            <ArrowLeft size={16} />
            Back to product
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Create a product
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a new product to your store and set its details, images, and
            visibility.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setName("");
              setDescription("");
              setShortDescription("");
              setPrice(0);
              setStatus("In Stock");
              setImage(null);
              setErrors({});
            }}
            className="rounded-xl cursor-pointer border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1f7a1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#145a14] cursor-pointer"
          >
            <Save size={16} />
            Save Product
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 mt-5">
          <Check size={17} />
          Category details are ready to be connected to your API.
        </div>
      )}
      <form
        id="product-form"
        name="product-form"
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr] mt-10"
      >
        <section className="space-y-6 rounded-2xl border border-[#dfeadf] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#1f7a1f]">
              <Layers3 size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Product details</h2>
              <p className="text-sm text-slate-500">
                Set the product name, description, and visibility.
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="product-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Product name
              </label>
              <input
                required
                name="product-name"
                id="product-name"
                value={name}
                onChange={(event) => handleProductName(event.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "product-name-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-2 focus:ring-emerald-100"
                }`}
              />

              {errors.name && (
                <p
                  id="product-name-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-price"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Product price
              </label>
              <input
                type="number"
                required
                name="product-price"
                id="product-price"
                value={price}
                onChange={(event) => handlePrice(event.target.value)}
                aria-invalid={!!errors.price}
                aria-describedby={
                  errors.price ? "product-price-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm outline-none ${
                  errors.price
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-2 focus:ring-emerald-100"
                }`}
              />

              {errors.price && (
                <p
                  id="product-price-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.price}
                </p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="product-short-description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Short description
              </label>
              <textarea
                id="product-short-description"
                name="product-short-description"
                value={shortDescription}
                onChange={(event) => handleShortDescription(event.target.value)}
                rows={5}
                required
                aria-invalid={!!errors.shortDescription}
                aria-describedby={
                  errors.shortDescription
                    ? "product-short-description-error"
                    : undefined
                }
                placeholder="Tell customers what they will find in this product..."
                className={`w-full resize-none rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-100 ${
                  errors.shortDescription
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              />
              {errors.shortDescription && (
                <p
                  id="product-short-description-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.shortDescription}
                </p>
              )}
              <p className="mt-1.5 text-right text-xs text-slate-400">
                {shortDescription.length}/100
              </p>
            </div>
            <div className="">
              <label
                htmlFor="product-description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="product-description"
                name="product-description"
                value={description}
                onChange={(event) =>
                  handleProductDescription(event.target.value)
                }
                rows={5}
                required
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "product-description-error" : undefined
                }
                placeholder="Tell customers what they will find in this product..."
                className={`w-full resize-none rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-100 ${
                  errors.description
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              />
              {errors.description && (
                <p
                  id="product-description-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.description}
                </p>
              )}
              <p className="mt-1.5 text-right text-xs text-slate-400">
                {description.length}/500
              </p>
            </div>
            <div>
              <label
                htmlFor="product-status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Status
              </label>
              <select
                required
                name="product-status"
                id="product-status"
                value={status}
                onChange={(event) => handleProductStatus(event.target.value)}
                aria-invalid={!!errors.status}
                aria-describedby={
                  errors.status ? "product-status-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 cursor-pointer ${
                  errors.status
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              >
                <option>select a status</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
                <option>Low Stock</option>
                <option>Pre Order</option>
                <option>Discontinued</option>
              </select>
              {errors.status && (
                <p
                  id="product-status-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.status}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Brand
              </label>
              <select
                required
                name="product-brand"
                id="product-brand"
                value={brand}
                onChange={(event) => handleProductBrand(event.target.value)}
                aria-invalid={!!errors.brand}
                aria-describedby={
                  errors.brand ? "product-brand-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 cursor-pointer ${
                  errors.brand
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              >
                <option>select a brand</option>
                {brands?.map((brand) => {
                  return (
                    <option value={brand._id} key={brand._id}>
                      {brand.name}
                    </option>
                  );
                })}
              </select>
              {errors.brand && (
                <p
                  id="product-brand-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.brand}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category
              </label>
              <select
                required
                name="product-category"
                id="product-category"
                value={category}
                onChange={(event) => handleProductCategory(event.target.value)}
                aria-invalid={!!errors.category}
                aria-describedby={
                  errors.category ? "product-category-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 cursor-pointer ${
                  errors.category
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              >
                <option>select a category</option>
                {categories?.map((category) => {
                  return (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              {errors.category && (
                <p
                  id="product-category-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.category}
                </p>
              )}
            </div>
          </div>
        </section>
        {/* right side */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-[#dfeadf] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Category image</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Shown in your shop navigation.
                </p>
              </div>
              <ImagePlus size={20} className="text-[#1f7a1f]" />
            </div>

            <button
              type="button"
              className="mt-5 flex min-h-40 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50/60 px-4 text-center transition hover:border-[#1f7a1f] hover:bg-emerald-50 cursor-pointer relative"
            >
              <label
                htmlFor="product-image"
                className="flex flex-col items-center justify-center"
              />
              <input
                onChange={handleProductImage}
                type="file"
                id="product-image"
                name="product-image"
                accept="image/png, image/jpeg, image/webp"
                className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#1f7a1f] shadow-sm">
                <ImagePlus size={20} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Add a product image
              </p>
              <p className="mt-1 text-xs text-slate-500">
                PNG, JPG or WEBP up to 2MB
              </p>
            </button>
            {errors.image && (
              <p className="mt-2 text-xs font-medium text-red-600">
                {errors.image}
              </p>
            )}
          </section>
          <section className="overflow-hidden rounded-2xl border border-[#dfeadf] bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f7a1f]">
                Storefront preview
              </p>
              <h2 className="mt-1 font-bold text-slate-900">
                How it will appear
              </h2>
            </div>
            <div className="bg-[#f6fbf4] p-5">
              <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-lg font-bold text-lime-800">
                  {productInitial}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">
                    {name || "Your product name"}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {description || "A short description for customers"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Sprout size={15} className="text-[#1f7a1f]" />
                <p className="truncate">
                  {shortDescription || "A short description for customers"}
                </p>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    status === "In Stock"
                      ? "bg-emerald-100 text-emerald-700"
                      : status === "Low Stock"
                        ? "bg-amber-100 text-amber-700"
                        : status === "Out of Stock"
                          ? "bg-rose-100 text-rose-700"
                          : status === "Pre Order"
                            ? " text-black"
                            : status === "Discontinued"
                              ? "bg-gray-300 text-black"
                              : ""
                  }`}
                >
                  {status}
                </span>
                <span>{category}</span>
                <span>{brand}</span>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </main>
  );
}
