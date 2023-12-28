import { Schema, model, Document } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface ImainCategoryModel extends Document {
  name?: string,
  image?: string,
  cloudinaryUrl?: String,
  publicId?: String,
  status?: ModelStatus,
}
const mainCategorySchema = new Schema<ImainCategoryModel>({
  name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Please Enter Your image"],
    unique: false
  },
  cloudinaryUrl: {
    type: String
  },
  publicId: {
    type: String
  },
  status: {
    type: String
  }
}, { timestamps: true });

const mainCategory = model<ImainCategoryModel>('maincategory', mainCategorySchema)

export default mainCategory;
