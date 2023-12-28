"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const Userschema = new mongoose_1.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: String, require: true },
    gender: { type: String, require: true },
    mobileVerified: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    emailVerified: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    role: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    status: { type: Number, required: false, default: model_status_1.ModelStatus.Active },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)("User", Userschema);
exports.default = UserModel;
