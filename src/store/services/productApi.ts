import { Product, ProductResponse } from "@/types/product/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const productApi = createApi({
  reducerPath: "productApi",
  //
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/product",
  }),

  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // GET ALL PRODUCTS
    getAllProduct: builder.query<Product[], void>({
      query: () => "/all-product",

      transformResponse: (response: ProductResponse) => {
        return response.data;
      },

      providesTags: ["Product"],
    }),

    // ADD PRODUCT
    addProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetAllProductQuery, useAddProductMutation } = productApi;
