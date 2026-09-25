import { StorefrontProductResponse } from "@/types/product/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export interface GetProductsParams {
  search?: string | null;
  letter?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  status?: string | null;
  category?: string | null;
  brand?: string | null;
  sort?: string | null;
  page?: number;
  limit?: number;
}
//
export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/shop",
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    getAllProduct: builder.query<StorefrontProductResponse, GetProductsParams>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        const normalizedSearch = params.search?.trim() ?? "";
        if (normalizedSearch) {
          searchParams.set("search", normalizedSearch);
        }

        if (params.letter) {
          searchParams.set("letter", params.letter);
        }

        if (
          typeof params.minPrice === "number" &&
          Number.isFinite(params.minPrice)
        ) {
          searchParams.set("minPrice", String(params.minPrice));
        }

        if (
          typeof params.maxPrice === "number" &&
          Number.isFinite(params.maxPrice)
        ) {
          searchParams.set("maxPrice", String(params.maxPrice));
        }

        if (params.status) {
          searchParams.set("status", params.status);
        }

        if (params.category) {
          searchParams.set("category", params.category);
        }

        if (params.brand) {
          searchParams.set("brand", params.brand);
        }

        if (params.sort) {
          searchParams.set("sort", params.sort);
        }

        searchParams.set("page", String(params.page ?? 1));
        searchParams.set("limit", String(params.limit ?? 12));

        const queryString = searchParams.toString();
        return {
          url: "/product",
          params: Object.fromEntries(
            new URLSearchParams(queryString).entries(),
          ),
        };
      },

      providesTags: ["Product"],
    }),
  }),
});
//
export const { useGetAllProductQuery } = productApi;
