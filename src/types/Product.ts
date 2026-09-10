export type ProductStatus = "Draft" | "Published" | "Archived";
export type ProductType = "simple" | "variable";

export interface ProductImage {
  url: string;
  public_id: string;
  alt?: string;
  sortOrder?: number;
}

export interface ProductVariant {
  _id?: string;
  sku: string;
  name: string;
  attributes: Record<string, string>;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold: number;
  image?: ProductImage;
  isActive: boolean;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;
  brand: string;
  categories: string[];
  productType: ProductType;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  currency: string;
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  allowBackorder: boolean;
  weight?: number;
  unit?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  attributes: Record<string, string>;
  tags: string[];
  status: ProductStatus;
  featured: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}
