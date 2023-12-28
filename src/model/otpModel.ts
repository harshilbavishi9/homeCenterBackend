import { Schema, model, Document } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IotpModel extends Document {
    mobile?: string,
    email?: string,
    otp?: String,
    status?: ModelStatus,
    expiresIn?: Number,
    timeStamp?: Number,
}

const otpSchema = new Schema<IotpModel>({
    mobile: { type: String, require: false, },
    email: { type: String, require: false, },
    otp: { type: String, require: false },
    expiresIn: { type: Number, require: false },
    status: { type: Number, required: false, default: ModelStatus.Active }
}, { timestamps: true });

const OtpModel = model<IotpModel>('Otp', otpSchema)

export default OtpModel;