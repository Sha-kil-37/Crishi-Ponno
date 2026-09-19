"use client";
//
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  ShoppingCart,
  Star,
  Leaf,
  Eye,
  Package,
} from "lucide-react";
import { useMemo } from "react";
import { useGetAllProductQuery } from "@/store/services/productApi";
//
const FALLBACK_IMAGE = "/meta/logo.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white">
      <div className="aspect-square animate-pulse bg-gray-100" />

      <div className="space-y-3 p-4">
        <div className="h-3 w-20 animate-pulse rounded-full bg-gray-100" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-gray-100" />
        <div className="h-3 w-full animate-pulse rounded-full bg-gray-100" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-gray-100" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

// function ProductCard({ product }) {
//   const [imageSrc, setImageSrc] = useState(
//     product?.images?.[0]?.url ||
//       product?.images?.[0] ||
//       product?.image ||
//       FALLBACK_IMAGE,
//   );

//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const productId = product?._id || product?.id;

//   const productSlug = product?.slug || productId;

//   const categoryName =
//     typeof product?.category === "object"
//       ? product?.category?.name
//       : product?.category;

//   const brandName =
//     typeof product?.brand === "object" ? product?.brand?.name : product?.brand;

//   const price = Number(product?.price || 0);

//   const comparePrice = Number(
//     product?.comparePrice || product?.oldPrice || product?.regularPrice || 0,
//   );

//   const discount =
//     comparePrice > price
//       ? Math.round(((comparePrice - price) / comparePrice) * 100)
//       : 0;

//   const rating = Number(product?.rating || product?.averageRating || 0);

//   const stockStatus = product?.status || "In Stock";

//   const isOutOfStock =
//     stockStatus === "Out of Stock" || stockStatus === "Discontinued";

//   const isLowStock = stockStatus === "Low Stock";

//   const handleImageError = () => {
//     setImageSrc(FALLBACK_IMAGE);
//   };

//   return (
//     <motion.article variants={itemVariants} className="group relative">
//       <div className="relative overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]">
//         {/* Image */}
//         <Link
//           href={`/products/${productSlug}`}
//           className="relative block aspect-[1/1.02] overflow-hidden bg-[#f5f8f2]"
//         >
//           <Image
//             src={imageSrc}
//             alt={product?.name || "Agricultural product"}
//             fill
//             sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//             className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//             onError={handleImageError}
//           />

//           {/* Image gradient */}
//           <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//           {/* Discount */}
//           {discount > 0 && (
//             <div className="absolute left-4 top-4 rounded-full bg-[#1f7a1f] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
//               -{discount}%
//             </div>
//           )}

//           {/* Wishlist */}
//           <button
//             type="button"
//             aria-label={
//               isWishlisted ? "Remove from wishlist" : "Add to wishlist"
//             }
//             onClick={(event) => {
//               event.preventDefault();
//               event.stopPropagation();
//               setIsWishlisted((value) => !value);
//             }}
//             className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
//               isWishlisted
//                 ? "border-red-100 bg-red-50 text-red-500"
//                 : "border-white/70 bg-white/85 text-gray-700 hover:bg-white hover:text-[#1f7a1f]"
//             }`}
//           >
//             <Heart
//               className="h-[17px] w-[17px]"
//               fill={isWishlisted ? "currentColor" : "none"}
//             />
//           </button>

