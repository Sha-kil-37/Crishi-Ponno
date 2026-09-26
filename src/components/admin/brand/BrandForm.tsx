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
import { brandSchema } from "@/schemas/brand.schema";
import { useAddBrandMutation } from "@/redux/rtkQuery/admin/brand/brandApi";

//
export default function BrandForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft">("Published");
  const [isSaved, setIsSaved] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "description" | "status" | "image", string>>
  >({});
  const [addBrand, { isLoading }] = useAddBrandMutation();
  //

  const brandInitial = useMemo(
    () => name.trim().slice(0, 1).toUpperCase() || "C",
    [name],
  );
  //  handle brand name
  const handleBrandName = (value: string) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: undefined }));
  };
  // handle brand description
  const handleBrandDescription = (value: string) => {
    if (value.length <= 160) {
      setDescription(value);
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  // handle brand status
  const handleBrandStatus = (value: string) => {
    if (value === "Published" || value === "Draft") {
      setStatus(value);
      setErrors((prev) => ({ ...prev, status: undefined }));
    }
  };
  //  handle image input
  const handleBrandImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const result = brandSchema.shape.image.safeParse(file);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        image: result.error.issues[0]?.message,
      }));
      //
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
    try {
      event.preventDefault();
      const brand = brandSchema.safeParse({
        name: name.trim(),
        description: description.trim(),
        parent: parent || undefined,
        status: status,
        image: image,
      });
      if (!brand.success) {
        const fieldErrors = brand.error.flatten().fieldErrors;
        setErrors({
          name: fieldErrors.name?.[0],
          description: fieldErrors.description?.[0],
          status: fieldErrors.status?.[0],
          image: fieldErrors.image?.[0],
        });
        return;
      }
      //

      const formData = new FormData();
      formData.append("name", brand.data.name);
      formData.append("description", brand.data.description);
      formData.append("status", brand.data.status);
      formData.append("image", brand.data.image);
      try {
        await addBrand(formData).unwrap();
        setName("");
        setDescription("");
        setStatus("Published");
        setImage(null);
        setErrors({});
        setIsSaved(true);
        setTimeout(() => {
          setIsSaved(false);
        }, 3000);
      } catch (error) {
        const result = error as {
          data?: { error?: string | Record<string, string[]> };
        };
        const fieldError = result.data?.error;
        const message =
          typeof fieldError === "string"
            ? fieldError
            : fieldError?.name?.[0] || "Unable to create brand.";

        setErrors({ name: message });
      }
    } catch (error) {
      console.error("Error submitting brand form:", error);
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
            href="/admin/brands"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1f7a1f] hover:text-[#145a14]"
          >
            <ArrowLeft size={16} />
            Back to brands
          </Link>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Create a brand
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Give products a clear and discoverable place in your shop.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setName("");
              setDescription("");
              setStatus("Published");
              setImage(null);
              setErrors({});
            }}
            className="rounded-xl cursor-pointer border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="brand-form"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1f7a1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#145a14] cursor-pointer"
          >
            <Save size={16} />
            {isLoading ? "Saving..." : "Save Brand"}
          </button>
        </div>
      </div>

      {isSaved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 mt-5">
          <Check size={17} />
          Brand details are ready to be connected to your API.
        </div>
      )}

      <form
        id="brand-form"
        name="brand-form"
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr] mt-10"
      >
        <section className="space-y-6 rounded-2xl border border-[#dfeadf] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#1f7a1f]">
              <Layers3 size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Brand details</h2>
              <p className="text-sm text-slate-500">
                Set the basics for this product group.
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="brand-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Brand name
              </label>
              <input
                required
                name="brand-name"
                id="brand-name"
                value={name}
                onChange={(event) => handleBrandName(event.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "brand-name-error" : undefined}
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-2 focus:ring-emerald-100"
                }`}
              />

              {errors.name && (
                <p
                  id="brand-name-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="brand-description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="brand-description"
                name="brand-description"
                value={description}
                onChange={(event) => handleBrandDescription(event.target.value)}
                rows={5}
                required
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "brand-description-error" : undefined
                }
                placeholder="Tell customers what they will find in this brand..."
                className={`w-full resize-none rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-100 ${
                  errors.description
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              />
              {errors.description && (
                <p
                  id="brand-description-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.description}
                </p>
              )}
              <p className="mt-1.5 text-right text-xs text-slate-400">
                {description.length}/160
              </p>
            </div>
            <div>
              <label
                htmlFor="brand-status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Visibility
              </label>
              <select
                required
                name="brand-status"
                id="brand-status"
                value={status}
                onChange={(event) => handleBrandStatus(event.target.value)}
                aria-invalid={!!errors.status}
                aria-describedby={
                  errors.status ? "brand-status-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:bg-white focus:ring-2 cursor-pointer ${
                  errors.status
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              >
                <option>Published</option>
                <option>Draft</option>
              </select>
              {errors.status && (
                <p
                  id="brand-status-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.status}
                </p>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-[#dfeadf] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Brand image</h2>
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
                htmlFor="brand-image"
                className="flex flex-col items-center justify-center"
              />
              <input
                onChange={handleBrandImage}
                type="file"
                id="brand-image"
                name="brand-image"
                accept="image/png, image/jpeg, image/webp"
                className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#1f7a1f] shadow-sm">
                <ImagePlus size={20} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Add a brand image
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
                  {brandInitial}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">
                    {name || "Your brand name"}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {description || "A short description for customers"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Sprout size={15} className="text-[#1f7a1f]" />
                <p>Visible in your storefront</p>
                <span className="ml-auto rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                  {status}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </form>
    </main>
  );
}
