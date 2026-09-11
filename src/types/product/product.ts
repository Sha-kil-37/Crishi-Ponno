//
export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  shortDescription: string;
  price: number;
  brand: string;
  category: string;
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
