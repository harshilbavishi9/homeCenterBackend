import { Schema, model, ObjectId } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface ISubCategoryModel {
  name: String;
  image?: string,
  cloudinaryUrl?: String,
  publicId?: String,
  mainCategory: ObjectId
  category: ObjectId
  status: ModelStatus.Active
}

const subCategoryschema = new Schema<ISubCategoryModel>({
  name: { type: String, required: false },
  image: { type: String, required: [true, "Please Enter Your image"], unique: false },
  cloudinaryUrl: { type: String },
  publicId: { type: String },
  mainCategory: { type: Schema.Types.ObjectId, ref: 'maincategory', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
  status: { type: Number, required: false, default: ModelStatus.Active },
},
  { timestamps: true }
);
const subCategory = model<ISubCategoryModel>("subCategories", subCategoryschema);
export default subCategory;

