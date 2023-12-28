import { Schema, model, ObjectId } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IBrandModel {
  name: String;
  status: ModelStatus.Active;
}

const Brandschema = new Schema<IBrandModel>(
  {
    name: { type: String, required: false },
    status: { type: Number, required: false, default: ModelStatus.Active },
  },
  { timestamps: true }
);
const Brand = model<IBrandModel>("Brand", Brandschema);
export default Brand;
