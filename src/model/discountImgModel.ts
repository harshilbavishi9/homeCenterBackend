import { Schema, model, Document } from "mongoose";

export interface IDiscountModel extends Document {
  images?: [string];
  publicId?: [string];
  cloudinaryUrl?: [string];
  timeStamp?: number;
}

const DiscountSchema = new Schema<IDiscountModel>(
  {
    images: { type: Array, require: false },
    publicId: { type: Array, require: false },
    cloudinaryUrl: { type: Array, require: false },
  },
  { timestamps: true }
);

const DiscountModel = model<IDiscountModel>("Discount", DiscountSchema);

export default DiscountModel;
