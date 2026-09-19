import mongoose, {
  model,
  models,
  Schema,
  type Model,
  type Types,
} from "mongoose";

// ============================================================
// TYPES
// ============================================================

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

export interface IProductImage {
  url: string;
  public_id: string;
}

export interface IProduct {
  name: string;
  slug: string;
  sku: string;

  description: string;
  shortDescription?: string;

  price: number;
  costPrice: number;
  discount?: number | null;

  unit: ProductUnit;
  quantity: number;

  brand: Types.ObjectId;
  category: Types.ObjectId;

  status: ProductStatus;

  image: IProductImage;

  metaTitle?: string | null;
  metaDescription?: string | null;

  keywords?: string[] | null;
  tags?: string[] | null;

  views?: number;
  salesCount?: number;
  averageRating?: number;
}

// ============================================================
// SCHEMA
// ============================================================

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      min: 0,
      default: null,
    },

    unit: {
      type: String,
      enum: ["kg", "gm", "liter", "ml", "piece", "pack", "bag", "box"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "In Stock",
        "Low Stock",
        "Out of Stock",
        "Pre Order",
        "Discontinued",
      ],
      required: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },

      public_id: {
        type: String,
        required: true,
      },
    },

    metaTitle: {
      type: String,
      default: null,
    },

    metaDescription: {
      type: String,
      default: null,
    },

    keywords: {
      type: [String],
      default: null,
    },

    views: {
      type: Number,
      default: 0,
    },

    salesCount: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    tags: {
      type: [String],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// ============================================================
// MODEL
// ============================================================

const Product =
  (models.Product as Model<IProduct>) ||
  model<IProduct>("Product", ProductSchema);

export default Product;
