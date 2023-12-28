import { Schema, model, ObjectId } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IblogCategoryModel {
  name: String;
  status: ModelStatus.Active;
}

const blogCategorySchema = new Schema<IblogCategoryModel>(
  {
    name: { type: String, required: false },
    status: { type: Number, required: false, default: ModelStatus.Active },
  },
  { timestamps: true }
);
const blogCategory = model<IblogCategoryModel>(
  "blogcategory",
  blogCategorySchema
);
export default blogCategory;
