// Product Schema
import { model, models, Schema } from "mongoose";
//
const ProductImageSchema = new Schema(
  {
    url: { type: String, required: true, trim: true },
    public_id: { type: String, required: true, trim: true },
    alt: { type: String, trim: true, default: "" },
    sortOrder: { type: Number, min: 0, default: 0 },
  },
  { _id: false },
);

const ProductVariantSchema = new Schema(
  {
    sku: { type: String, required: true, trim: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    attributes: {
      type: Map,
      of: { type: String, trim: true },
      default: {},
    },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    costPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    lowStockThreshold: { type: Number, min: 0, default: 5 },
    image: ProductImageSchema,
    isActive: { type: Boolean, default: true },
  },
  { _id: true },
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
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
      trim: true,
      uppercase: true,
    },
    description: { type: String, required: true, trim: true },
    shortDescription: { type: String, trim: true, maxlength: 300 },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    productType: {
      type: String,
      enum: ["simple", "variable"],
      default: "simple",
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    costPrice: { type: Number, min: 0 },
    currency: { type: String, trim: true, uppercase: true, default: "BDT" },
    stock: { type: Number, min: 0, default: 0 },
    lowStockThreshold: { type: Number, min: 0, default: 5 },
    trackInventory: { type: Boolean, default: true },
    allowBackorder: { type: Boolean, default: false },
    weight: { type: Number, min: 0 },
    unit: { type: String, trim: true },
    images: { type: [ProductImageSchema], default: [] },
    variants: { type: [ProductVariantSchema], default: [] },
    attributes: {
      type: Map,
      of: { type: String, trim: true },
      default: {},
    },
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
      required: true,
    },
    featured: { type: Boolean, default: false },
    seo: {
      title: { type: String, trim: true, maxlength: 60 },
      description: { type: String, trim: true, maxlength: 160 },
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true },
);

ProductSchema.index({ name: "text", description: "text", tags: "text" });
ProductSchema.index({ brand: 1, categories: 1, status: 1 });
ProductSchema.index({ status: 1, featured: -1, createdAt: -1 });

export default models.Product || model("Product", ProductSchema);
