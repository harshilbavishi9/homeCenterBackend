import { Schema, model, Document, Types } from "mongoose";
import { LandMarkStatus } from "../utils/model-status";

export interface IAddressModelModel extends Document {
  name?: string;
  number?: string;
  pincode?: string;
  buildingNo?: string;
  streetName?: string;
  landmark?: string;
  addressType?: number;
  timeStamp?: string;
  user?: Types.ObjectId
}

const AddressModelSchema = new Schema<IAddressModelModel>(
  {
    name: { type: String, require: true },
    number: { type: String, require: true },
    pincode: { type: String, require: true },
    buildingNo: { type: String, require: true },
    streetName: { type: String, require: true },
    landmark: { type: String, require: false },
    addressType: { type: Number, default: LandMarkStatus.Select, require: false },
    user: { type: Types.ObjectId, require: false },
  },
  { timestamps: true }
);

const AddressModelModel = model<IAddressModelModel>("AddressModel", AddressModelSchema);

export default AddressModelModel;
