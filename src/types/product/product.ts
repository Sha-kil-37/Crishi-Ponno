export type ProductUnit =
  | "kg"
  | "gm"
  | "liter"
  | "ml"
  | "piece"
  | "pack"
  | "bag"
  | "box";

export type ProductStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock"
  | "Pre Order"
  | "Discontinued";

export interface ProductReference {
  _id: string;
  name: string;
}
//
export interface ProductImage {
  url: string;
  public_id: string;
}
//
export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string | null;
  price: number;
  costPrice: number;
  discount?: number | null;
  unit: ProductUnit;
  quantity: number;
  brand: ProductReference;
  category: ProductReference;
  status: ProductStatus;
  image: ProductImage;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
  tags?: string[] | null;
  views?: number;
  salesCount?: number;
  averageRating?: number;
  createdAt: string;
  updatedAt: string;
}
//
export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProductListResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

export interface StorefrontProductResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: ProductPagination;
  };
  message?: string;
}
