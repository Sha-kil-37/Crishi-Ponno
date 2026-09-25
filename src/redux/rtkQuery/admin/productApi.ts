import { Product, ProductListResponse } from "@/types/product/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const adminProductApi = createApi({
  reducerPath: "adminProductApi",
  //
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/product",
  }),

  tagTypes: ["AdminProduct"],

  endpoints: (builder) => ({
    // GET ALL PRODUCTS
    getAllProduct: builder.query<Product[], void>({
      query: () => "/all-product",

      transformResponse: (response: ProductListResponse) => {
        return response.data;
      },

      providesTags: ["AdminProduct"],
    }),

    // ADD PRODUCT
    addProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["AdminProduct"],
    }),
  }),
});

export const { useGetAllProductQuery, useAddProductMutation } = adminProductApi;
