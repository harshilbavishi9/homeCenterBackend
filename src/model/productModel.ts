import { Schema, model, Document, Types } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IProductModel extends Document {
  title?: string;
  withDiscount?: number;
  originalPrice?: number;
  Overview?: string;
  discount?: Types.ObjectId;
  countInStock?: number;
  subCategory?: Types.ObjectId;
  ratings?: number;
  color?: string;
  brand?: string;
  review?: string;
  isAvailable?: number;
  isTrending?: number;
  isSpecial?: number;
  isLatest?: number;
  isBestSeller?: number;
  isFeatured?: number;
  images?: string[];
  cloudinaryUrl?: string[];
  publicId?: string[];
  description?: string;
  order?: number;
  viewCount: number
  status?: ModelStatus;
}

const ProductSchema = new Schema<IProductModel>(
  {
    title: { type: String, required: true, trim: true },
    withDiscount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: "discountProduct",
      required: true,
    },
    originalPrice: { type: Number, required: true, },
    Overview: { type: String, required: true, },
    countInStock: { type: Number, required: true, },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "subCategories",
      required: true,
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    ratings: { type: Number, required: false, },
    review: {
      type: Schema.Types.ObjectId,
      ref: "review",
      required: true,
    },
    isAvailable: { type: Number, required: false, default: ModelStatus.Deactivate },
    isTrending: { type: Number, required: false, default: ModelStatus.Deactivate },
    isSpecial: { type: Number, required: false, default: ModelStatus.Deactivate },
    isLatest: { type: Number, required: false, default: ModelStatus.Deactivate },
    isBestSeller: {
      type: Number,
      required: false,
      default: ModelStatus.Deactivate,
    },
    isFeatured: { type: Number, required: false, default: ModelStatus.Deactivate },
    images: [{ type: String, required: true, }],
    cloudinaryUrl: [{ type: String, required: false, }],
    publicId: [{ type: String, required: false, }],
    description: { type: String, required: true },
    order: { type: Number, require: false },
    viewCount: { type: Number, require: false },
    status: { type: String, required: false, default: ModelStatus.Deactivate },
  },
  { timestamps: true }
);

const Product = model<IProductModel>("product", ProductSchema);

export default Product;
