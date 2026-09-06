import { Category, CategoryResponse } from "@/types/category/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/category",
  }),

  tagTypes: ["Category"],

  endpoints: (builder) => ({
    // GET ALL CATEGORIES
    getAllCategory: builder.query<Category[], void>({
      query: () => "/all-category",

      transformResponse: (response: CategoryResponse) => {
        return response.data;
      },

      providesTags: ["Category"],
    }),

    // ADD CATEGORY
    addCategory: builder.mutation<Category, FormData>({
      query: (formData) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoryQuery,
  useAddCategoryMutation,
} = categoryApi;