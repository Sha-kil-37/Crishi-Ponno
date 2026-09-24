"use client";
//
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useGetAllProductQuery } from "@/redux/rtkQuery/shop/product/productApi";
import { useState } from "react";
import Product from "./Product";

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

function Products() {
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const {
    data: productResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllProductQuery({
    search: productSearchQuery,
    page: pageNumber,
    limit: productLimit,
  });

  const products = productResponse?.data ?? [];
  const pagination = productResponse?.pagination;

  return (
    <main className="mx-auto mt-5 w-7xl">
      <form
        className="mb-8 grid max-w-5xl gap-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="productSearchQuery">Search Query</label>
        <input
          name="productSearchQuery"
          id="productSearchQuery"
          value={productSearchQuery}
          onChange={(event) => {
            setProductSearchQuery(event.target.value);
            setPageNumber(1);
          }}
          type="text"
          placeholder="search product"
        />
        <label htmlFor="productLimit">Product limit</label>
        <input
          type="number"
          id="productLimit"
          name="productLimit"
          min={1}
          max={100}
          value={productLimit}
          onChange={(event) => {
            const nextLimit = Number(event.target.value);
            if (Number.isFinite(nextLimit) && nextLimit > 0) {
              setProductLimit(Math.min(nextLimit, 100));
              setPageNumber(1);
            }
          }}
        />
      </form>

      {isLoading && (
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: productLimit }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="py-12 text-center">
          <Package className="mx-auto h-10 w-10 text-red-400" />
          <h3>Unable to load products</h3>
          <p>Something went wrong while loading the products.</p>
          <button
            type="button"
            onClick={refetch}
            className="mt-5 rounded-full bg-[#F5F5F5] px-4 py-2"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="py-12 text-center">
          <Package className="mx-auto h-10 w-10" />
          <h3>No products available</h3>
          <p>There are currently no products to display.</p>
        </div>
      )}

      {!isLoading && !isError && products.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-4 gap-4"
        >
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </motion.div>
      )}

      {isFetching && !isLoading && (
        <p className="mt-4 text-center">Loading products...</p>
      )}

      {pagination && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPageNumber((page) => page - 1)}
            disabled={!pagination.hasPreviousPage || isFetching}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((page) => page + 1)}
            disabled={!pagination.hasNextPage || isFetching}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default Products;
