import mongoose, { model, models, Schema } from "mongoose";
//
//
const ProductSchema = new Schema(
  {
    //
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
    //
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
    //
    metaTitle: {
      type: String,
      default: null,
    },
    metaDescription: {
      type: String,
      default: null,
    },
    keywords: {
      type: Array,
      default: null,
    },
    views: {
      type: String,
      default: null,
    },
    salesCount: {
      type: String,
      default: null,
    },
    averageRating: {
      type: String,
      default: null,
    },
    tags: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true },
);
//
export default models.Product || model("Product", ProductSchema);
