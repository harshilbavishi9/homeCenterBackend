import { Schema, model, Document } from "mongoose";

export interface IBannerModel extends Document {
  images?: [string];
  publicId?: [string];
  cloudinaryUrl?: [string];
  timeStamp?: number;
}

const BannerSchema = new Schema<IBannerModel>(
  {
    images: { type: Array, require: false },
    publicId: { type: Array, require: false },
    cloudinaryUrl: { type: Array, require: false },
  },
  { timestamps: true }
);

const BannerModel = model<IBannerModel>("Banner", BannerSchema);

export default BannerModel;
