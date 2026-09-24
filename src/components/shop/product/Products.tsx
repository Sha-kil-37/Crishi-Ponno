"use client";

import { useGetAllProductQuery } from "@/redux/rtkQuery/shop/product/productApi";
import { useState } from "react";

function Products() {
  // Keep the active filters and current server page in local state.
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [productLimit, setProductLimit] = useState(10);
  const {
    data: productResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetAllProductQuery({
    search: productSearchQuery,
    page: pageNumber,
    limit: productLimit,
  });

  // The API returns products and pagination metadata in one response object.
  const products = productResponse?.data ?? [];
  const pagination = productResponse?.pagination;

  return (
    <div className="mx-auto mt-5 w-5xl border-2 p-10">
      <form
        className="grid w-full gap-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="productSearchQuery">Search Query</label>
        <input
          name="productSearchQuery"
          id="productSearchQuery"
          value={productSearchQuery}
          onChange={(event) => {
            // A new search must start from the first page.
            setProductSearchQuery(event.target.value);
            setPageNumber(1);
          }}
          type="text"
          placeholder="search product"
        />
        <label htmlFor="productLimit">product limit</label>
        <input
          type="number"
          id="productLimit"
          name="productLimit"
          min={1}
          max={100}
          value={productLimit}
          placeholder="product limit"
          onChange={(event) => {
            const nextLimit = Number(event.target.value);
            if (Number.isFinite(nextLimit) && nextLimit > 0) {
              // Keep the limit within the backend's supported range.
              setProductLimit(Math.min(nextLimit, 100));
              setPageNumber(1);
            }
          }}
        />
      </form>
      {isLoading && <p>Loading...</p>}
      {isFetching && !isLoading && <p>Loading products...</p>}
      {isError && <p>Unable to load products.</p>}

      {/* Render the current page of products from the API response. */}
      <div className="mt-10 grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-xl bg-[#F5F5F5] text-center"
          >
            {product.name}
          </div>
        ))}
      </div>

      {/* Use backend pagination flags to prevent invalid page requests. */}
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
    </div>
  );
}

export default Products;
