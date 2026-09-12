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
    .max(100, "Short description cannot exceed 100 characters"),
  price: z
    .number()
    .min(0, "Price must be a positive number")
    .max(1000000, "Price cannot exceed 1,000,000"),
  quantity: z
    .number()
    .min(0, "Quantity must be a positive number")
    .max(1000000, "Quantity cannot exceed 1,000,000"),
  costPrice: z
    .number()
    .min(0, "Cost price must be a positive number")
    .max(1000000, "Cost price cannot exceed 1,000,000"),
  unit: z
    .string()
    .trim()
    .min(2, "Product unit must be at least 2 characters")
    .max(50, "Product unit cannot exceed 50 characters"),
  status: z.enum([
    "Out of Stock",
    "In Stock",
    "Low Stock",
    "Pre Order",
    "Discontinued",
  ]),
  brand: z.string(),
  category: z.string(),
  image: z
    .instanceof(File, { message: "Product image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Product image must be less than 5MB",
    })
    .refine(
      (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      { message: "Only PNG, JPG or WEBP images are allowed" },
    ),
});
//
export type ProductFormData = z.infer<typeof productSchema>;