//           {/* Quick actions */}
//           <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//             <Link
//               href={`/products/${productSlug}`}
//               onClick={(event) => event.stopPropagation()}
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-lg backdrop-blur transition-colors hover:text-[#1f7a1f]"
//               aria-label="View product"
//             >
//               <Eye className="h-4 w-4" />
//             </Link>

//             {!isOutOfStock && (
//               <button
//                 type="button"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   event.stopPropagation();

//                   // Connect your Redux cart action here.
//                   console.log("Add to cart:", product);
//                 }}
//                 className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f7a1f] text-white shadow-lg transition-all hover:bg-[#176117]"
//                 aria-label="Add to cart"
//               >
//                 <ShoppingCart className="h-4 w-4" />
//               </button>
//             )}
//           </div>
//         </Link>

//         {/* Product information */}
//         <div className="p-4 sm:p-5">
//           {/* Category / Brand */}
//           <div className="mb-2 flex items-center gap-2">
//             <Leaf className="h-3.5 w-3.5 text-[#1f7a1f]" />

//             <span className="line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1f7a1f]">
//               {categoryName || brandName || "Agriculture"}
//             </span>
//           </div>

//           {/* Product name */}
//           <Link href={`/products/${productSlug}`}>
//             <h3 className="line-clamp-2 min-h-[48px] text-[16px] font-semibold leading-6 tracking-[-0.02em] text-gray-900 transition-colors hover:text-[#1f7a1f] sm:text-[17px]">
//               {product?.name || "Unnamed Product"}
//             </h3>
//           </Link>

//           {/* Description */}
//           {product?.shortDescription && (
//             <p className="mt-1 line-clamp-1 text-xs leading-5 text-gray-500">
//               {product.shortDescription}
//             </p>
//           )}

//           {/* Rating */}
//           <div className="mt-3 flex items-center gap-2">
//             <div className="flex items-center gap-0.5">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`h-3.5 w-3.5 ${
//                     star <= Math.round(rating)
//                       ? "fill-yellow-400 text-yellow-400"
//                       : "text-gray-200"
//                   }`}
//                 />
//               ))}
//             </div>

//             {rating > 0 && (
//               <span className="text-xs font-medium text-gray-500">
//                 {rating.toFixed(1)}
//               </span>
//             )}
//           </div>

//           {/* Bottom row */}
//           <div className="mt-4 flex items-end justify-between gap-3">
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="text-xl font-bold tracking-tight text-gray-950">
//                   ৳{price.toLocaleString("en-BD")}
//                 </span>

//                 {comparePrice > price && (
//                   <span className="text-xs text-gray-400 line-through">
//                     ৳{comparePrice.toLocaleString("en-BD")}
//                   </span>
//                 )}
//               </div>

//               {/* Stock */}
//               <div className="mt-1.5 flex items-center gap-1.5">
//                 <span
//                   className={`h-1.5 w-1.5 rounded-full ${
//                     isOutOfStock
//                       ? "bg-red-500"
//                       : isLowStock
//                         ? "bg-orange-500"
//                         : "bg-[#1f7a1f]"
//                   }`}
//                 />

//                 <span
//                   className={`text-[11px] font-medium ${
//                     isOutOfStock
//                       ? "text-red-500"
//                       : isLowStock
//                         ? "text-orange-500"
//                         : "text-gray-500"
//                   }`}
//                 >
//                   {stockStatus}
//                 </span>
//               </div>
//             </div>

//             {/* Mobile-friendly cart button */}
//             {!isOutOfStock && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   // Connect your Redux cart action here.
//                   console.log("Add to cart:", product);
//                 }}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef7e9] text-[#1f7a1f] transition-all duration-300 hover:bg-[#1f7a1f] hover:text-white"
//                 aria-label={`Add ${product?.name || "product"} to cart`}
//               >
//                 <ShoppingCart className="h-[17px] w-[17px]" />
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// }

export default function Products() {
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useGetAllProductQuery();

  const productList = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products],
  );

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header */}

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center">
            <Package className="mx-auto h-10 w-10 text-red-400" />

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Unable to load products
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Something went wrong while loading the products.
            </p>

            <button
              type="button"
              onClick={refetch}
              className="mt-5 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f7a1f]"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && productList.length === 0 && (
          <div className="rounded-3xl border border-gray-100 bg-gray-50 px-6 py-16 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300" />

            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              No products available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              There are currently no products to display. Please check again
              later.
            </p>
          </div>
        )}

        {/* Products */}
        {!isLoading && !isError && productList.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.05,
            }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
          >
            {productList.map((product, i) => (
              <p key={i}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis, cum?
              </p>
              // console.log(product)
              // <ProductCard
              //   key={product?._id || product?.id}
              //   product={product}
              // />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
