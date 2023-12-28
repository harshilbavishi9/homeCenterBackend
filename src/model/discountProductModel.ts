import { Schema, model, ObjectId } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IdiscountModel {
  name: String;
  status: ModelStatus.Active;
}

const discountschema = new Schema<IdiscountModel>(
  {
    name: { type: String, required: false },
    status: { type: Number, required: false, default: ModelStatus.Active },
  },
  { timestamps: true }
);
const discount = model<IdiscountModel>("discountProduct", discountschema);
export default discount;
