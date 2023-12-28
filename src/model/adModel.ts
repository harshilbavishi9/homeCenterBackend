import { Schema, model, Document } from "mongoose";

export interface IAdModel extends Document {
  images?: [string];
  publicId?: [string];
  cloudinaryUrl?: [string];
  timeStamp?: number;
}

const AdSchema = new Schema<IAdModel>(
  {
    images: { type: Array, require: false },
    publicId: { type: Array, require: false },
    cloudinaryUrl: { type: Array, require: false },
  },
  { timestamps: true }
);

const AdModel = model<IAdModel>("Ad", AdSchema);

export default AdModel;
