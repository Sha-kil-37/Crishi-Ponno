// schemas/product.schema.ts

import { z } from "zod";
//
export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters")
    .max(50, "Product name cannot exceed 50 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Product description must be at least 10 characters")
    .max(500, "Product description cannot exceed 500 characters"),
  shortDescription: z
    .string()
    .trim()
    .min(5, "Short description must be at least 5 characters")
    .max(200, "Short description cannot exceed 200 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  image: z
    .instanceof(File, { message: "Product image is required" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      { message: "Product image must be less than 5MB" }
    )    .refine(
      (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      { message: "Only PNG, JPG or WEBP images are allowed" }
    ),
});
//
export type ProductFormData = z.infer<typeof productSchema>;
