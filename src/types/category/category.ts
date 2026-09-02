//
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    public_id?: string;
    url?: string;
  };
  parent?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

//
export interface CategoryResponse {
  success: boolean;
  data: Category[];
}
