//
export interface ProductReference {
  _id: string;
  name: string;
}
//
export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  shortDescription: string;
  price: number;
  quantity: number;
  costPrice: number;
  unit: string;
  discount: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  brand: ProductReference;
  category: ProductReference;
  image?: {
    public_id?: string;
    url?: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

//
export interface ProductResponse {
  success: boolean;
  data: Product[];
}
