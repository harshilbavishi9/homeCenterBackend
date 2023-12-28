import { Schema, model, Document, ObjectId } from "mongoose";
import { ModelStatus } from "../utils/model-status";

export interface IUserModel {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    gender: string;
    mobileVerified: number;
    emailVerified: number;
    role: number;
    status: ModelStatus.Active
}

const Userschema = new Schema<IUserModel>(
    {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        email: { type: String, require: true },
        mobile: { type: String, require: true },
        gender: { type: String, require: true },
        mobileVerified: { type: Number, required: false, default: ModelStatus.Deactivate },
        emailVerified: { type: Number, required: false, default: ModelStatus.Deactivate },
        role: { type: Number, required: false, default: ModelStatus.Deactivate },
        status: { type: Number, required: false, default: ModelStatus.Active },
    },
    { timestamps: true }
);

const UserModel = model<IUserModel>("User", Userschema);

export default UserModel;
