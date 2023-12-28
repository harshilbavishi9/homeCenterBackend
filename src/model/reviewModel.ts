import { Schema, model, Document } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IReviweModel extends Document {
  title?: string;
  experience?: string;
  ratings?: String;
  productId?: String;
  userId?: String;
  status?: ModelStatus;
  timeStamp?: Number;
}

const reviewSchema = new Schema<IReviweModel>(
  {
    title: { type: String, require: false },
    experience: { type: String, require: false },
    ratings: { type: Number, require: false },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      require: false,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", require: false },
    status: { type: Number, required: false, default: ModelStatus.Active },
  },
  { timestamps: true }
);

const Review = model<IReviweModel>("review", reviewSchema);

export default Review;
