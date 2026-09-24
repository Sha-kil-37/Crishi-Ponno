import { Product, ProductResponse } from "@/types/product/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GetProductsParams {
  search?: string | null;
  page?: number;
  limit?: number;
}

export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/shop",
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // GET ALL PRODUCTS
    getAllProduct: builder.query<ProductResponse, GetProductsParams>({
      query: ({ search = "", page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        const normalizedSearch = search?.trim() ?? "";
        if (normalizedSearch) {
          params.set("search", normalizedSearch);
        }
        params.set("page", String(page));
        params.set("limit", String(limit));
        return `/product?${params.toString()}`;
      },

      providesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductQuery } = productApi;
