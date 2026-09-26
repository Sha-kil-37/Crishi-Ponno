import { Category, CategoryResponse } from "@/types/category/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const adminCategoryApi = createApi({
  reducerPath: "adminCategoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/category",
  }),
  //
  tagTypes: ["AdminCategory"],
  //
  endpoints: (builder) => ({
    // GET ALL CATEGORIES
    getAllCategory: builder.query<Category[], void>({
      query: () => "/all-category",

      transformResponse: (response: CategoryResponse) => {
        return response.data;
      },

      providesTags: ["AdminCategory"],
    }),

    // ADD CATEGORY
    addCategory: builder.mutation<Category, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["AdminCategory"],
    }),
  }),
});

export const { useGetAllCategoryQuery, useAddCategoryMutation } =
  adminCategoryApi;
