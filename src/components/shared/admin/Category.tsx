//
"use client";
//
import Link from "next/link";
import type { Category } from "@/types/category/category";
import { ChevronRight, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
//
export default function Category({ category }: { category: Category }) {
  const categoryImage = category.image?.url || "/icons/google.svg";

  return (
    <article
      key={category?.slug}
      className="group rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* {category.name.slice(0, 1)} */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold`}
          >
            <Image
              src={categoryImage}
              alt={category.name || "Category image"}
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-bold text-slate-900">
              {category.name}
            </h3>
            <p className="mt-1 truncate text-sm text-slate-500">
              {category.description}
            </p>
          </div>
        </div>
        <button
          aria-label={`More options for ${category.name}`}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-400">Status</p>
          <p
            className={`mt-1 text-sm font-bold ${category.status === "Draft" ? "text-amber-700" : "text-emerald-700"}`}
          >
            {category.status}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-400">Updated :</p>
        <div className="flex items-center gap-1">
          <Link
            href="/admin/categories/update"
            aria-label={`Edit ${category.name}`}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#1f7a1f]"
          >
            <PencilLine size={16} />
          </Link>
          <Link
            href="/admin/categories/delete"
            aria-label={`Delete ${category.name}`}
            className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={16} />
          </Link>
          <button
            aria-label={`View ${category.name}`}
            className="rounded-lg p-2 text-[#1f7a1f] hover:bg-emerald-50"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
