"use client";
import BannerSlider from "./admin/BannerSlider";
import CategorysBanner from "./CategorysBanner";
import BannerCollageImage from "./BannerCollageImage";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
//
export default function Banner() {
  //
  return (
    <div>
      <BannerSlider />
      <CategorysBanner />

      <div className="flex justify-between p-8 bg-[#F5F5F5] w-7xl mx-auto rounded-xl my-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Make shopping easier.
          </h2>
          <p className="mt-1">
            Enjoy the benefits of reliability, safe delivery, and hassle-free
            returns.
          </p>
        </div>
        <div>
          <Link
            href=""
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f7a3a] transition hover:bg-lime-100"
          >
            start now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <BannerCollageImage />
    </div>
  );
}
