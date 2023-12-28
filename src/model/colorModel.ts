import { Schema, model, ObjectId } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IColorModel {
  name: String;
  status: ModelStatus.Active;
}

const Colorschema = new Schema<IColorModel>(
  {
    name: { type: String, required: false },
    status: { type: Number, required: false, default: ModelStatus.Active },
  },
  { timestamps: true }
);
const Color = model<IColorModel>("Color", Colorschema);
export default Color;
