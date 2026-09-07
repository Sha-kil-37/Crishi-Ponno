//
"use client";
//
import Link from "next/link";
import type { Brand } from "@/types/brand/brand";
import { ChevronRight, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
//
export default function Brand({ brand }: { brand: Brand }) {
  const brandImage = brand.image?.url || "/icons/google.svg";

  return (
    <article
      key={brand?.slug}
      className="group rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className={``}>
            {/* {brand.name.slice(0, 1)} */}
            <Image
              src={brandImage}
              alt={brand.name || "Brand image"}
              width={60}
              height={60}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-xl">
              {brand.name.charAt(0).toUpperCase() + brand.name.slice(1)}
            </h3>
            <p className="mt-1">{brand.description}</p>
          </div>
        </div>
        <button
          aria-label={`More options for ${brand.name}`}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-x-2">
          <p className="">Status :</p>
          <p
            className={`text-sm font-bold ${brand.status === "Draft" ? "text-amber-700" : "text-emerald-700"}`}
          >
            {brand.status}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-400">
          Last update : {new Date(brand.createdAt).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-1">
          <Link
            href="/admin/brands/update"
            aria-label={`Edit ${brand.name}`}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#1f7a1f]"
          >
            <PencilLine size={16} />
          </Link>
          <Link
            href="/admin/brands/delete"
            aria-label={`Delete ${brand.name}`}
            className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={16} />
          </Link>
          <button
            aria-label={`View ${brand.name}`}
            className="rounded-lg p-2 text-[#1f7a1f] hover:bg-emerald-50"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
