//
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    public_id?: string;
    url?: string;
  };

  status: string;
  createdAt: string;
  updatedAt: string;
}

//
export interface BrandResponse {
  success: boolean;
  data: Brand[];
}
