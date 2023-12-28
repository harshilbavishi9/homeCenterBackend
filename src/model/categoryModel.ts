import { Schema, model, ObjectId } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface ICategoryModel {
  name: String;
  image?: string,
  cloudinaryUrl?: String,
  publicId?: String,
  mainCategory: ObjectId
  status: ModelStatus.Active
}

const categoryschema = new Schema<ICategoryModel>({
  name: { type: String, required: false },
  image: { type: String, required: [true, "Please Enter Your image"], unique: false },
  cloudinaryUrl: { type: String },
  publicId: { type: String },
  mainCategory: { type: Schema.Types.ObjectId, ref: 'maincategory', required: true },
  status: { type: Number, required: false, default: ModelStatus.Active },
},
  { timestamps: true }
);
const Category = model<ICategoryModel>("category", categoryschema);
export default Category;

