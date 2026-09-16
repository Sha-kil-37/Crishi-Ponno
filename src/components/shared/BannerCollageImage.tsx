"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useGetAllCategoryQuery } from "@/store/services/categoryApi";
import { useGetAllBrandQuery } from "@/store/services/brandApi";
import { useGetAllProductQuery } from "@/store/services/productApi";
import { useMemo } from "react";
//

export default function BannerCollageImage() {
  //
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
  //
  const {
    data: products,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isError: isProductsError,
  } = useGetAllProductQuery();
  //

  const collageImages = useMemo(() => {
    const images = [
      // Category images
      ...(categories ?? []).map((category) => ({
        src: category.image?.url,
        alt: category.name,
        type: "category" as const,
      })),

      // Product images
      ...(products ?? []).map((product) => ({
        src: product.image?.url,
        alt: product.name,
        type: "product" as const,
      })),

      // Brand images
      ...(brands ?? []).map((brand) => ({
        src: typeof brand.image === "string" ? brand.image : brand.image?.url,
        alt: brand.name,
        type: "brand" as const,
      })),
    ];
    //
    return images
      .filter((item): item is typeof item & { src: string } =>
        Boolean(item.src),
      )
      .slice(0, 6)
      .map((item, index) => ({
        ...item,
        className: [
          "left-[0%] top-[16%] h-[260px] w-[145px]",
          "left-[25%] top-[-10%] h-[240px] w-[145px]",
          "left-[51%] top-[15%] h-[270px] w-[155px]",
          "left-[25%] bottom-[-5%] h-[170px] w-[145px]",
          "right-[3%] bottom-[-15px] h-[180px] w-[125px]",
          "right-[3%] top-[-15px] h-[180px] w-[125px]",
        ][index],
      }));
  }, [categories, products, brands]);
  //
  return (
    <main className="relative overflow-hidden rounded-2xl bg-[#165823] my-10 w-7xl mx-auto">
      <div className="grid min-h-[380px] grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-8">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-white/80">
            <Leaf className="h-4 w-4" />
            <span>Fresh • Natural • Trusted</span>
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Fresh from the Farm.
            <br />
            <span className="text-lime-200">Naturally to You.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            Discover fresh vegetables, fruits, plants and agricultural products
            from trusted local sources.
          </p>

          <div className="mt-7">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f7a3a] transition hover:bg-lime-100"
            >
              Find Products
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Image collage */}
        <div className="relative min-h-[350px] overflow-hidden lg:min-h-[380px]">
          {/* Background decoration */}
          <div className="absolute right-[-100px] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

          {collageImages.map((image, index) => (
            <motion.div
              key={`${image.type}-${image.src}-${index}`}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className={`absolute overflow-hidden rounded-xl  ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 30vw, 160px"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
