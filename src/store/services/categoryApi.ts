import { Category, CategoryResponse } from "@/types/category/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/category",
  }),
  //
  tagTypes: ["Category"],
  //
  endpoints: (builder) => ({
    getAllCategory: builder.query<Category[], void>({
      query: () => "/all-category",

      transformResponse: (response: CategoryResponse) => {
        return response.data;
      },

      providesTags: ["Category"],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categoryApi;
