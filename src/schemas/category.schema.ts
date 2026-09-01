// schemas/category.schema.ts

import { z } from "zod";
//
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(160, "Description cannot exceed 160 characters"),
  //
  parent: z.string().optional(),
  status: z.enum(["Published", "Draft"]),
  image: z
    .instanceof(File, { message: "Category image is required" })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      "Only PNG, JPG or WEBP images are allowed",
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Image size must be less than 2MB",
    ),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
