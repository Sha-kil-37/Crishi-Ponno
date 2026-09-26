import { Brand, BrandResponse } from "@/types/brand/brand";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/brand",
  }),

  tagTypes: ["Brand"],

  endpoints: (builder) => ({
    // GET ALL BRAND
    getAllBrand: builder.query<Brand[], void>({
      query: () => "/all-brand",

      transformResponse: (response: BrandResponse) => {
        return response.data;
      },

      providesTags: ["Brand"],
    }),

    // ADD BRAND
    addBrand: builder.mutation<Brand, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Brand"],
    }),
  }),
});

export const { useGetAllBrandQuery, useAddBrandMutation } = brandApi;
