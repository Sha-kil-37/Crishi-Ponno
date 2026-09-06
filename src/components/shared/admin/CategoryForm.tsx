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
import { categorySchema } from "@/schemas/category.schema";
import {
  useAddCategoryMutation,
  useGetAllCategoryQuery,
} from "@/store/services/categoryApi";
//

//
export default function CategoryForm() {
  const { data } = useGetAllCategoryQuery();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parent, setParent] = useState("Top-level category");
  const [status, setStatus] = useState<"Published" | "Draft">("Published");
  const [isSaved, setIsSaved] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<
    Partial<
      Record<"name" | "description" | "parent" | "status" | "image", string>
    >
  >({});
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  //

  const categoryInitial = useMemo(
    () => name.trim().slice(0, 1).toUpperCase() || "C",
    [name],
  );
  //  handle category name
  const handleCategoryName = (value: string) => {
    setName(value);
    setErrors((prev) => ({ ...prev, name: undefined }));
  };
  // handle category description
  const handleCategoryDescription = (value: string) => {
    if (value.length <= 160) {
      setDescription(value);
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };
  // handle parent category
  const handleParentCategory = (value: string) => {
    setParent(value);
  };
  // handle category status
  const handleCategoryStatus = (value: string) => {
    if (value === "Published" || value === "Draft") {
      setStatus(value);
      setErrors((prev) => ({ ...prev, status: undefined }));
    }
  };
  //  handle image input
  const handleCategoryImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const result = categorySchema.shape.image.safeParse(file);

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
    try {
      event.preventDefault();
      const category = categorySchema.safeParse({
        name: name.trim(),
        description: description.trim(),
        parent: parent || undefined,
        status: status,
        image: image,
      });
      if (!category.success) {
        const fieldErrors = category.error.flatten().fieldErrors;
        setErrors({
          name: fieldErrors.name?.[0],
          description: fieldErrors.description?.[0],
          parent: fieldErrors.parent?.[0],
          status: fieldErrors.status?.[0],
          image: fieldErrors.image?.[0],
        });
        return;
      }
      //

      const formData = new FormData();
      formData.append("name", category.data.name);
      formData.append("description", category.data.description);
      formData.append("parent", category.data.parent ?? "");
      formData.append("status", category.data.status);
      formData.append("image", category.data.image);
      try {
        await addCategory(formData).unwrap();
        setName("");
        setDescription("");
        setParent("top-level category");
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
            : fieldError?.name?.[0] || "Unable to create category.";

        setErrors({ name: message });
      }
    } catch (error) {
      console.error("Error submitting category form:", error);
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
            href="/admin/categories"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1f7a1f] hover:text-[#145a14]"
          >
            <ArrowLeft size={16} />
            Back to categories
          </Link>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Create a category
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
              setParent("top-level category");
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
            form="category-form"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1f7a1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#145a14] cursor-pointer"
          >
            <Save size={16} />
            {isLoading ? "Saving..." : "Save Category"}
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
        id="category-form"
        name="category-form"
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr] mt-10"
      >
        <section className="space-y-6 rounded-2xl border border-[#dfeadf] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-[#1f7a1f]">
              <Layers3 size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Category details</h2>
              <p className="text-sm text-slate-500">
                Set the basics for this product group.
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="category-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Category name
              </label>
              <input
                required
                name="category-name"
                id="category-name"
                value={name}
                onChange={(event) => handleCategoryName(event.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "category-name-error" : undefined
                }
                className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-2 focus:ring-emerald-100"
                }`}
              />

              {errors.name && (
                <p
                  id="category-name-error"
                  className="mt-1.5 text-xs font-medium text-red-600"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="parent-category"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Parent category{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <select
                name="parent-category"
                id="parent-category"
                value={parent}
                onChange={(event) => handleParentCategory(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none focus:border-[#1f7a1f] focus:bg-white focus:ring-2 focus:ring-emerald-100 cursor-pointer"
              >
                <option value="">Top-level category</option>
                {data?.map((category, i) => (
                  <option key={i}>{category?.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="category-description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="category-description"
                name="category-description"
                value={description}
                onChange={(event) =>
                  handleCategoryDescription(event.target.value)
                }
                rows={5}
                required
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "category-description-error" : undefined
                }
                placeholder="Tell customers what they will find in this category..."
                className={`w-full resize-none rounded-xl border bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-100 ${
                  errors.description
                    ? "border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-[#1f7a1f] focus:ring-emerald-100"
                }`}
              />
              {errors.description && (
                <p
                  id="category-description-error"
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
                htmlFor="category-status"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Visibility
              </label>
              <select
                required
                name="category-status"
                id="category-status"
                value={status}
                onChange={(event) => handleCategoryStatus(event.target.value)}
                aria-invalid={!!errors.status}
                aria-describedby={
                  errors.status ? "category-status-error" : undefined
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
                  id="category-status-error"
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
                htmlFor="category-image"
                className="flex flex-col items-center justify-center"
              />
              <input
                onChange={handleCategoryImage}
                type="file"
                id="category-image"
                name="category-image"
                accept="image/png, image/jpeg, image/webp"
                className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-[#1f7a1f] shadow-sm">
                <ImagePlus size={20} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Add a category image
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
                  {categoryInitial}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">
                    {name || "Your category name"}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {description || "A short description for customers"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Sprout size={15} className="text-[#1f7a1f]" />
                {parent ? `Inside ${parent}` : "Top-level category"}
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
