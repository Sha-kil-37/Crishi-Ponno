"use client";
//
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useMemo } from "react";
import { useGetAllProductQuery } from "@/store/services/productApi";
import Product from "./Product";


//

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};



function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
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



export default function Products() {
  //
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
  // console.log(productList);
  return (
    <main className="mx-auto w-7xl">
      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && isError && (
        <div>
          <Package className="mx-auto h-10 w-10 text-red-400" />
          <h3>Unable to load products</h3>
          <p>Something went wrong while loading the products.</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-5 rounded-full bg-[#F5F5F5]"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && productList.length === 0 && (
        <div>
          <Package />
          <h3>No products available</h3>
          <p>
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
          className="grid grid-cols-4 gap-4"
        >
          {productList.map((product, i) => {
            return <Product key={product._id} product={product} />;
          })}
        </motion.div>
      )}
    </main>
  );
}
